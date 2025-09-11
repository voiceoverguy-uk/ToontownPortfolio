import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";

// Local logger placeholder - will be replaced when vite module loads
let log: (message: string, source?: string) => void = (m) => console.log(m);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    // Setup Vite directly to avoid protected file issues
    const { createServer: createViteServer } = await import("vite");
    const fs = await import("fs");
    const path = await import("path");
    const { nanoid } = await import("nanoid");
    
    log("Initializing Vite middleware", "vite");
    
    const vite = await createViteServer({
      root: path.resolve(import.meta.dirname, "../client"),  // Set root to client directory
      server: { 
        middlewareMode: true, 
        hmr: { server },
        host: true,
        strictPort: false,
        allowedHosts: true  // This is what disables the host check!
      },
      appType: 'custom',
      configFile: false, // Don't use vite.config.ts to avoid issues
      plugins: [
        // Import plugins directly to avoid config issues
        (await import("@vitejs/plugin-react")).default(),
      ],
      resolve: {
        alias: {
          "@": path.resolve(import.meta.dirname, "../client/src"),
          "@lib": path.resolve(import.meta.dirname, "../client/src/lib"),
          "@components": path.resolve(import.meta.dirname, "../client/src/components"),
          "@assets": path.resolve(import.meta.dirname, "../attached_assets"),
          "@shared": path.resolve(import.meta.dirname, "../shared"),
        },
      },
    });

    app.use(vite.middlewares);
    
    // Catch-all route to serve client HTML
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;

      try {
        const clientTemplate = path.resolve(
          import.meta.dirname,
          "..",
          "client",
          "index.html",
        );

        // Reload the index.html file from disk in case it changes
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`,
        );
        const page = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
    
    log("Vite middleware attached successfully", "vite");
  } else {
    // Dynamically import serveStatic for production
    const { serveStatic } = await import("./vite");
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
