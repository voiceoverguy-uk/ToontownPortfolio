import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import BritishYoungGirlVoiceover from "@/pages/british-young-girl-voiceover";
import EnglishSpeakingChildVoiceover from "@/pages/english-speaking-child-voiceover";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/audio" component={Home} />
      <Route path="/video" component={Home} />
      <Route path="/contact" component={Home} />
      <Route path="/british-young-girl-voiceover" component={BritishYoungGirlVoiceover} />
      <Route path="/english-speaking-child-voiceover" component={EnglishSpeakingChildVoiceover} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Router />
    </TooltipProvider>
  );
}

export default App;
