# Documentação Técnica - RV Car Solutions

## 📋 Índice

- [Arquitetura](#arquitetura)
- [Componentes](#componentes)
- [Hooks](#hooks)
- [Utilitários](#utilitários)
- [Configurações](#configurações)
- [Deploy](#deploy)
- [Manutenção](#manutenção)

## 🏗️ Arquitetura

### Estrutura da Aplicação

```
RV Car Solutions
├── Frontend (React SPA)
├── Styling (Tailwind CSS)
├── Components (shadcn/ui)
├── Integration (WhatsApp)
└── Build (Vite)
```

### Fluxo de Dados

```
User Input → React Components → WhatsApp Integration
```

### Decisões Arquiteturais

- **React SPA**: Melhor UX para landing page
- **TypeScript**: Type safety e melhor DX
- **Tailwind CSS**: Rapid prototyping e consistência
- **Vite**: Build rápido e HMR eficiente

## 🧩 Componentes

### Componentes de Layout

- **`Navbar`**: Navegação principal
- **`Footer`**: Rodapé com informações
- **`Hero`**: Seção principal da landing page

### Componentes de Conteúdo

- **`Services`**: Grid de serviços oferecidos
- **`VehicleCatalog`**: Lista de veículos disponíveis
- **`VehicleCard`**: Card individual de veículo
- **`Investment`**: Seção para investidores
- **`About`**: Informações da empresa
- **`Contact`**: Formulário de contato

### Componentes Interativos

- **`WhatsAppButton`**: Botão flutuante fixo

### Componentes UI (shadcn/ui)

```typescript
// Estrutura base dos componentes UI
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}
```

## 🎣 Hooks

### Hooks Personalizados

- **`use-mobile`**: Detecta dispositivos móveis
- **`use-toast`**: Sistema de notificações

### Hooks Utilizados

- `useState`: Estado local dos componentes
- `useEffect`: Efeitos colaterais
- `useForm`: Gerenciamento de formulários

## 🛠️ Utilitários

### `lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Funções de Integração WhatsApp

```typescript
// Exemplo de função para WhatsApp
const handleWhatsApp = (message?: string) => {
  const phone = "5547984485492";
  const url = `https://wa.me/${phone}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
  window.open(url, "_blank");
};
```

## ⚙️ Configurações

### Vite Configuration

```typescript
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

### Tailwind Configuration

```typescript
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        // ... outras cores
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
      },
    },
  },
} satisfies Config;
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🚀 Deploy

### Build Process

```bash
# 1. Install dependencies
bun install

# 2. Run type checking
tsc --noEmit

# 3. Build for production
bun run build

# 4. Output location
dist/
```

### Deploy Targets

#### Vercel

```json
{
  "framework": "vite",
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "installCommand": "bun install"
}
```

#### Netlify

```toml
[build]
  command = "bun run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Static Server

```nginx
server {
    listen 80;
    server_name rvcar.com.br;
    root /var/www/rvcar/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔧 Manutenção

### Atualizações de Dependências

```bash
# Check outdated packages
bun outdated

# Update all packages
bun update

# Update specific package
bun update package-name
```

### Monitoramento de Performance

- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Size**: Analyze com `bun run build --analyze`
- **Lighthouse**: Auditoria automática

### Backup e Versionamento

- **Git**: Controle de versão
- **GitHub**: Repositório remoto
- **Tags**: Versionamento semântico

### Logs e Debugging

```typescript
// Debugging em desenvolvimento
if (import.meta.env.DEV) {
  console.log("Debug info:", data);
}

// Error boundaries para produção
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }
}
```

### Security Checklist

- [ ] HTTPS obrigatório
- [ ] Content Security Policy configurado
- [ ] Inputs sanitizados
- [ ] Dependencies atualizadas
- [ ] Environment variables protegidas

### Performance Optimization

- [ ] Lazy loading de imagens
- [ ] Code splitting por rota
- [ ] Minificação de assets
- [ ] Compressão gzip/brotli
- [ ] CDN para assets estáticos

### SEO Maintenance

- [ ] Meta tags atualizadas
- [ ] Sitemap.xml gerado
- [ ] Robots.txt configurado
- [ ] Schema markup implementado
- [ ] Alt text em todas as imagens

### Mobile Optimization

- [ ] Touch targets adequados (44px+)
- [ ] Viewport meta tag configurada
- [ ] Font sizes legíveis (16px+)
- [ ] Loading states para interações
- [ ] Offline fallbacks

---

## 📞 Suporte Técnico

Para questões técnicas:

- **GitHub Issues**: Bugs e feature requests
- **Email**: dev@rvcar.com.br
- **WhatsApp**: (47) 98448-5492

---

**Documentação atualizada em:** 14 de outubro de 2024
