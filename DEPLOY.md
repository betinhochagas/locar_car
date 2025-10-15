# 🚀 Deploy e Produção

## 📋 Guia de Deploy

### 🌐 Plataformas Suportadas

#### Vercel (Recomendado)

✅ **Deploy automático via GitHub**
✅ **HTTPS gratuito**
✅ **CDN global**
✅ **Preview deployments**

**Configuração:**

1. Conecte o repositório ao Vercel
2. Configure as seguintes opções:
   - Framework Preset: `Vite`
   - Build Command: `bun run build`
   - Output Directory: `dist`
   - Install Command: `bun install`

**vercel.json (opcional):**

```json
{
  "framework": "vite",
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "installCommand": "bun install",
  "functions": {},
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Netlify

✅ **Deploy contínuo**
✅ **Form handling**
✅ **Edge functions**

**netlify.toml:**

```toml
[build]
  command = "bun run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### GitHub Pages

✅ **Hospedagem gratuita**
✅ **Integração nativa com GitHub**

**Workflow (.github/workflows/deploy.yml):**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## ⚙️ Configurações de Produção

### Variáveis de Ambiente

```bash
# .env.production
VITE_APP_TITLE="RV Car Solutions"
VITE_WHATSAPP_NUMBER="5547984485492"
VITE_API_URL="https://api.rvcar.com.br"
```

### Otimizações de Build

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

### Headers de Segurança

```
# _headers (Netlify)
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://wa.me
```

## 🔍 Monitoramento

### Google Analytics

```html
<!-- index.html -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### Meta Tags para SEO

```html
<!-- index.html -->
<meta
  name="description"
  content="Locação de veículos para motoristas de aplicativo em Blumenau-SC. Planos a partir de R$650/semana."
/>
<meta
  name="keywords"
  content="aluguel carro, motorista app, uber, 99, blumenau"
/>
<meta property="og:title" content="RV Car Solutions - Aluguel de Carros" />
<meta
  property="og:description"
  content="Veículos para motoristas de app em Blumenau-SC"
/>
<meta property="og:url" content="https://rvcar.com.br" />
<meta property="og:type" content="website" />
```

## 📊 Performance

### Core Web Vitals Target

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Otimizações Implementadas

✅ **Image optimization** com lazy loading
✅ **Code splitting** por rota
✅ **Tree shaking** automático
✅ **CSS purging** com Tailwind
✅ **Bundle minification**

### Lighthouse Score Target

- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

## 🌐 CDN e Assets

### Imagens

- Formato WebP quando possível
- Lazy loading implementado
- Tamanhos responsivos

### Fonts

```css
/* Google Fonts otimizado */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
```

## 🔒 Segurança

### HTTPS

- Certificado SSL automático (Vercel/Netlify)
- Redirecionamento HTTP → HTTPS
- HSTS headers configurados

### Content Security Policy

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://wa.me https://www.google-analytics.com;
```

## 📱 PWA (Futuro)

### Service Worker

```javascript
// public/sw.js
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

### Manifest

```json
{
  "name": "RV Car Solutions",
  "short_name": "RV Car",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [master, develop]
  pull_request:
    branches: [master]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run lint
      - run: bun run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/master'
    steps:
      - name: Deploy to production
        run: echo "Deploying to production..."
```

## 📈 Analytics e Métricas

### Métricas de Negócio

- Conversões para WhatsApp
- Tempo na página
- Taxa de rejeição
- Formulários preenchidos

### Ferramentas Recomendadas

- **Google Analytics 4**
- **Google Search Console**
- **Hotjar** (heatmaps)
- **PageSpeed Insights**

## 🚨 Troubleshooting em Produção

### Problemas Comuns

**Build falhando:**

```bash
# Verificar dependências
bun install --frozen-lockfile
bun run build
```

**Imagens não carregando:**

- Verificar paths relativos
- Confirmar otimização de imagens
- Checar CORS headers

**WhatsApp não funcionando:**

- Testar em dispositivo móvel
- Verificar número no formato internacional
- Confirmar encoding da URL

## 📞 Suporte em Produção

### Monitoramento 24/7

- **Uptime monitoring** com Pingdom
- **Error tracking** com Sentry
- **Performance monitoring** com Lighthouse CI

### Contatos de Emergência

- **Técnico**: dev@rvcar.com.br
- **WhatsApp**: (47) 98448-5492
- **GitHub Issues**: Para bugs críticos

---

## ✅ Checklist de Deploy

### Pré-Deploy

- [ ] Testes locais passando
- [ ] Build de produção funcional
- [ ] Performance otimizada
- [ ] SEO configurado
- [ ] Analytics implementado

### Pós-Deploy

- [ ] Site acessível via HTTPS
- [ ] WhatsApp funcionando
- [ ] Formulários testados
- [ ] Performance validada
- [ ] Analytics coletando dados

### Manutenção

- [ ] Backups configurados
- [ ] Monitoramento ativo
- [ ] Atualizações de segurança
- [ ] Revisão mensal de métricas

---

**Deploy realizado com sucesso! 🚀**

> Site online em: **https://rvcar.vercel.app** (exemplo)
