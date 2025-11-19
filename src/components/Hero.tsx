import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import heroBg from "@/assets/hero-bg.jpg";
import ConsultantModal from "./ConsultantModal";

interface HeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    background_image?: string;
    cta_text?: string;
    cta_link?: string;
  };
}

const Hero = ({ content }: HeroProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getConfig } = useSiteConfig();
  
  // Configurações dinâmicas (fallback para site-settings se não vier do content)
  const siteName = getConfig('site_name', '');
  const buttonCtaText = content?.cta_text || getConfig('button_cta_text', 'Fale Conosco');
  const title = content?.title || 'Aluguel de Carros para Motoristas de App';
  const subtitle = content?.subtitle || 'Veículos prontos para trabalhar, com manutenção em dia e planos semanais acessíveis. A partir de R$650/semana.';
  const backgroundImage = content?.background_image || heroBg;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={`${siteName} - Locação de Veículos`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title.includes('Motoristas de App') ? (
              <>
                {title.split('Motoristas de App')[0]}
                <span className="text-primary">Motoristas de App</span>
                {title.split('Motoristas de App')[1]}
              </>
            ) : (
              title
            )}
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
            {subtitle.includes('R$') ? (
              <>
                {subtitle.split(/R\$\d+/)[0]}
                <span className="text-primary font-semibold">{subtitle.match(/R\$\d+[^.]*/)?.[0]}</span>
                {subtitle.split(/R\$\d+[^.]*/)[1]}
              </>
            ) : (
              subtitle
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {buttonCtaText && (
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="text-base sm:text-lg group"
              >
                {buttonCtaText}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.querySelector("#locacao")?.scrollIntoView({ behavior: "smooth" })}
              className="text-base sm:text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-dark"
            >
              Ver Veículos
            </Button>
          </div>

          {/* Modal de Consultor */}
          <ConsultantModal open={isModalOpen} onOpenChange={setIsModalOpen} />

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">8+</div>
              <div className="text-sm text-white/80">Modelos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-white/80">Revisados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-white/80">Suporte</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
