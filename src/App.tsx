import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteConfigProvider } from "@/contexts/SiteConfigContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SiteSettings from "./pages/SiteSettings";
import PageSections from "./pages/PageSections";

const queryClient = new QueryClient();

// Base path for subdirectory deployment (change if needed)
// Leave empty string ('') for root domain deployment
const basename = '';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SiteConfigProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/site-settings" element={<SiteSettings />} />
            <Route path="/admin/page-sections" element={<PageSections />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SiteConfigProvider>
  </QueryClientProvider>
);

export default App;
