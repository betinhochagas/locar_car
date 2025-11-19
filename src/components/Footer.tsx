import { MapPin, Phone, Mail } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { getAbsoluteImageUrl } from "@/lib/imageUrlHelper";
import logoImg from "@/assets/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { getConfig } = useSiteConfig();
  
  // Configurações dinâmicas
  const siteName = getConfig('site_name', '');
  const siteLogoRaw = getConfig('site_logo', '');
  // Se não houver logo configurado, usar logo padrão; senão, normalizar URL
  const siteLogo = !siteLogoRaw ? logoImg : getAbsoluteImageUrl(siteLogoRaw);
  const siteLogoAlt = getConfig('site_logo_alt', '');
  const siteDescription = getConfig('site_description', '');
  const contactPhone = getConfig('contact_phone', '');
  const contactWhatsapp = getConfig('contact_whatsapp', '');
  const contactEmail = getConfig('contact_email', '');
  const contactAddress = getConfig('contact_address', '');

  return (
    <footer className="bg-dark text-dark-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={siteLogo}
                alt={siteLogoAlt}
                className="h-20 w-auto"
              />
              {siteLogoAlt && (
                <span className="font-bold text-lg">{siteLogoAlt}</span>
              )}
            </div>
            {siteDescription && (
              <p className="text-dark-foreground/70 leading-relaxed">
                {siteDescription}
              </p>
            )}
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
              {contactAddress && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-dark-foreground/70">{contactAddress}</span>
                </li>
              )}
              {contactPhone && contactWhatsapp && (
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href={`https://wa.me/${contactWhatsapp}`}
                    className="text-dark-foreground/70 hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactPhone}
                  </a>
                </li>
              )}
              {contactEmail && (
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-dark-foreground/70 hover:text-primary transition-colors"
                  >
                    {contactEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-foreground/10 pt-8 text-center">
          <p className="text-dark-foreground/60">
            © {currentYear} {siteName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
