import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SurveillanceSidebar } from "./components/SurveillanceSidebar";
import Dashboard from "./pages/Dashboard";
import MonitorPage from "./pages/MonitorPage";
import DevicesPage from "./pages/DevicesPage";
import TargetsPage from "./pages/TargetsPage";
import LocationsPage from "./pages/LocationsPage";
import NetworkPage from "./pages/NetworkPage";
import CamerasPage from "./pages/CamerasPage";
import ExtractionPage from "./pages/ExtractionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <SurveillanceSidebar />
              <div className="flex-1 flex flex-col">
                <header className="h-12 flex items-center border-b border-border/50 px-4">
                  <SidebarTrigger className="mr-4" />
                  <div className="flex-1" />
                  <ThemeToggle />
                </header>
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/monitor" element={<MonitorPage />} />
                  <Route path="/devices" element={<DevicesPage />} />
                  <Route path="/targets" element={<TargetsPage />} />
                  <Route path="/locations" element={<LocationsPage />} />
                  <Route path="/network" element={<NetworkPage />} />
                  <Route path="/cameras" element={<CamerasPage />} />
                  <Route path="/extraction" element={<ExtractionPage />} />
                  <Route path="/reports" element={<Dashboard />} />
                  <Route path="/alerts" element={<Dashboard />} />
                  <Route path="/users" element={<Dashboard />} />
                  <Route path="/security" element={<Dashboard />} />
                  <Route path="/settings" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
