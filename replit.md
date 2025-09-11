# Overview

This is a full-stack web application for Arabella Harris, a young voiceover artist. The application serves as a portfolio and marketing website showcasing her professional voice services for major brands like Tesco, Sainsbury's, Asda, and Uber. The site features a modern, animated interface with a cartoon-like aesthetic designed to appeal to both children and adults, reflecting Arabella's youthful energy while maintaining professional credibility.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Design System**: Custom color palette with cartoon-themed fonts (Luckiest Guy, Fredoka One, Bungee) and playful animations

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build Process**: esbuild for server bundling, Vite for client bundling
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage class)

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon serverless PostgreSQL (@neondatabase/serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Current Schema**: Basic user management with username/password fields

## Authentication and Authorization
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **User Model**: Simple username/password authentication structure
- **Security**: Prepared for authentication implementation with user creation and retrieval methods

## External Dependencies
- **Database Provider**: Neon (serverless PostgreSQL)
- **Development Environment**: Replit-specific tooling and plugins
- **Font Services**: Google Fonts for custom typography
- **Animation Libraries**: Embedded carousel functionality with Embla Carousel
- **Form Handling**: React Hook Form with Zod validation via Hookform Resolvers

The application follows a monorepo structure with shared TypeScript schemas between client and server, ensuring type safety across the full stack. The architecture is designed for easy deployment and scaling, with environment-based configuration and proper separation of concerns between presentation, business logic, and data layers.