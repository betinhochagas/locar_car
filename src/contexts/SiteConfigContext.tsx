import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSiteSettings } from '@/lib/siteConfigManager';
import { SiteConfig } from '@/types/siteConfig';

interface SiteConfigContextType {
  configs: Record<string, string>;
  loading: boolean;
  error: string | null;
  getConfig: (key: string, defaultValue?: string) => string;
  refreshConfigs: () => Promise<void>;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

interface SiteConfigProviderProps {
  children: ReactNode;
}

export const SiteConfigProvider: React.FC<SiteConfigProviderProps> = ({ children }) => {
  const [configs, setConfigs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadConfigs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // SEMPRE carregar do servidor para garantir sincronização entre dispositivos
      // Cache removido para evitar problemas de sincronização
      const data = await getSiteSettings();
      
      // Converter array para objeto {key: value}
      const configMap: Record<string, string> = {};
      data.forEach((config: SiteConfig) => {
        configMap[config.config_key] = config.config_value;
      });
      
      setConfigs(configMap);
      
      // Aplicar cores como CSS variables
      applyCSSVariables(configMap);
      
      // Aplicar configurações imediatamente antes de renderizar
      applyInitialConfigs(configMap);
      
      // Cache removido - sempre busca do servidor para sincronização
    } catch (err) {
      console.error('Erro ao carregar configurações do site:', err);
      setError('Falha ao carregar configurações');
    } finally {
      setLoading(false);
    }
  };

  const applyInitialConfigs = (configMap: Record<string, string>) => {
    // Aplicar título e favicon ANTES de renderizar para evitar flash
    // Usar site_title se disponível, senão usar site_name
    if (configMap.site_title) {
      document.title = configMap.site_title;
    } else if (configMap.site_name) {
      document.title = configMap.site_name;
    }
    
    // Atualizar favicon com cache-busting
    if (configMap.site_favicon) {
      const timestamp = new Date().getTime();
      const faviconUrl = configMap.site_favicon.includes('?') 
        ? `${configMap.site_favicon}&t=${timestamp}`
        : `${configMap.site_favicon}?t=${timestamp}`;
      
      // Atualizar todos os links de favicon
      const faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (faviconLink) {
        faviconLink.href = faviconUrl;
      }
      
      const shortcutIcon = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement;
      if (shortcutIcon) {
        shortcutIcon.href = faviconUrl;
      }
      
      const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
      if (appleTouchIcon) {
        appleTouchIcon.href = faviconUrl;
      }
    }
  };

  // Função auxiliar para converter HEX para HSL
  const hexToHSL = (hex: string): string => {
    // Validação de entrada
    if (!hex || typeof hex !== 'string') return '0 0% 50%';
    
    // Remove o # se presente
    hex = hex.replace('#', '').trim();
    
    // Converte 3 dígitos para 6
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    // Valida formato
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return '0 0% 50%';
    
    // Converte para RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `${h} ${s}% ${l}%`;
  };

  const applyCSSVariables = (configMap: Record<string, string>) => {
    const root = document.documentElement;
    
    // Função auxiliar para aplicar cor (converte HEX para HSL se necessário)
    const applyColor = (cssVar: string, hexColor: string) => {
      if (hexColor) {
        const hslValue = hexToHSL(hexColor);
        root.style.setProperty(cssVar, hslValue);
      }
    };
    
    // Aplicar cor da marca
    applyColor('--brand', configMap.color_brand);
    applyColor('--brand-foreground', configMap.color_brand_foreground);
    
    // Aplicar cores dos botões (INDEPENDENTE da marca)
    applyColor('--button-primary', configMap.button_primary_bg);
    applyColor('--button-primary-foreground', configMap.button_primary_text);
    applyColor('--button-primary-hover', configMap.button_primary_hover);
    applyColor('--button-secondary', configMap.button_secondary_bg);
    applyColor('--button-secondary-foreground', configMap.button_secondary_text);
    applyColor('--button-secondary-hover', configMap.button_secondary_hover);
    
    // Aplicar cores gerais
    applyColor('--secondary', configMap.color_secondary);
    applyColor('--secondary-foreground', configMap.color_secondary_foreground);
    applyColor('--accent', configMap.color_accent);
    applyColor('--accent-foreground', configMap.color_accent_foreground);
    applyColor('--background', configMap.color_background);
    applyColor('--foreground', configMap.color_text);
    
    // Manter primary como alias de brand (compatibilidade)
    root.style.setProperty('--primary', root.style.getPropertyValue('--brand'));
    root.style.setProperty('--primary-foreground', root.style.getPropertyValue('--brand-foreground'));
    
    // Aplicar cores de cards e superfícies
    applyColor('--card', configMap.color_card);
    applyColor('--card-foreground', configMap.color_card_foreground);
    applyColor('--popover', configMap.color_popover);
    applyColor('--popover-foreground', configMap.color_popover_foreground);
    applyColor('--muted', configMap.color_muted);
    applyColor('--muted-foreground', configMap.color_muted_foreground);
    
    // Aplicar cores de bordas e estados
    applyColor('--border', configMap.color_border);
    applyColor('--input', configMap.color_input);
    applyColor('--ring', configMap.color_ring);
    applyColor('--destructive', configMap.color_destructive);
    applyColor('--destructive-foreground', configMap.color_destructive_foreground);
    
    // Aplicar cores dos botões (compatibilidade com código antigo)
    applyColor('--color-primary', configMap.color_primary);
    applyColor('--color-secondary', configMap.color_secondary);
    applyColor('--color-accent', configMap.color_accent);
    applyColor('--color-background', configMap.color_background);
    applyColor('--color-text', configMap.color_text);
    applyColor('--color-border', configMap.color_border);
  };

  const getConfig = (key: string, defaultValue: string = ''): string => {
    return configs[key] || defaultValue;
  };

  const refreshConfigs = async () => {
    // Recarregar diretamente do servidor
    await loadConfigs();
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  // Mostrar loader enquanto carrega configurações críticas
  if (loading) {
    return (
      <div style={{ 
        position: 'fixed', 
        inset: 0, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        zIndex: 9999
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <SiteConfigContext.Provider value={{ configs, loading, error, getConfig, refreshConfigs }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig deve ser usado dentro de SiteConfigProvider');
  }
  return context;
};
