import { Button } from '@/components/ui/button';

interface CustomSectionProps {
  content: {
    blocks?: any[];
  };
}

/**
 * Renderiza seções personalizadas criadas com o editor de blocos
 */
const CustomSection = ({ content }: CustomSectionProps) => {
  const blocks = content.blocks || [];

  if (blocks.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        {blocks.map((block: any, index: number) => {
          // Título
          if (block.type === 'heading') {
            const HeadingTag = block.level || 'h2';
            const alignClass = 
              block.align === 'center' ? 'text-center' : 
              block.align === 'right' ? 'text-right' : 
              'text-left';
            const sizeClass = 
              HeadingTag === 'h1' ? 'text-4xl md:text-5xl' : 
              HeadingTag === 'h2' ? 'text-3xl md:text-4xl' : 
              'text-2xl md:text-3xl';
            
            return (
              <div key={index} className={alignClass}>
                {HeadingTag === 'h1' && (
                  <h1 className={`${sizeClass} font-bold`}>{block.text}</h1>
                )}
                {HeadingTag === 'h2' && (
                  <h2 className={`${sizeClass} font-bold`}>{block.text}</h2>
                )}
                {HeadingTag === 'h3' && (
                  <h3 className={`${sizeClass} font-bold`}>{block.text}</h3>
                )}
              </div>
            );
          }

          // Parágrafo
          if (block.type === 'paragraph') {
            const alignClass = 
              block.align === 'center' ? 'text-center' : 
              block.align === 'right' ? 'text-right' : 
              'text-left';
            
            return (
              <p 
                key={index} 
                className={`${alignClass} text-gray-600 text-lg leading-relaxed whitespace-pre-line`}
              >
                {block.text}
              </p>
            );
          }

          // Imagem
          if (block.type === 'image' && block.url) {
            return (
              <div key={index} className="space-y-3">
                <img
                  src={block.url}
                  alt={block.alt || 'Imagem'}
                  className="w-full rounded-lg shadow-lg"
                />
                {block.caption && (
                  <p className="text-sm text-center text-gray-500 italic">
                    {block.caption}
                  </p>
                )}
              </div>
            );
          }

          // Botão
          if (block.type === 'button' && block.text) {
            const variant = 
              block.style === 'secondary' ? 'secondary' : 
              block.style === 'outline' ? 'outline' : 
              'default';
            
            return (
              <div key={index} className="text-center">
                <Button 
                  asChild 
                  variant={variant as any}
                  size="lg"
                >
                  <a href={block.link || '#'}>
                    {block.text}
                  </a>
                </Button>
              </div>
            );
          }

          // Lista
          if (block.type === 'list' && block.items?.length > 0) {
            return (
              <ul key={index} className="space-y-3">
                {block.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-600 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            );
          }

          // Divisor
          if (block.type === 'divider') {
            return (
              <hr key={index} className="border-t-2 border-gray-200 my-8" />
            );
          }

          return null;
        })}
      </div>
    </section>
  );
};

export default CustomSection;
