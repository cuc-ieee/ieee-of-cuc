import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function DesktopNav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between px-8 py-4 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50" : "bg-transparent"
      }`}
    >
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="font-display font-bold text-primary-foreground text-lg">I</span>
        </div>
        <span className="font-display font-semibold text-lg tracking-wide">IEEE Curtin Colombo</span>
      </Link>

      <div className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`text-sm font-medium tracking-wide relative group transition-colors duration-300 ${
              location.pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
        <Link
          to="/membership"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium text-sm hover:shadow-[0_0_20px_hsl(210_100%_50%/0.4)] transition-all duration-300"
        >
          Join IEEE
        </Link>
      </div>
    </motion.nav>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden flex items-center justify-between px-4 py-3 transition-all duration-500 ${
          scrolled || isOpen ? "bg-background/90 backdrop-blur-lg border-b border-border/50" : "bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-sm">I</span>
          </div>
          <span className="font-display font-semibold text-sm tracking-wide">IEEE Curtin</span>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground hover:text-primary transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden pt-16 bg-background/95 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Link to={item.href} className="font-display text-2xl text-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navItems.length * 0.1 }}>
                <Link to="/membership" className="mt-4 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-display font-semibold">
                  Join IEEE
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
