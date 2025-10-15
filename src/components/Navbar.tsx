import { useState, useCallback, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    { label: "Início", href: "#home", id: "home" },
    { label: "Serviços", href: "#servicos", id: "servicos" },
    { label: "Veículos", href: "#locacao", id: "locacao" },
    { label: "Investimento", href: "#investimento", id: "investimento" },
    { label: "Sobre", href: "#sobre", id: "sobre" },
    { label: "Contato", href: "#contato", id: "contato" },
  ];

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  }, []);

  const handleWhatsApp = useCallback(() => {
    window.open("https://wa.me/5547984485492", "_blank");
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Track active section
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-100px 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    menuItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => scrollToSection("#home")}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            aria-label="Ir para o início"
          >
            <img
              src={logoImg}
              alt="RV Car Logo"
              className="h-10 w-auto rounded-md"
            />
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-foreground">RV Car</span>
              <p className="text-xs text-muted-foreground -mt-1">Locações e Investimentos</p>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                aria-label={`Ir para ${item.label}`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center space-x-2 ml-4">
              <Button 
                onClick={handleWhatsApp} 
                size="sm" 
                variant="outline"
                className="hidden lg:flex items-center space-x-1"
              >
                <Phone className="h-4 w-4" />
                <span>(47) 98448-5492</span>
              </Button>
              <Button onClick={() => scrollToSection("#contato")} size="sm">
                Fale Conosco
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="md:hidden p-2 hover:bg-secondary rounded-md transition-colors"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen ? "true" : "false"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-b border-border shadow-xl animate-fade-in max-h-screen overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-foreground hover:bg-secondary hover:text-primary"
                }`}
                aria-label={`Ir para ${item.label}`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 space-y-2">
              <Button 
                onClick={handleWhatsApp} 
                variant="outline" 
                className="w-full flex items-center justify-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>(47) 98448-5492</span>
              </Button>
              
              <Button 
                onClick={() => scrollToSection("#contato")} 
                className="w-full"
              >
                Fale Conosco
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
