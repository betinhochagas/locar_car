import { PageSection } from '@/types/siteConfig';
import Hero from './Hero';
import Services from './Services';
import VehicleCatalog from './VehicleCatalog';
import Investment from './Investment';
import About from './About';
import Contact from './Contact';
import CustomSection from './CustomSection';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Check, Star, Quote, TrendingUp, DollarSign, Shield } from 'lucide-react';

interface DynamicSectionProps {
  section: PageSection;
}

const DynamicSection = ({ section }: DynamicSectionProps) => {
  const { section_type, content } = section;

  // Componentes fixos existentes (agora com props dinâmicos)
  switch (section_type) {
    case 'hero':
      return <Hero content={content} />;
    
    case 'features':
    case 'services':
      return <Services content={content} />;
    
    case 'vehicles':
      return <VehicleCatalog />;
    
    case 'investment':
      return <Investment content={content} />;
    
    case 'about':
      return <About content={content} />;
    
    case 'contact':
      return <Contact content={content} />;

    // Novas seções dinâmicas
    case 'cta':
      return (
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {content.title || 'Pronto para começar?'}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {content.subtitle || 'Entre em contato e descubra as melhores soluções'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {content.primary_button && (
                <Button size="lg" variant="secondary">
                  {content.primary_button}
                </Button>
              )}
              {content.secondary_button && (
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                  {content.secondary_button}
                </Button>
              )}
            </div>
          </div>
        </section>
      );

    case 'stats':
      return (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title || 'Números que Impressionam'}</h2>
              {content.subtitle && <p className="text-xl text-gray-600">{content.subtitle}</p>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Array.isArray(content.stats) && content.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'testimonials':
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title || 'O Que Dizem Nossos Clientes'}</h2>
              {content.subtitle && <p className="text-xl text-gray-600">{content.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {Array.isArray(content.testimonials) && content.testimonials.map((testimonial: any, index: number) => (
                <Card key={index} className="p-6">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-gray-700 mb-4">{testimonial.text}</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="font-semibold">{testimonial.author}</div>
                  {testimonial.role && <div className="text-sm text-gray-600">{testimonial.role}</div>}
                </Card>
              ))}
            </div>
          </div>
        </section>
      );

    case 'pricing':
      return (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title || 'Planos e Preços'}</h2>
              {content.subtitle && <p className="text-xl text-gray-600">{content.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {Array.isArray(content.plans) && content.plans.map((plan: any, index: number) => (
                <Card key={index} className={`p-8 ${plan.featured ? 'border-primary border-2 shadow-lg' : ''}`}>
                  {plan.badge && (
                    <div className="inline-block px-3 py-1 bg-primary text-white text-sm rounded-full mb-4">
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">/{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {Array.isArray(plan.features) && plan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.featured ? 'default' : 'outline'}>
                    {plan.cta || 'Escolher Plano'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );

    case 'faq':
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title || 'Perguntas Frequentes'}</h2>
              {content.subtitle && <p className="text-xl text-gray-600">{content.subtitle}</p>}
            </div>
            <div className="space-y-4">
              {Array.isArray(content.faqs) && content.faqs.map((faq: any, index: number) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );

    case 'gallery':
      return (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title || 'Galeria'}</h2>
              {content.subtitle && <p className="text-xl text-gray-600">{content.subtitle}</p>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.isArray(content.images) && content.images.map((image: any, index: number) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                  <img
                    src={image.url || image}
                    alt={image.alt || `Imagem ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'benefits':
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title || 'Por Que Escolher?'}</h2>
              {content.subtitle && <p className="text-xl text-gray-600">{content.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {Array.isArray(content.benefits) && content.benefits.map((benefit: any, index: number) => {
                const icons = {
                  shield: Shield,
                  dollar: DollarSign,
                  trending: TrendingUp,
                  check: Check,
                };
                const IconComponent = icons[benefit.icon as keyof typeof icons] || Check;
                
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );

    case 'custom':
      // Editor de blocos visual
      if (content.blocks && Array.isArray(content.blocks) && content.blocks.length > 0) {
        return <CustomSection content={content} />;
      }
      // HTML personalizado (legado)
      if (content.html) {
        return (
          <section className="py-16" dangerouslySetInnerHTML={{ __html: content.html as string }} />
        );
      }
      // Fallback para conteúdo genérico
      return (
        <section className="py-16">
          <div className="container mx-auto px-4">
            {content.title && <h2 className="text-3xl font-bold mb-4">{content.title as string}</h2>}
            {content.content && <div className="text-gray-700">{content.content as string}</div>}
          </div>
        </section>
      );

    default:
      console.warn(`Tipo de seção desconhecido: ${section_type}`);
      return null;
  }
};

export default DynamicSection;
