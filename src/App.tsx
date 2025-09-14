import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import Learning from "./pages/Learning";
import Leaderboard from "./pages/Leaderboard";
import Chatbot from "./pages/Chatbot";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Dashboard as homepage */}
              <Route path="/" element={<Dashboard />} />

              {/* Other routes */}
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/chatbot" element={<Chatbot />} />

              {/* Existing routes */}
              <Route path="/auth" element={<Auth />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
