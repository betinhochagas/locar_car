import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUpload from '@/components/ImageUpload';
import SectionFormBuilder from '@/components/SectionFormBuilder';
import SectionPreview from '@/components/SectionPreview';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, GripVertical, Save } from 'lucide-react';
import { isAuthenticated } from '@/lib/authManager';
import {
  getPageSections,
  createPageSection,
  updatePageSection,
  deletePageSection,
  toggleSectionActive,
  reorderSections,
} from '@/lib/siteConfigManager';
import { PageSection, PageSectionForm, SectionType } from '@/types/siteConfig';
import { toast } from 'sonner';

const PageSections = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<PageSection | null>(null);
  const [formData, setFormData] = useState<PageSectionForm>({
    section_key: '',
    section_name: '',
    section_type: 'custom',
    content: {},
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadSections();
  }, [navigate]);

  const loadSections = async () => {
    try {
      setLoading(true);
      const data = await getPageSections();
      setSections(data);
    } catch (error) {
      console.error('Erro ao carregar seções:', error);
      toast.error('Erro ao carregar seções');
    } finally {
      setLoading(false);
    }
  };

  const getSectionTemplate = (type: SectionType) => {
    const templates: Record<SectionType, any> = {
      hero: { title: 'Bem-vindo', subtitle: 'Subtítulo', background_image: '/hero-bg.jpg', cta_text: 'Saiba Mais', cta_link: '#' },
      services: {},
      features: { title: 'Recursos', subtitle: '', items: [] },
      vehicles: { title: 'Veículos', subtitle: '', show_filters: true, show_availability: true },
      investment: {},
      about: { title: 'Sobre Nós', content: 'Texto sobre a empresa', image: '/about.jpg' },
      contact: { title: 'Contato', subtitle: '', show_form: true, show_map: false },
      cta: { title: 'Pronto para começar?', subtitle: 'Entre em contato', primary_button: 'Fale Conosco', secondary_button: 'Saiba Mais' },
      stats: { title: 'Números', subtitle: '', stats: [{ number: '100+', label: 'Clientes' }, { number: '500+', label: 'Veículos' }] },
      testimonials: { title: 'Depoimentos', subtitle: '', testimonials: [{ text: 'Ótimo serviço!', author: 'João Silva', rating: 5 }] },
      pricing: { title: 'Planos', subtitle: '', plans: [{ name: 'Básico', price: 'R$ 650', period: 'semana', features: ['Manutenção incluída'], cta: 'Escolher' }] },
      faq: { title: 'FAQ', subtitle: '', faqs: [{ question: 'Como funciona?', answer: 'Resposta aqui' }] },
      gallery: { title: 'Galeria', subtitle: '', images: ['/img1.jpg', '/img2.jpg'] },
      benefits: { title: 'Benefícios', subtitle: '', benefits: [{ icon: 'shield', title: 'Segurança', description: 'Descrição' }] },
      custom: { html: '<div>HTML personalizado aqui</div>' },
    };
    return templates[type] || {};
  };

  const handleOpenAddDialog = () => {
    setSelectedSection(null);
    setFormData({
      section_key: '',
      section_name: '',
      section_type: 'custom',
      content: {},
      display_order: sections.length + 1,
      is_active: true,
    });
    setIsEditDialogOpen(true);
  };

  const handleOpenEditDialog = (section: PageSection) => {
    setSelectedSection(section);
    setFormData({
      section_key: section.section_key,
      section_name: section.section_name,
      section_type: section.section_type,
      content: section.content,
      display_order: section.display_order,
      is_active: section.is_active,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveSection = async () => {
    try {
      if (!formData.section_key || !formData.section_name) {
        toast.error('Preencha todos os campos obrigatórios');
        return;
      }

      if (selectedSection) {
        // Atualizar
        await updatePageSection(selectedSection.id, formData);
        toast.success('Seção atualizada com sucesso!');
      } else {
        // Criar nova
        await createPageSection(formData);
        toast.success('Seção criada com sucesso!');
      }

      setIsEditDialogOpen(false);
      loadSections();
    } catch (error) {
      console.error('Erro ao salvar seção:', error);
      toast.error('Erro ao salvar seção');
    }
  };

  const handleDeleteSection = async () => {
    if (!selectedSection) return;

    try {
      await deletePageSection(selectedSection.id);
      toast.success('Seção removida com sucesso!');
      setIsDeleteDialogOpen(false);
      loadSections();
    } catch (error) {
      console.error('Erro ao deletar seção:', error);
      toast.error('Erro ao deletar seção');
    }
  };

  const handleToggleActive = async (section: PageSection) => {
    try {
      await toggleSectionActive(section.id);
      toast.success(section.is_active ? 'Seção desativada' : 'Seção ativada');
      loadSections();
    } catch (error) {
      console.error('Erro ao alternar status:', error);
      toast.error('Erro ao alternar status');
    }
  };

  const handleContentChange = (key: string, value: string | number | boolean | unknown) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }));
  };

  const renderContentFields = () => {
    const type = formData.section_type;

    switch (type) {
      case 'hero':
        return (
          <>
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={formData.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                placeholder="Título principal"
              />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Input
                value={formData.content.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                placeholder="Subtítulo"
              />
            </div>
            <ImageUpload
              label="Imagem de Fundo"
              value={formData.content.background_image || ''}
              onChange={(url) => handleContentChange('background_image', url)}
              placeholder="/hero-bg.jpg"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Texto do Botão</Label>
                <Input
                  value={formData.content.cta_text || ''}
                  onChange={(e) => handleContentChange('cta_text', e.target.value)}
                  placeholder="Ver Veículos"
                />
              </div>
              <div className="space-y-2">
                <Label>Link do Botão</Label>
                <Input
                  value={formData.content.cta_link || ''}
                  onChange={(e) => handleContentChange('cta_link', e.target.value)}
                  placeholder="#vehicles"
                />
              </div>
            </div>
          </>
        );

      case 'about':
        return (
          <>
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={formData.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                placeholder="Sobre Nós"
              />
            </div>
            <div className="space-y-2">
              <Label>Conteúdo</Label>
              <Textarea
                value={formData.content.content || ''}
                onChange={(e) => handleContentChange('content', e.target.value)}
                placeholder="Texto sobre a empresa"
                rows={4}
              />
            </div>
            <ImageUpload
              label="Imagem"
              value={formData.content.image || ''}
              onChange={(url) => handleContentChange('image', url)}
              placeholder="/about.jpg"
            />
          </>
        );

      case 'contact':
        return (
          <>
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={formData.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                placeholder="Entre em Contato"
              />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Input
                value={formData.content.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                placeholder="Estamos prontos para atender você"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.content.show_form || false}
                  onCheckedChange={(checked) => handleContentChange('show_form', checked)}
                />
                <Label>Mostrar Formulário</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.content.show_map || false}
                  onCheckedChange={(checked) => handleContentChange('show_map', checked)}
                />
                <Label>Mostrar Mapa</Label>
              </div>
            </div>
          </>
        );

      case 'cta':
        return (
          <>
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={formData.content.title || ''} onChange={(e) => handleContentChange('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Input value={formData.content.subtitle || ''} onChange={(e) => handleContentChange('subtitle', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Botão Primário</Label>
                <Input value={formData.content.primary_button || ''} onChange={(e) => handleContentChange('primary_button', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Botão Secundário</Label>
                <Input value={formData.content.secondary_button || ''} onChange={(e) => handleContentChange('secondary_button', e.target.value)} />
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="space-y-2">
            <Label>Conteúdo (JSON)</Label>
            <div className="text-xs text-gray-600 mb-2">
              💡 <strong>Dica:</strong> Use o botão "Carregar Template" acima para ver exemplos
            </div>
            <Textarea
              value={JSON.stringify(formData.content, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setFormData(prev => ({ ...prev, content: parsed }));
                } catch (error) {
                  // Ignorar erro de parsing enquanto digita
                }
              }}
              rows={15}
              className="font-mono text-sm"
              placeholder='{ "key": "value" }'
            />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando seções...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Painel
              </Button>
              <h1 className="text-2xl font-bold">Gerenciar Seções da Página</h1>
            </div>
            <Button onClick={handleOpenAddDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Seção
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Info Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>💡 Sistema Dinâmico:</strong> As seções aqui configuradas aparecem automaticamente no site. 
                Arraste para reordenar, ative/desative para controlar visibilidade. Seções inativas não aparecem no site.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {sections.map((section) => (
            <Card key={section.id} className={!section.is_active ? 'opacity-60' : ''}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{section.section_name}</h3>
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {section.section_type}
                        </span>
                        {!section.is_active && (
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                            Inativo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Chave: <code className="bg-gray-100 px-1 rounded">{section.section_key}</code>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Ordem: {section.display_order}
                      </p>
                      {section.content.title && (
                        <p className="text-xs text-gray-500 mt-1">
                          Título: "{section.content.title}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(section)}
                    >
                      {section.is_active ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenEditDialog(section)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedSection(section);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedSection ? 'Editar Seção' : 'Nova Seção'}
            </DialogTitle>
            <DialogDescription>
              Configure o conteúdo e a aparência da seção
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Chave da Seção*</Label>
                <Input
                  value={formData.section_key}
                  onChange={(e) => setFormData(prev => ({ ...prev, section_key: e.target.value }))}
                  placeholder="hero_section"
                  disabled={!!selectedSection}
                />
              </div>
              <div className="space-y-2">
                <Label>Nome da Seção*</Label>
                <Input
                  value={formData.section_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, section_name: e.target.value }))}
                  placeholder="Seção Hero"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Tipo de Seção</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const template = getSectionTemplate(formData.section_type);
                      setFormData(prev => ({ ...prev, content: template }));
                    }}
                  >
                    Carregar Template
                  </Button>
                </div>
                <Select
                  value={formData.section_type}
                  onValueChange={(value: SectionType) => {
                    setFormData(prev => ({ ...prev, section_type: value }));
                    // Auto-carregar template ao mudar tipo
                    const template = getSectionTemplate(value);
                    setFormData(prev => ({ ...prev, content: template }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">🎯 Hero (Banner Principal)</SelectItem>
                    <SelectItem value="services">⭐ Serviços</SelectItem>
                    <SelectItem value="features">✨ Recursos</SelectItem>
                    <SelectItem value="vehicles">🚗 Veículos</SelectItem>
                    <SelectItem value="investment">💰 Investimento</SelectItem>
                    <SelectItem value="about">ℹ️ Sobre Nós</SelectItem>
                    <SelectItem value="contact">📞 Contato</SelectItem>
                    <SelectItem value="cta">📢 Call to Action</SelectItem>
                    <SelectItem value="stats">📊 Estatísticas</SelectItem>
                    <SelectItem value="testimonials">💬 Depoimentos</SelectItem>
                    <SelectItem value="pricing">💵 Planos e Preços</SelectItem>
                    <SelectItem value="faq">❓ Perguntas Frequentes</SelectItem>
                    <SelectItem value="gallery">🖼️ Galeria de Imagens</SelectItem>
                    <SelectItem value="benefits">✅ Benefícios</SelectItem>
                    <SelectItem value="custom">🔧 Personalizada (HTML)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ordem de Exibição</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label>Seção Ativa</Label>
            </div>

            <div className="border-t pt-4">
              <Tabs defaultValue="form" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="form">📝 Formulário</TabsTrigger>
                  <TabsTrigger value="preview">👁️ Pré-visualização</TabsTrigger>
                </TabsList>
                <TabsContent value="form" className="mt-4 space-y-4">
                  <SectionFormBuilder
                    type={formData.section_type}
                    content={formData.content}
                    onChange={(newContent) => setFormData(prev => ({ ...prev, content: newContent }))}
                  />
                </TabsContent>
                <TabsContent value="preview" className="mt-4">
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-0">
                      <SectionPreview
                        type={formData.section_type}
                        content={formData.content}
                        sectionName={formData.section_name}
                      />
                    </CardContent>
                  </Card>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Esta é uma prévia aproximada. O resultado final pode variar no site.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveSection}>
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a seção "{selectedSection?.section_name}"?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSection} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PageSections;
