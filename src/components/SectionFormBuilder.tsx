import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Star, Type, Image as ImageIcon, List, Link as LinkIcon, AlignLeft, AlignCenter, Heading1, Heading2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { SectionType } from '@/types/siteConfig';

interface SectionFormBuilderProps {
  type: SectionType;
  content: any;
  onChange: (content: any) => void;
}

/**
 * Componente que renderiza formulários visuais específicos para cada tipo de seção
 * Muito mais fácil que editar JSON manualmente
 */
const SectionFormBuilder = ({ type, content = {}, onChange }: SectionFormBuilderProps) => {
  const updateField = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const updateArrayItem = (arrayField: string, index: number, itemField: string, value: any) => {
    const array = [...(content[arrayField] || [])];
    array[index] = { ...array[index], [itemField]: value };
    updateField(arrayField, array);
  };

  const addArrayItem = (arrayField: string, template: any) => {
    const array = [...(content[arrayField] || []), template];
    updateField(arrayField, array);
  };

  const removeArrayItem = (arrayField: string, index: number) => {
    const array = (content[arrayField] || []).filter((_: any, i: number) => i !== index);
    updateField(arrayField, array);
  };

  // Hero - Banner Principal
  if (type === 'hero') {
    return (
      <div className="space-y-4">
        <div>
          <Label>Título Principal</Label>
          <Input
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ex: Aluguel de Carros para Motoristas de App"
          />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input
            value={content.subtitle || ''}
            onChange={(e) => updateField('subtitle', e.target.value)}
            placeholder="Ex: Veículos prontos para trabalhar"
          />
        </div>
        <ImageUpload
          label="Imagem de Fundo"
          value={content.background_image || ''}
          onChange={(url) => updateField('background_image', url)}
          placeholder="/hero-bg.jpg"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Texto do Botão</Label>
            <Input
              value={content.cta_text || ''}
              onChange={(e) => updateField('cta_text', e.target.value)}
              placeholder="Ex: Ver Veículos"
            />
          </div>
          <div>
            <Label>Link do Botão</Label>
            <Input
              value={content.cta_link || ''}
              onChange={(e) => updateField('cta_link', e.target.value)}
              placeholder="Ex: #vehicles"
            />
          </div>
        </div>
      </div>
    );
  }

  // About - Sobre a Empresa
  if (type === 'about') {
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ex: Sobre a RV Car Solutions"
          />
        </div>
        <div>
          <Label>Conteúdo</Label>
          <Textarea
            value={content.content || ''}
            onChange={(e) => updateField('content', e.target.value)}
            placeholder="Descreva sua empresa, história, missão..."
            rows={6}
          />
        </div>
        <ImageUpload
          label="Imagem"
          value={content.image || ''}
          onChange={(url) => updateField('image', url)}
          placeholder="/about.jpg"
        />
      </div>
    );
  }

  // Stats - Estatísticas
  if (type === 'stats') {
    const stats = content.stats || [];
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ex: Números que Impressionam"
          />
        </div>
        <div>
          <Label>Subtítulo (opcional)</Label>
          <Input
            value={content.subtitle || ''}
            onChange={(e) => updateField('subtitle', e.target.value)}
            placeholder="Ex: Nossa trajetória em números"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Estatísticas</Label>
            <Button
              type="button"
              size="sm"
              onClick={() => addArrayItem('stats', { number: '0', label: 'Nova Estatística' })}
            >
              <Plus className="w-4 h-4 mr-1" /> Adicionar
            </Button>
          </div>
          {stats.map((stat: any, index: number) => (
            <Card key={index} className="p-4 mb-2">
              <div className="flex gap-2 mb-2">
                <div className="flex-1">
                  <Label className="text-xs">Número</Label>
                  <Input
                    value={stat.number || ''}
                    onChange={(e) => updateArrayItem('stats', index, 'number', e.target.value)}
                    placeholder="Ex: 500+"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs">Descrição</Label>
                  <Input
                    value={stat.label || ''}
                    onChange={(e) => updateArrayItem('stats', index, 'label', e.target.value)}
                    placeholder="Ex: Veículos"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArrayItem('stats', index)}
                  className="mt-5"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Testimonials - Depoimentos
  if (type === 'testimonials') {
    const testimonials = content.testimonials || [];
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ex: O Que Dizem Nossos Clientes"
          />
        </div>
        <div>
          <Label>Subtítulo (opcional)</Label>
          <Input
            value={content.subtitle || ''}
            onChange={(e) => updateField('subtitle', e.target.value)}
            placeholder="Ex: Depoimentos reais"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Depoimentos</Label>
            <Button
              type="button"
              size="sm"
              onClick={() => addArrayItem('testimonials', { text: '', author: '', rating: 5 })}
            >
              <Plus className="w-4 h-4 mr-1" /> Adicionar
            </Button>
          </div>
          {testimonials.map((testimonial: any, index: number) => (
            <Card key={index} className="p-4 mb-2">
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Depoimento</Label>
                  <Textarea
                    value={testimonial.text || ''}
                    onChange={(e) => updateArrayItem('testimonials', index, 'text', e.target.value)}
                    placeholder="Ex: Excelente serviço!"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Autor</Label>
                    <Input
                      value={testimonial.author || ''}
                      onChange={(e) => updateArrayItem('testimonials', index, 'author', e.target.value)}
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Avaliação (1-5)</Label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => updateArrayItem('testimonials', index, 'rating', rating)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              rating <= (testimonial.rating || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArrayItem('testimonials', index)}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Remover
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // CTA - Call to Action
  if (type === 'cta') {
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ex: Pronto para começar?"
          />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input
            value={content.subtitle || ''}
            onChange={(e) => updateField('subtitle', e.target.value)}
            placeholder="Ex: Entre em contato agora"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Botão Principal</Label>
            <Input
              value={content.primary_button || ''}
              onChange={(e) => updateField('primary_button', e.target.value)}
              placeholder="Ex: Fale Conosco"
            />
          </div>
          <div>
            <Label>Botão Secundário</Label>
            <Input
              value={content.secondary_button || ''}
              onChange={(e) => updateField('secondary_button', e.target.value)}
              placeholder="Ex: Saiba Mais"
            />
          </div>
        </div>
      </div>
    );
  }

  // FAQ - Perguntas Frequentes
  if (type === 'faq') {
    const faqs = content.faqs || [];
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ex: Perguntas Frequentes"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Perguntas</Label>
            <Button
              type="button"
              size="sm"
              onClick={() => addArrayItem('faqs', { question: '', answer: '' })}
            >
              <Plus className="w-4 h-4 mr-1" /> Adicionar
            </Button>
          </div>
          {faqs.map((faq: any, index: number) => (
            <Card key={index} className="p-4 mb-2">
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Pergunta</Label>
                  <Input
                    value={faq.question || ''}
                    onChange={(e) => updateArrayItem('faqs', index, 'question', e.target.value)}
                    placeholder="Ex: Como funciona o aluguel?"
                  />
                </div>
                <div>
                  <Label className="text-xs">Resposta</Label>
                  <Textarea
                    value={faq.answer || ''}
                    onChange={(e) => updateArrayItem('faqs', index, 'answer', e.target.value)}
                    placeholder="Digite a resposta..."
                    rows={3}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArrayItem('faqs', index)}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Remover
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Contact - Contato
  if (type === 'contact') {
    return (
      <div className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            value={content.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Ex: Entre em Contato"
          />
        </div>
        <div>
          <Label>Subtítulo (opcional)</Label>
          <Input
            value={content.subtitle || ''}
            onChange={(e) => updateField('subtitle', e.target.value)}
            placeholder="Ex: Estamos prontos para ajudar"
          />
        </div>
      </div>
    );
  }

  // Custom - Editor Visual de Blocos
  if (type === 'custom') {
    const blocks = content.blocks || [];
    
    const addBlock = (blockType: string) => {
      const templates: Record<string, any> = {
        heading: { type: 'heading', level: 'h2', text: 'Título', align: 'left' },
        paragraph: { type: 'paragraph', text: 'Digite seu texto aqui...', align: 'left' },
        image: { type: 'image', url: '', alt: 'Descrição da imagem', caption: '' },
        button: { type: 'button', text: 'Clique Aqui', link: '#', style: 'primary' },
        list: { type: 'list', items: ['Item 1', 'Item 2', 'Item 3'] },
        divider: { type: 'divider' },
      };
      updateField('blocks', [...blocks, templates[blockType]]);
    };

    const updateBlock = (index: number, field: string, value: any) => {
      const newBlocks = [...blocks];
      newBlocks[index] = { ...newBlocks[index], [field]: value };
      updateField('blocks', newBlocks);
    };

    const updateListItem = (blockIndex: number, itemIndex: number, value: string) => {
      const newBlocks = [...blocks];
      const items = [...(newBlocks[blockIndex].items || [])];
      items[itemIndex] = value;
      newBlocks[blockIndex] = { ...newBlocks[blockIndex], items };
      updateField('blocks', newBlocks);
    };

    const addListItem = (blockIndex: number) => {
      const newBlocks = [...blocks];
      const items = [...(newBlocks[blockIndex].items || []), 'Novo item'];
      newBlocks[blockIndex] = { ...newBlocks[blockIndex], items };
      updateField('blocks', newBlocks);
    };

    const removeListItem = (blockIndex: number, itemIndex: number) => {
      const newBlocks = [...blocks];
      const items = (newBlocks[blockIndex].items || []).filter((_: any, i: number) => i !== itemIndex);
      newBlocks[blockIndex] = { ...newBlocks[blockIndex], items };
      updateField('blocks', newBlocks);
    };

    const removeBlock = (index: number) => {
      updateField('blocks', blocks.filter((_: any, i: number) => i !== index));
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
      const newBlocks = [...blocks];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= blocks.length) return;
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      updateField('blocks', newBlocks);
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
          <p className="w-full text-sm font-semibold mb-2">➕ Adicionar Bloco:</p>
          <Button type="button" size="sm" variant="outline" onClick={() => addBlock('heading')}>
            <Heading1 className="w-4 h-4 mr-1" /> Título
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => addBlock('paragraph')}>
            <Type className="w-4 h-4 mr-1" /> Texto
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => addBlock('image')}>
            <ImageIcon className="w-4 h-4 mr-1" /> Imagem
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => addBlock('button')}>
            <LinkIcon className="w-4 h-4 mr-1" /> Botão
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => addBlock('list')}>
            <List className="w-4 h-4 mr-1" /> Lista
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => addBlock('divider')}>
            ━ Divisor
          </Button>
        </div>

        {blocks.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
            <p>🎨 Nenhum bloco adicionado ainda</p>
            <p className="text-sm mt-2">Clique em um dos botões acima para começar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {blocks.map((block: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                      title="Mover para cima"
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => moveBlock(index, 'down')}
                      disabled={index === blocks.length - 1}
                      title="Mover para baixo"
                    >
                      ↓
                    </Button>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeBlock(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Bloco: Título */}
                {block.type === 'heading' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Heading2 className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Título</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Tamanho</Label>
                        <Select
                          value={block.level || 'h2'}
                          onValueChange={(value) => updateBlock(index, 'level', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="h1">Grande (H1)</SelectItem>
                            <SelectItem value="h2">Médio (H2)</SelectItem>
                            <SelectItem value="h3">Pequeno (H3)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Alinhamento</Label>
                        <Select
                          value={block.align || 'left'}
                          onValueChange={(value) => updateBlock(index, 'align', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">← Esquerda</SelectItem>
                            <SelectItem value="center">⊡ Centro</SelectItem>
                            <SelectItem value="right">→ Direita</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Input
                      value={block.text || ''}
                      onChange={(e) => updateBlock(index, 'text', e.target.value)}
                      placeholder="Digite o título"
                    />
                  </div>
                )}

                {/* Bloco: Parágrafo */}
                {block.type === 'paragraph' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Type className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Texto</span>
                    </div>
                    <div>
                      <Label className="text-xs">Alinhamento</Label>
                      <Select
                        value={block.align || 'left'}
                        onValueChange={(value) => updateBlock(index, 'align', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">← Esquerda</SelectItem>
                          <SelectItem value="center">⊡ Centro</SelectItem>
                          <SelectItem value="right">→ Direita</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea
                      value={block.text || ''}
                      onChange={(e) => updateBlock(index, 'text', e.target.value)}
                      placeholder="Digite seu texto aqui..."
                      rows={4}
                    />
                  </div>
                )}

                {/* Bloco: Imagem */}
                {block.type === 'image' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Imagem</span>
                    </div>
                    <ImageUpload
                      label="Imagem"
                      value={block.url || ''}
                      onChange={(url) => updateBlock(index, 'url', url)}
                    />
                    <Input
                      value={block.alt || ''}
                      onChange={(e) => updateBlock(index, 'alt', e.target.value)}
                      placeholder="Descrição da imagem (acessibilidade)"
                    />
                    <Input
                      value={block.caption || ''}
                      onChange={(e) => updateBlock(index, 'caption', e.target.value)}
                      placeholder="Legenda (opcional)"
                    />
                  </div>
                )}

                {/* Bloco: Botão */}
                {block.type === 'button' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Botão</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Texto do Botão</Label>
                        <Input
                          value={block.text || ''}
                          onChange={(e) => updateBlock(index, 'text', e.target.value)}
                          placeholder="Ex: Saiba Mais"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Link</Label>
                        <Input
                          value={block.link || ''}
                          onChange={(e) => updateBlock(index, 'link', e.target.value)}
                          placeholder="Ex: #contato"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Estilo</Label>
                      <Select
                        value={block.style || 'primary'}
                        onValueChange={(value) => updateBlock(index, 'style', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primário (Destaque)</SelectItem>
                          <SelectItem value="secondary">Secundário</SelectItem>
                          <SelectItem value="outline">Contorno</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Bloco: Lista */}
                {block.type === 'list' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <List className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Lista</span>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => addListItem(index)}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Item
                      </Button>
                    </div>
                    {(block.items || []).map((item: string, itemIndex: number) => (
                      <div key={itemIndex} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                          placeholder={`Item ${itemIndex + 1}`}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeListItem(index, itemIndex)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bloco: Divisor */}
                {block.type === 'divider' && (
                  <div className="py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">Divisor</span>
                    </div>
                    <div className="border-t-2 border-gray-300"></div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Uma linha horizontal para separar conteúdos
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <p className="font-semibold text-blue-900">💡 Dica:</p>
          <p className="text-blue-800">
            Use as setas ↑ ↓ para reordenar os blocos. Você pode criar seções totalmente personalizadas!
          </p>
        </div>
      </div>
    );
  }

  // Services e Vehicles não precisam de formulário (usam dados dinâmicos)
  if (type === 'services' || type === 'vehicles' || type === 'investment') {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>✅ Esta seção usa dados dinâmicos do sistema.</p>
        <p className="text-sm mt-2">Não é necessário configurar conteúdo aqui.</p>
      </div>
    );
  }

  // Fallback - JSON para tipos não implementados
  return (
    <div className="space-y-4">
      <div>
        <Label>Conteúdo (JSON)</Label>
        <Textarea
          value={JSON.stringify(content, null, 2)}
          onChange={(e) => {
            try {
              onChange(JSON.parse(e.target.value));
            } catch (err) {
              // Ignora erro de parsing enquanto digita
            }
          }}
          rows={15}
          className="font-mono text-sm"
        />
      </div>
    </div>
  );
};

export default SectionFormBuilder;
