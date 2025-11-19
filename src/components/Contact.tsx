import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

interface ContactProps {
  content?: {
    title?: string;
    subtitle?: string;
    show_form?: boolean;
    show_map?: boolean;
    map_embed?: string;
  };
}

const Contact = ({ content }: ContactProps) => {
  const { getConfig } = useSiteConfig();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  // Configurações dinâmicas
  const title = content?.title || 'Fale Conosco';
  const subtitle = content?.subtitle || 'Entre em contato conosco e tire suas dúvidas';
  const contactPhone = getConfig('contact_phone', '');
  const contactWhatsapp = getConfig('contact_whatsapp', '');
  const contactEmail = getConfig('contact_email', '');
  const contactAddress = getConfig('contact_address', '');
  const contactHours = getConfig('contact_hours', '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Nome: ${formData.name}%0AEmail: ${formData.email}%0ATelefone: ${formData.phone}%0AMensagem: ${formData.message}`;
    window.open(`https://wa.me/${contactWhatsapp}?text=${message}`, "_blank");
    
    toast.success("Redirecionando para o WhatsApp...");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contato" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {title.includes('Contato') ? (
              <>
                {title.split('Contato')[0]}<span className="text-primary">Contato</span>{title.split('Contato')[1]}
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {(content?.show_form !== false) && (
            <div className="animate-slide-in-right">
              <Card className="border-border h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Envie sua Mensagem</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Seu Nome"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Seu E-mail"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Seu Telefone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Sua Mensagem"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          )}

          <div className="space-y-6 animate-fade-in">
            {contactAddress && (
              <Card className="border-border">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Localização</h3>
                    <p className="text-muted-foreground">{contactAddress}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {contactPhone && contactWhatsapp && (
              <Card className="border-border">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Telefone</h3>
                    <p className="text-muted-foreground">{contactPhone}</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary"
                      onClick={() => window.open(`https://wa.me/${contactWhatsapp}`, "_blank")}
                    >
                      Chamar no WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {contactEmail && (
              <Card className="border-border">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">E-mail</h3>
                    <p className="text-muted-foreground">{contactEmail}</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary"
                      onClick={() => window.location.href = `mailto:${contactEmail}`}
                    >
                      Enviar E-mail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
