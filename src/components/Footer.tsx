import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-dark-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-dark font-bold text-lg">RV</span>
              </div>
              <span className="font-bold text-lg">RV Car Locações</span>
            </div>
            <p className="text-dark-foreground/70 leading-relaxed">
              Soluções completas em locação de veículos e gestão de investimentos em frota em Blumenau - SC.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-dark-foreground/70 hover:text-primary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#locacao" className="text-dark-foreground/70 hover:text-primary transition-colors">
                  Locação de Veículos
                </a>
              </li>
              <li>
                <a href="#investimento" className="text-dark-foreground/70 hover:text-primary transition-colors">
                  Investimento em Frota
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-dark-foreground/70 hover:text-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contato" className="text-dark-foreground/70 hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-dark-foreground/70">Blumenau - Santa Catarina</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/5547984485492"
                  className="text-dark-foreground/70 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (47) 98448-5492
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-dark-foreground/70">Atendimento 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-foreground/10 pt-8 text-center">
          <p className="text-dark-foreground/60">
            © {currentYear} RV Car Locações e Investimentos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
