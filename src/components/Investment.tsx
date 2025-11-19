import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, FileText, HeartHandshake } from "lucide-react";
import investmentImg from "@/assets/investment.jpg";

interface InvestmentProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    cta_text?: string;
    benefits?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

const Investment = ({ content }: InvestmentProps) => {
  const defaultBenefits = [
    {
      icon: TrendingUp,
      title: "Renda Passiva Mensal",
      description: "Receba rendimentos mensais com a locação dos seus veículos",
    },
    {
      icon: Shield,
      title: "Gestão Completa",
      description: "Cuidamos de toda manutenção, locação e documentação",
    },
    {
      icon: FileText,
      title: "Transparência Total",
      description: "Relatórios detalhados e contratos transparentes",
    },
    {
      icon: HeartHandshake,
      title: "Parceria Confiável",
      description: "Experiência comprovada no mercado de locação",
    },
  ];

  const benefits = content?.benefits || defaultBenefits;
  const title = content?.title || 'Invista em Frota de Locação';
  const subtitle = content?.subtitle || 'Para Investidores';
  const description = content?.description || 'Transforme seu capital em uma fonte de renda passiva através da locação de veículos. Nossa gestão especializada garante o melhor retorno do seu investimento com total transparência e segurança.';
  const ctaText = content?.cta_text || 'Quero Investir';

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      trending: TrendingUp,
      trendingup: TrendingUp,
      shield: Shield,
      filetext: FileText,
      file: FileText,
      heart: HeartHandshake,
      hearthandshake: HeartHandshake,
      handshake: HeartHandshake,
    };
    return icons[iconName.toLowerCase().replace(/[^a-z]/g, '')] || TrendingUp;
  };

  const handleWhatsApp = () => {
    const message = "Olá! Gostaria de saber mais sobre investimento em frota de locação.";
    window.open(`https://wa.me/5547984485492?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="investimento" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-slide-in-right">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold">{subtitle}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              {title.includes('Frota') ? (
                <>
                  {title.split('Frota')[0]}<span className="text-primary">Frota</span>{title.split('Frota')[1]}
                </>
              ) : (
                title
              )}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit: any, index: number) => {
                const IconComponent = typeof benefit.icon === 'string' ? getIcon(benefit.icon) : benefit.icon;
                return (
                  <Card key={index} className="border-border">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button onClick={handleWhatsApp} size="lg">
              {ctaText}
            </Button>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={investmentImg}
                alt="Investimento em Frota"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investment;
