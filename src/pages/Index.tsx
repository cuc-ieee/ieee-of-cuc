import { Helmet } from "react-helmet";
import { DesktopNav, MobileNav } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { MembershipSection } from "@/components/sections/MembershipSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>IEEE Curtin Colombo Student Branch | Advancing Technology for Humanity</title>
        <meta
          name="description"
          content="IEEE Curtin Colombo Student Branch - Empowering the next generation of engineers and innovators through technology, collaboration, and excellence in Sri Lanka."
        />
        <meta
          name="keywords"
          content="IEEE, Curtin Colombo, Student Branch, Engineering, Technology, Sri Lanka, Innovation"
        />
      </Helmet>

      <div className="min-h-screen w-full bg-background overflow-x-hidden">
        {/* Navigation */}
        <DesktopNav />
        <MobileNav />

        {/* Main Content with Snap Scrolling */}
        <main>
          <HeroSection />
          <AboutSection />
          <EventsSection />
          <MembershipSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
