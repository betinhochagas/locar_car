import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Sobre a <span className="text-primary">RV Car</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Sua parceira de confiança em Blumenau
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-border animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Nossa Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Facilitar o acesso a veículos de qualidade para motoristas de aplicativo, 
                  proporcionando autonomia financeira e oportunidades de crescimento através 
                  de soluções acessíveis e confiáveis.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Nossa Visão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser referência em locação de veículos e gestão de frotas em Santa Catarina, 
                  reconhecida pela excelência no atendimento, transparência nas relações e 
                  retorno consistente para nossos investidores.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Localização</h3>
                <p className="text-sm text-muted-foreground">Blumenau - SC</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Contato</h3>
                <p className="text-sm text-muted-foreground">(47) 98448-5492</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Atendimento</h3>
                <p className="text-sm text-muted-foreground">24/7 Suporte</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
