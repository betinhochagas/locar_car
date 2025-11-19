import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Phone, Mail, MapPin, Image as ImageIcon } from 'lucide-react';
import { SectionType } from '@/types/siteConfig';

interface SectionPreviewProps {
  type: SectionType;
  content: any;
  sectionName: string;
}

/**
 * Preview em tempo real de como a seção vai aparecer no site
 */
const SectionPreview = ({ type, content, sectionName }: SectionPreviewProps) => {
  // Hero Preview
  if (type === 'hero') {
    return (
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: content.background_image
              ? `url(${content.background_image})`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {content.title || 'Título do Banner'}
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            {content.subtitle || 'Subtítulo do banner'}
          </p>
          {content.cta_text && (
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              {content.cta_text}
            </button>
          )}
        </div>
      </div>
    );
  }

  // About Preview
  if (type === 'about') {
    return (
      <div className="grid md:grid-cols-2 gap-8 p-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">
            {content.title || 'Título da Seção'}
          </h2>
          <p className="text-muted-foreground whitespace-pre-line">
            {content.content || 'Conteúdo da seção sobre a empresa...'}
          </p>
        </div>
        <div className="rounded-lg overflow-hidden bg-muted h-64">
          {content.image ? (
            <img
              src={content.image}
              alt="Sobre"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Imagem da seção
            </div>
          )}
        </div>
      </div>
    );
  }

  // Stats Preview
  if (type === 'stats') {
    const stats = content.stats || [];
    return (
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">
          {content.title || 'Estatísticas'}
        </h2>
        {content.subtitle && (
          <p className="text-muted-foreground mb-8">{content.subtitle}</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.length > 0 ? (
            stats.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number || '0'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label || 'Label'}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-muted-foreground">
              Adicione estatísticas no formulário
            </div>
          )}
        </div>
      </div>
    );
  }

  // Testimonials Preview
  if (type === 'testimonials') {
    const testimonials = content.testimonials || [];
    return (
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {content.title || 'Depoimentos'}
          </h2>
          {content.subtitle && (
            <p className="text-muted-foreground">{content.subtitle}</p>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial: any, index: number) => (
              <Card key={index} className="p-6">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (testimonial.rating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "{testimonial.text || 'Texto do depoimento'}"
                </p>
                <p className="font-semibold">
                  {testimonial.author || 'Nome do Cliente'}
                </p>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center text-muted-foreground">
              Adicione depoimentos no formulário
            </div>
          )}
        </div>
      </div>
    );
  }

  // CTA Preview
  if (type === 'cta') {
    return (
      <div className="bg-primary text-primary-foreground p-12 rounded-lg text-center">
        <h2 className="text-4xl font-bold mb-4">
          {content.title || 'Título do CTA'}
        </h2>
        <p className="text-xl mb-8">
          {content.subtitle || 'Subtítulo do CTA'}
        </p>
        <div className="flex gap-4 justify-center">
          {content.primary_button && (
            <button className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              {content.primary_button}
            </button>
          )}
          {content.secondary_button && (
            <button className="border-2 border-background text-background px-8 py-3 rounded-lg font-semibold hover:bg-background/10 transition-colors">
              {content.secondary_button}
            </button>
          )}
        </div>
      </div>
    );
  }

  // FAQ Preview
  if (type === 'faq') {
    const faqs = content.faqs || [];
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {content.title || 'Perguntas Frequentes'}
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq: any, index: number) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">
                  {faq.question || 'Pergunta'}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer || 'Resposta'}
                </p>
              </Card>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              Adicione perguntas no formulário
            </div>
          )}
        </div>
      </div>
    );
  }

  // Contact Preview
  if (type === 'contact') {
    return (
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {content.title || 'Entre em Contato'}
          </h2>
          {content.subtitle && (
            <p className="text-muted-foreground">{content.subtitle}</p>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Formulário de Contato</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nome"
                disabled
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="E-mail"
                disabled
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Mensagem"
                disabled
                rows={4}
                className="w-full p-2 border rounded"
              />
              <button
                disabled
                className="w-full bg-primary text-primary-foreground p-2 rounded"
              >
                Enviar
              </button>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Informações</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>contato@empresa.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Endereço da empresa</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Services/Vehicles/Investment - Dados dinâmicos
  if (type === 'services') {
    return (
      <div className="p-8 text-center">
        <Badge variant="secondary" className="mb-4">
          Seção Dinâmica
        </Badge>
        <h3 className="text-xl font-semibold mb-2">Seção de Serviços</h3>
        <p className="text-muted-foreground">
          Esta seção exibe os serviços cadastrados no sistema
        </p>
      </div>
    );
  }

  if (type === 'vehicles') {
    return (
      <div className="p-8 text-center">
        <Badge variant="secondary" className="mb-4">
          Seção Dinâmica
        </Badge>
        <h3 className="text-xl font-semibold mb-2">Catálogo de Veículos</h3>
        <p className="text-muted-foreground">
          Esta seção exibe os veículos cadastrados no sistema
        </p>
      </div>
    );
  }

  if (type === 'investment') {
    return (
      <div className="p-8 text-center">
        <Badge variant="secondary" className="mb-4">
          Seção Dinâmica
        </Badge>
        <h3 className="text-xl font-semibold mb-2">Oportunidade de Investimento</h3>
        <p className="text-muted-foreground">
          Esta seção exibe informações sobre investimento
        </p>
      </div>
    );
  }

  // Custom - Blocos Visuais
  if (type === 'custom') {
    const blocks = content.blocks || [];
    
    if (blocks.length === 0) {
      return (
        <div className="p-8 text-center text-muted-foreground">
          <p>🎨 Nenhum bloco adicionado</p>
          <p className="text-sm mt-2">Adicione blocos no formulário para ver o preview</p>
        </div>
      );
    }

    return (
      <div className="p-8 space-y-6">
        {blocks.map((block: any, index: number) => {
          // Título
          if (block.type === 'heading') {
            const HeadingTag = block.level || 'h2';
            const alignClass = block.align === 'center' ? 'text-center' : block.align === 'right' ? 'text-right' : 'text-left';
            const sizeClass = HeadingTag === 'h1' ? 'text-4xl' : HeadingTag === 'h2' ? 'text-3xl' : 'text-2xl';
            return (
              <div key={index} className={alignClass}>
                {HeadingTag === 'h1' && <h1 className={`${sizeClass} font-bold`}>{block.text || 'Título'}</h1>}
                {HeadingTag === 'h2' && <h2 className={`${sizeClass} font-bold`}>{block.text || 'Título'}</h2>}
                {HeadingTag === 'h3' && <h3 className={`${sizeClass} font-bold`}>{block.text || 'Título'}</h3>}
              </div>
            );
          }

          // Parágrafo
          if (block.type === 'paragraph') {
            const alignClass = block.align === 'center' ? 'text-center' : block.align === 'right' ? 'text-right' : 'text-left';
            return (
              <p key={index} className={`${alignClass} text-muted-foreground whitespace-pre-line`}>
                {block.text || 'Texto do parágrafo'}
              </p>
            );
          }

          // Imagem
          if (block.type === 'image') {
            return (
              <div key={index} className="space-y-2">
                {block.url ? (
                  <img
                    src={block.url}
                    alt={block.alt || 'Imagem'}
                    className="w-full rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                {block.caption && (
                  <p className="text-sm text-center text-muted-foreground italic">
                    {block.caption}
                  </p>
                )}
              </div>
            );
          }

          // Botão
          if (block.type === 'button') {
            const variantClass = 
              block.style === 'secondary' ? 'bg-secondary text-secondary-foreground' :
              block.style === 'outline' ? 'border-2 border-primary text-primary bg-transparent' :
              'bg-primary text-primary-foreground';
            
            return (
              <div key={index} className="text-center">
                <button className={`${variantClass} px-6 py-3 rounded-lg font-semibold inline-block`}>
                  {block.text || 'Botão'}
                </button>
              </div>
            );
          }

          // Lista
          if (block.type === 'list') {
            const items = block.items || [];
            return (
              <ul key={index} className="list-disc list-inside space-y-2">
                {items.map((item: string, i: number) => (
                  <li key={i} className="text-muted-foreground">{item}</li>
                ))}
              </ul>
            );
          }

          // Divisor
          if (block.type === 'divider') {
            return (
              <hr key={index} className="border-t-2 border-gray-300 my-6" />
            );
          }

          return null;
        })}
      </div>
    );
  }

  // Fallback
  return (
    <div className="p-8 text-center text-muted-foreground">
      <p>Preview não disponível para este tipo de seção</p>
      <p className="text-sm mt-2">Seção: {sectionName}</p>
    </div>
  );
};

export default SectionPreview;
