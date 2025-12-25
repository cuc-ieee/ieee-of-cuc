import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Committee from "./pages/Committee";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Membership from "./pages/Membership";
// import Projects from "./pages/Projects";
// import Resources from "./pages/Resources";
import Gallery from "./pages/Gallery";
// import News from "./pages/News";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetails />} />
          <Route path="/membership" element={<Membership />} />
          {/* <Route path="/projects" element={<Projects />} /> */}
          {/* <Route path="/resources" element={<Resources />} /> */}
          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/news" element={<News />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
