import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Palette, Image as ImageIcon, Globe, Mail, Share2, Upload, X } from 'lucide-react';
import { isAuthenticated, logout } from '@/lib/authManager';
import { getSiteSettings, saveBulkSettings } from '@/lib/siteConfigManager';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { SiteConfig } from '@/types/siteConfig';
import { uploadImage, validateImage, createImagePreview } from '@/lib/uploadManager';
import { toast } from 'sonner';

const SiteSettings = () => {
  const navigate = useNavigate();
  const { refreshConfigs } = useSiteConfig();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [configs, setConfigs] = useState<Record<string, string>>({});
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [faviconPreview, setFaviconPreview] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadSettings();
  }, [navigate]);

  // Função para converter HSL para HEX
  const hslToHex = (hslString: string): string => {
    // Parse HSL format: "48 100% 50%"
    const matches = hslString.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
    if (!matches) return '';
    
    const h = parseInt(matches[1]) / 360;
    const s = parseInt(matches[2]) / 100;
    const l = parseInt(matches[3]) / 100;
    
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Função para extrair cores CSS atuais do documento
  const extractCurrentColors = (): Record<string, string> => {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    
    const colorMap: Record<string, string> = {
      'color_brand': style.getPropertyValue('--brand').trim(),
      'color_brand_foreground': style.getPropertyValue('--brand-foreground').trim(),
      'button_primary_bg': style.getPropertyValue('--button-primary').trim(),
      'button_primary_text': style.getPropertyValue('--button-primary-foreground').trim(),
      'button_primary_hover': style.getPropertyValue('--button-primary-hover').trim(),
      'button_secondary_bg': style.getPropertyValue('--button-secondary').trim(),
      'button_secondary_text': style.getPropertyValue('--button-secondary-foreground').trim(),
      'button_secondary_hover': style.getPropertyValue('--button-secondary-hover').trim(),
      'color_secondary': style.getPropertyValue('--secondary').trim(),
      'color_secondary_foreground': style.getPropertyValue('--secondary-foreground').trim(),
      'color_accent': style.getPropertyValue('--accent').trim(),
      'color_accent_foreground': style.getPropertyValue('--accent-foreground').trim(),
      'color_background': style.getPropertyValue('--background').trim(),
      'color_text': style.getPropertyValue('--foreground').trim(),
      'color_card': style.getPropertyValue('--card').trim(),
      'color_card_foreground': style.getPropertyValue('--card-foreground').trim(),
      'color_popover': style.getPropertyValue('--popover').trim(),
      'color_popover_foreground': style.getPropertyValue('--popover-foreground').trim(),
      'color_muted': style.getPropertyValue('--muted').trim(),
      'color_muted_foreground': style.getPropertyValue('--muted-foreground').trim(),
      'color_border': style.getPropertyValue('--border').trim(),
      'color_input': style.getPropertyValue('--input').trim(),
      'color_ring': style.getPropertyValue('--ring').trim(),
      'color_destructive': style.getPropertyValue('--destructive').trim(),
      'color_destructive_foreground': style.getPropertyValue('--destructive-foreground').trim(),
    };
    
    // Converter HSL para HEX
    const hexMap: Record<string, string> = {};
    Object.entries(colorMap).forEach(([key, hsl]) => {
      if (hsl) {
        hexMap[key] = hslToHex(hsl);
      }
    });
    
    return hexMap;
  };

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await getSiteSettings();
      
      // Converter array para objeto para facilitar o acesso
      const configsObj: Record<string, string> = {};
      data.forEach((config: SiteConfig) => {
        configsObj[config.config_key] = String(config.config_value || '');
      });
      
      // Se não houver cores salvas no banco, extrair do CSS atual
      const currentColors = extractCurrentColors();
      Object.entries(currentColors).forEach(([key, hex]) => {
        if (!configsObj[key] && hex) {
          configsObj[key] = hex;
        }
      });
      
      setConfigs(configsObj);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      toast.error('Erro ao carregar configurações');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    // Validação e normalização de cores HEX
    if (key.startsWith('color_') || key.startsWith('button_')) {
      // Remove espaços
      value = value.trim();
      
      // Se começa com #, valida
      if (value.startsWith('#')) {
        // Remove o #
        let hex = value.substring(1);
        
        // Converte 3 dígitos para 6 (#fff -> #ffffff)
        if (hex.length === 3) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
          value = '#' + hex;
        }
        
        // Valida se é hexadecimal válido (6 dígitos)
        if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
          // Se inválido, mostra feedback e não atualiza
          toast.error(`Cor inválida: ${value}. Use formato #RRGGBB (ex: #1a56db)`);
          return;
        }
        
        // Normaliza para lowercase
        value = value.toLowerCase();
      } else if (value !== '') {
        // Se não tem # e não está vazio, não atualiza
        toast.error('Cor deve começar com # (ex: #1a56db)');
        return;
      }
    }
    
    setConfigs(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (key: 'site_logo' | 'site_favicon', file: File) => {
    const isLogo = key === 'site_logo';
    const setUploading = isLogo ? setUploadingLogo : setUploadingFavicon;
    const setPreview = isLogo ? setLogoPreview : setFaviconPreview;
    const uploadType = isLogo ? 'logo' : 'favicon';

    try {
      // Validar imagem
      const validation = validateImage(file);
      if (!validation.valid) {
        toast.error(validation.error || 'Imagem inválida');
        return;
      }

      setUploading(true);

      // Criar preview
      const preview = await createImagePreview(file);
      setPreview(preview);

      // Fazer upload com tipo específico
      const imageUrl = await uploadImage(file, { type: uploadType });
      
      // Atualizar configuração
      handleChange(key, imageUrl);
      
      toast.success(isLogo ? 'Logo enviada com sucesso!' : 'Favicon enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao enviar imagem');
      setPreview('');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (key: 'site_logo' | 'site_favicon') => {
    const isLogo = key === 'site_logo';
    const setPreview = isLogo ? setLogoPreview : setFaviconPreview;
    
    handleChange(key, '');
    setPreview('');
    toast.success(isLogo ? 'Logo removida' : 'Favicon removido');
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      
      const configsToSave = Object.entries(configs).map(([key, value]) => ({
        config_key: key,
        config_value: value,
        config_type: key.startsWith('color_') || key.startsWith('button_') ? 'color' as const : 
                     key.includes('image') || key.includes('logo') || key.includes('favicon') || key.includes('og_image') ? 'image' as const : 
                     'text' as const,
        description: ''
      }));

      await saveBulkSettings(configsToSave);
      
      // Atualizar o contexto global para aplicar as mudanças no site
      await refreshConfigs();
      
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando configurações...</p>
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
              <h1 className="text-2xl font-bold">Configurações do Site</h1>
            </div>
            <Button onClick={handleSaveAll} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar Tudo'}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="branding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="branding">
              <ImageIcon className="w-4 h-4 mr-2" />
              Marca
            </TabsTrigger>
            <TabsTrigger value="colors">
              <Palette className="w-4 h-4 mr-2" />
              Cores
            </TabsTrigger>
            <TabsTrigger value="og">
              <Globe className="w-4 h-4 mr-2" />
              Preview Links
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Mail className="w-4 h-4 mr-2" />
              Contato
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 className="w-4 h-4 mr-2" />
              Redes Sociais
            </TabsTrigger>
          </TabsList>

          {/* Branding Tab */}
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Identidade Visual</CardTitle>
                <CardDescription>
                  Configure a logo, título e elementos visuais principais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="site_name">Nome da Empresa</Label>
                    <Input
                      id="site_name"
                      type="text"
                      value={configs.site_name || ''}
                      onChange={(e) => handleChange('site_name', e.target.value)}
                      placeholder="Nome da Empresa"
                    />
                    <p className="text-sm text-muted-foreground">
                      Nome usado no header e footer do site
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site_title">Título do Site</Label>
                    <Input
                      id="site_title"
                      type="text"
                      value={configs.site_title || ''}
                      onChange={(e) => handleChange('site_title', e.target.value)}
                      placeholder="Nome da Empresa - Sua Descrição"
                    />
                    <p className="text-sm text-muted-foreground">
                      Título da aba do navegador (se vazio, usa o Nome da Empresa)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site_logo">Logo do Site</Label>
                    <div className="flex gap-2">
                      <Input
                        id="site_logo"
                        type="text"
                        value={configs.site_logo || ''}
                        onChange={(e) => handleChange('site_logo', e.target.value)}
                        placeholder="/logo.svg ou URL da imagem"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => document.getElementById('logo-upload')?.click()}
                        disabled={uploadingLogo}
                      >
                        {uploadingLogo ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </Button>
                      {configs.site_logo && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveImage('site_logo')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload('site_logo', file);
                        e.target.value = '';
                      }}
                    />
                    <p className="text-sm text-muted-foreground">
                      Cole uma URL ou clique em <Upload className="inline h-3 w-3" /> para enviar do computador/celular
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site_logo_alt">Texto Alternativo da Logo</Label>
                    <Input
                      id="site_logo_alt"
                      type="text"
                      value={configs.site_logo_alt || ''}
                      onChange={(e) => handleChange('site_logo_alt', e.target.value)}
                      placeholder="Logo da Empresa"
                    />
                    <p className="text-sm text-muted-foreground">
                      Texto alternativo para acessibilidade (se vazio, usa o Nome da Empresa)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site_tagline">Slogan</Label>
                    <Input
                      id="site_tagline"
                      type="text"
                      value={configs.site_tagline || ''}
                      onChange={(e) => handleChange('site_tagline', e.target.value)}
                      placeholder="Seu Slogan"
                    />
                    <p className="text-sm text-muted-foreground">
                      Aparece abaixo do nome no header
                    </p>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="site_description">Descrição do Site</Label>
                    <Input
                      id="site_description"
                      type="text"
                      value={configs.site_description || ''}
                      onChange={(e) => handleChange('site_description', e.target.value)}
                      placeholder="Soluções completas em locação de veículos"
                    />
                    <p className="text-sm text-muted-foreground">
                      Usada no footer e meta tags
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site_favicon">Favicon</Label>
                    <div className="flex gap-2">
                      <Input
                        id="site_favicon"
                        type="text"
                        value={configs.site_favicon || ''}
                        onChange={(e) => handleChange('site_favicon', e.target.value)}
                        placeholder="/favicon.ico ou URL da imagem"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => document.getElementById('favicon-upload')?.click()}
                        disabled={uploadingFavicon}
                      >
                        {uploadingFavicon ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </Button>
                      {configs.site_favicon && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveImage('site_favicon')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <input
                      id="favicon-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload('site_favicon', file);
                        e.target.value = '';
                      }}
                    />
                    <p className="text-sm text-muted-foreground">
                      Ícone da aba do navegador. Clique em <Upload className="inline h-3 w-3" /> para enviar
                    </p>
                  </div>
                </div>

                {(configs.site_logo || logoPreview) && (
                  <div className="mt-6">
                    <Label>Preview da Logo</Label>
                    <div className="mt-2 p-4 border rounded-lg bg-gray-50 flex items-center justify-center">
                      <img 
                        src={logoPreview || configs.site_logo} 
                        alt={configs.site_logo_alt || 'Logo'} 
                        className="h-20 max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}

                {(configs.site_favicon || faviconPreview) && (
                  <div className="mt-4">
                    <Label>Preview do Favicon</Label>
                    <div className="mt-2 p-4 border rounded-lg bg-gray-50 flex items-center justify-center">
                      <img 
                        src={faviconPreview || configs.site_favicon} 
                        alt="Favicon" 
                        className="h-8 w-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Cores Principais */}
              <Card>
                <CardHeader>
                  <CardTitle>Cor da Marca</CardTitle>
                  <CardDescription>Identidade visual: títulos, destaques e elementos da marca</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Alerta Explicativo */}
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-purple-700">
                          <strong>🎨 Cor da Marca:</strong> Esta é a cor da identidade visual do seu site. 
                          Usada em títulos destacados, ícones, badges e elementos de marca. 
                          <strong>NÃO afeta botões</strong> (configure botões na seção abaixo).
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {[
                    { key: 'color_brand', label: 'Cor da Marca', defaultValue: '#d16167' },
                    { key: 'color_brand_foreground', label: 'Texto sobre Marca', defaultValue: '#fafafa' },
                    { key: 'color_secondary', label: 'Cor Secundária', defaultValue: '#f5f5f5' },
                    { key: 'color_secondary_foreground', label: 'Texto Secundário', defaultValue: '#1a1a1a' },
                    { key: 'color_accent', label: 'Cor de Destaque', defaultValue: '#d9a518' },
                    { key: 'color_accent_foreground', label: 'Texto Destaque', defaultValue: '#ffffff' },
                    { key: 'color_background', label: 'Fundo da Página', defaultValue: '#fafafa' },
                    { key: 'color_text', label: 'Texto Principal', defaultValue: '#1a1a1a' },
                  ].map(({ key, label, defaultValue }) => (
                    <div key={key} className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label htmlFor={key}>{label}</Label>
                        <Input
                          id={key}
                          type="text"
                          value={configs[key] || ''}
                          onChange={(e) => handleChange(key, e.target.value)}
                          placeholder={defaultValue}
                        />
                      </div>
                      <div className="w-16 h-10 border rounded" style={{ backgroundColor: configs[key] || defaultValue }}></div>
                      <Input
                        type="color"
                        value={configs[key] || defaultValue}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Cores dos Botões */}
              <Card>
                <CardHeader>
                  <CardTitle>Cores dos Botões</CardTitle>
                  <CardDescription>Controle independente da cor dos botões do site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          <strong>ℹ️ Informação:</strong> Estas cores são EXCLUSIVAS para os botões do site. 
                          A "Cor da Marca" (seção acima) controla títulos, destaques e identidade visual.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {[
                    { key: 'button_primary_bg', label: 'Botão Primário (Fundo)', defaultValue: '#8B0000' },
                    { key: 'button_primary_text', label: 'Botão Primário (Texto)', defaultValue: '#ffffff' },
                    { key: 'button_primary_hover', label: 'Botão Primário (Hover)', defaultValue: '#6B0000' },
                    { key: 'button_secondary_bg', label: 'Botão Secundário (Fundo)', defaultValue: '#f5f5f5' },
                    { key: 'button_secondary_text', label: 'Botão Secundário (Texto)', defaultValue: '#1a1a1a' },
                    { key: 'button_secondary_hover', label: 'Botão Secundário (Hover)', defaultValue: '#e0e0e0' },
                  ].map(({ key, label, defaultValue }) => (
                    <div key={key} className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label htmlFor={key}>{label}</Label>
                        <Input
                          id={key}
                          type="text"
                          value={configs[key] || ''}
                          onChange={(e) => handleChange(key, e.target.value)}
                          placeholder={defaultValue}
                        />
                      </div>
                      <div className="w-16 h-10 border rounded" style={{ backgroundColor: configs[key] || defaultValue }}></div>
                      <Input
                        type="color"
                        value={configs[key] || defaultValue}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Cores de Card e Background */}
              <Card>
                <CardHeader>
                  <CardTitle>Cards e Superfícies</CardTitle>
                  <CardDescription>Cores de cards, popover e superfícies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'color_card', label: 'Fundo do Card', defaultValue: '#ffffff' },
                    { key: 'color_card_foreground', label: 'Texto do Card', defaultValue: '#1a1a1a' },
                    { key: 'color_popover', label: 'Fundo Popover', defaultValue: '#ffffff' },
                    { key: 'color_popover_foreground', label: 'Texto Popover', defaultValue: '#1a1a1a' },
                    { key: 'color_muted', label: 'Cor Esmaecida', defaultValue: '#f0f0f0' },
                    { key: 'color_muted_foreground', label: 'Texto Esmaecido', defaultValue: '#666666' },
                  ].map(({ key, label, defaultValue }) => (
                    <div key={key} className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label htmlFor={key}>{label}</Label>
                        <Input
                          id={key}
                          type="text"
                          value={configs[key] || ''}
                          onChange={(e) => handleChange(key, e.target.value)}
                          placeholder={defaultValue}
                        />
                      </div>
                      <div className="w-16 h-10 border rounded" style={{ backgroundColor: configs[key] || defaultValue }}></div>
                      <Input
                        type="color"
                        value={configs[key] || defaultValue}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Cores de Borda e Destrutivas */}
              <Card>
                <CardHeader>
                  <CardTitle>Bordas e Estados</CardTitle>
                  <CardDescription>Bordas, inputs e estados de erro</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'color_border', label: 'Borda', defaultValue: '#e5e5e5' },
                    { key: 'color_input', label: 'Borda Input', defaultValue: '#e5e5e5' },
                    { key: 'color_ring', label: 'Anel de Foco', defaultValue: '#ffcc00' },
                    { key: 'color_destructive', label: 'Cor Destrutiva (Erro)', defaultValue: '#ef4444' },
                    { key: 'color_destructive_foreground', label: 'Texto Destrutivo', defaultValue: '#fafafa' },
                  ].map(({ key, label, defaultValue }) => (
                    <div key={key} className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label htmlFor={key}>{label}</Label>
                        <Input
                          id={key}
                          type="text"
                          value={configs[key] || ''}
                          onChange={(e) => handleChange(key, e.target.value)}
                          placeholder={defaultValue}
                        />
                      </div>
                      <div className="w-16 h-10 border rounded" style={{ backgroundColor: configs[key] || defaultValue }}></div>
                      <Input
                        type="color"
                        value={configs[key] || defaultValue}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Open Graph Tab */}
          <TabsContent value="og">
            <Card>
              <CardHeader>
                <CardTitle>Preview de Links (Open Graph)</CardTitle>
                <CardDescription>
                  Configure como seu site aparece quando compartilhado em redes sociais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="og_title">Título</Label>
                    <Input
                      id="og_title"
                      type="text"
                      value={configs.og_title || ''}
                      onChange={(e) => handleChange('og_title', e.target.value)}
                      placeholder="Nome da Empresa - Sua Descrição"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="og_description">Descrição</Label>
                    <Input
                      id="og_description"
                      type="text"
                      value={configs.og_description || ''}
                      onChange={(e) => handleChange('og_description', e.target.value)}
                      placeholder="Aluguel de veículos com as melhores condições..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="og_image">Imagem (1200x630px recomendado)</Label>
                    <Input
                      id="og_image"
                      type="text"
                      value={configs.og_image || ''}
                      onChange={(e) => handleChange('og_image', e.target.value)}
                      placeholder="/og-image.jpg"
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="mt-6">
                  <Label>Preview</Label>
                  <div className="mt-2 border rounded-lg overflow-hidden bg-white shadow-sm max-w-md">
                    {configs.og_image && (
                      <img 
                        src={configs.og_image} 
                        alt="Preview" 
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-sm">{configs.og_title || 'Título do Site'}</h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {configs.og_description || 'Descrição do site...'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>Configure os meios de contato exibidos no site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Telefone</Label>
                    <Input
                      id="contact_phone"
                      type="text"
                      value={configs.contact_phone || ''}
                      onChange={(e) => handleChange('contact_phone', e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_email">E-mail</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={configs.contact_email || ''}
                      onChange={(e) => handleChange('contact_email', e.target.value)}
                      placeholder="contato@suaempresa.com.br"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_whatsapp">WhatsApp (apenas números)</Label>
                    <Input
                      id="contact_whatsapp"
                      type="text"
                      value={configs.contact_whatsapp || ''}
                      onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                      placeholder="5511999999999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_address">Endereço</Label>
                    <Input
                      id="contact_address"
                      type="text"
                      value={configs.contact_address || ''}
                      onChange={(e) => handleChange('contact_address', e.target.value)}
                      placeholder="São Paulo, SP"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
                <CardDescription>URLs das suas redes sociais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'social_facebook', label: 'Facebook', placeholder: 'https://facebook.com/seu-perfil' },
                  { key: 'social_instagram', label: 'Instagram', placeholder: 'https://instagram.com/seu-perfil' },
                  { key: 'social_twitter', label: 'Twitter/X', placeholder: 'https://twitter.com/seu-perfil' },
                  { key: 'social_linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/seu-perfil' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      type="url"
                      value={configs[key] || ''}
                      onChange={(e) => handleChange(key, e.target.value)}
                      placeholder={placeholder}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SiteSettings;
