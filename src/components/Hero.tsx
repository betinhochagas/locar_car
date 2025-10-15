import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5547984485492", "_blank");
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="RV Car - Locação de Veículos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
            <span className="text-primary font-semibold">Locação e Investimento</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Aluguel de Carros para{" "}
            <span className="text-primary">Motoristas de App</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
            Veículos prontos para trabalhar, com manutenção em dia e planos semanais acessíveis. 
            <span className="text-primary font-semibold"> A partir de R$650/semana.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="text-base sm:text-lg group"
            >
              Fale com um consultor
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.querySelector("#locacao")?.scrollIntoView({ behavior: "smooth" })}
              className="text-base sm:text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-dark"
            >
              Ver Veículos
            </Button>
          </div>

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
