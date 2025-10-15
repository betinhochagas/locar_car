# RV Car Solutions

> **Site institucional para locação de veículos para motoristas de aplicativo**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC.svg)](https://tailwindcss.com/)

## 📋 Sobre o Projeto

A **RV Car Solutions** é uma empresa especializada em locação de veículos para motoristas de aplicativo (Uber, 99, etc.) localizada em Blumenau - Santa Catarina. Este site apresenta os serviços da empresa, catálogo de veículos disponíveis, planos de investimento e informações de contato.

### 🎯 Objetivos do Site

- Apresentar os serviços de locação de veículos
- Exibir catálogo completo de veículos disponíveis
- Facilitar contato via WhatsApp
- Atrair investidores para a frota
- Estabelecer presença digital profissional

## 🚀 Funcionalidades

### 🏠 **Landing Page Completa**

- **Hero Section**: Apresentação principal com CTA para WhatsApp
- **Serviços**: Cards informativos sobre os serviços oferecidos
- **Catálogo de Veículos**: Grid responsivo com 8 modelos disponíveis
- **Investimento**: Seção dedicada para atrair investidores
- **Sobre**: Informações da empresa e localização
- **Contato**: Formulário integrado com WhatsApp

### 📱 **Recursos Interativos**

- **WhatsApp Integration**: Botão flutuante e links diretos
- **Formulário de Contato**: Envia dados diretamente para WhatsApp
- **Navegação Smooth**: Scroll suave entre seções
- **Animações**: Transições elegantes com CSS animations

### 🎨 **Design Responsivo**

- Layout mobile-first
- Componentes adaptativos
- Interface moderna com Tailwind CSS
- Sistema de cores personalizado

## 🛠️ Tecnologias Utilizadas

### **Frontend Framework**

- **React 18.3.1** - Biblioteca JavaScript para interfaces
- **TypeScript 5.8.3** - Superset tipado do JavaScript
- **Vite 5.4.19** - Build tool e dev server

### **Styling & UI**

- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **Radix UI** - Componentes primitivos acessíveis
- **Lucide React** - Biblioteca de ícones
- **CSS Custom Properties** - Variáveis CSS para temas

### **Roteamento & Estado**

- **React Router DOM 6.30.1** - Roteamento SPA
- **TanStack Query 5.83.0** - Gerenciamento de estado servidor
- **React Hook Form 7.61.1** - Formulários performáticos

### **Desenvolvimento**

- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **SWC** - Compilador rápido para JavaScript/TypeScript

## 📁 Estrutura do Projeto

```
rv-car-solutions/
├── 📄 package.json              # Dependências e scripts
├── 📄 vite.config.ts           # Configuração do Vite
├── 📄 tailwind.config.ts       # Configuração do Tailwind
├── 📄 tsconfig.json            # Configuração TypeScript
├── 📄 components.json          # Configuração shadcn/ui
├── 📄 eslint.config.js         # Configuração ESLint
├── 📄 postcss.config.js        # Configuração PostCSS
├── 📄 index.html               # HTML principal
├── 📄 bun.lockb                # Lock file do Bun
├── 📁 public/                  # Arquivos estáticos
│   └── 📄 robots.txt
├── 📁 src/                     # Código fonte
│   ├── 📄 App.tsx              # Componente raiz
│   ├── 📄 main.tsx             # Entry point
│   ├── 📄 index.css            # Estilos globais
│   ├── 📄 App.css              # Estilos do App
│   ├── 📄 vite-env.d.ts        # Types do Vite
│   ├── 📁 assets/              # Imagens dos veículos
│   │   ├── 🖼️ hero-bg.jpg       # Background do hero
│   │   ├── 🖼️ investment.jpg    # Imagem da seção investimento
│   │   ├── 🖼️ mobi.jpg          # Fiat Mobi
│   │   ├── 🖼️ kwid.jpg          # Renault Kwid
│   │   ├── 🖼️ uno.jpg           # Fiat Uno
│   │   ├── 🖼️ onix.jpg          # Chevrolet Onix
│   │   ├── 🖼️ gol.jpg           # VW Gol
│   │   ├── 🖼️ voyage.jpg        # VW Voyage
│   │   ├── 🖼️ sandero.jpg       # Renault Sandero
│   │   └── 🖼️ versa.jpg         # Nissan Versa
│   ├── 📁 components/          # Componentes React
│   │   ├── 🔧 Navbar.tsx        # Barra de navegação
│   │   ├── 🏠 Hero.tsx          # Seção principal
│   │   ├── 🛠️ Services.tsx      # Seção de serviços
│   │   ├── 🚗 VehicleCatalog.tsx # Catálogo de veículos
│   │   ├── 🚗 VehicleCard.tsx   # Card individual do veículo
│   │   ├── 💰 Investment.tsx    # Seção de investimento
│   │   ├── 📋 About.tsx         # Sobre a empresa
│   │   ├── 📞 Contact.tsx       # Formulário de contato
│   │   ├── 🦶 Footer.tsx        # Rodapé
│   │   ├── 💬 WhatsAppButton.tsx # Botão flutuante WhatsApp
│   │   └── 📁 ui/              # Componentes UI (shadcn/ui)
│   ├── 📁 hooks/               # React Hooks customizados
│   ├── 📁 lib/                 # Utilitários
│   │   └── 🔧 utils.ts         # Funções utilitárias
│   └── 📁 pages/               # Páginas da aplicação
│       ├── 🏠 Index.tsx        # Página principal
│       └── ❌ NotFound.tsx     # Página 404
```

## 🎨 Design System

### **Paleta de Cores**

```css
:root {
  --primary: 217 91% 60%; /* Azul principal */
  --secondary: 210 40% 98%; /* Cinza claro */
  --background: 0 0% 100%; /* Branco */
  --foreground: 222.2 84% 4.9%; /* Preto */
  --muted: 210 40% 96%; /* Cinza suave */
  --border: 214.3 31.8% 91.4%; /* Borda */
  --dark: 222.2 84% 4.9%; /* Escuro */
}
```

### **Tipografia**

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 400, 500, 600, 700
- **Responsive Scale**: text-sm a text-6xl

### **Componentes UI**

Utiliza o **shadcn/ui** como base, incluindo:

- Cards
- Buttons
- Forms (Input, Textarea)
- Dialogs
- Tooltips
- Toast notifications

## 🚗 Catálogo de Veículos

| Modelo              | Preço/Semana | Categoria | Características                     |
| ------------------- | ------------ | --------- | ----------------------------------- |
| **Fiat Mobi**       | R$ 650       | Econômico | Ar condicionado, direção hidráulica |
| **Renault Kwid**    | R$ 650       | Compacto  | Baixo consumo, tecnologia moderna   |
| **Fiat Uno**        | R$ 650       | Popular   | Confiável, peças acessíveis         |
| **Chevrolet Onix**  | R$ 700       | Premium   | Conforto superior, tecnologia       |
| **VW Gol**          | R$ 700       | Líder     | Manutenção fácil, design moderno    |
| **VW Voyage**       | R$ 700       | Sedan     | Porta-malas amplo, elegante         |
| **Renault Sandero** | R$ 700       | Versátil  | Espaço interno, design arrojado     |
| **Nissan Versa**    | R$ 700       | Premium   | Tecnologia avançada, conforto total |

## 📱 Integração WhatsApp

### **Funcionalidades**

- **Botão Flutuante**: Sempre visível na tela
- **Links Diretos**: Em botões e formulários
- **Mensagens Personalizadas**: Contexto específico por seção
- **Contato Principal**: (47) 98448-5492

### **Mensagens Automáticas**

```javascript
// Hero Section
"Olá! Gostaria de alugar um carro para trabalhar com aplicativo.";

// Formulário de Contato
"Nome: [nome]\nEmail: [email]\nTelefone: [telefone]\nMensagem: [mensagem]";

// Investimento
"Olá! Gostaria de saber mais sobre investimento em frota de locação.";
```

## 🚀 Instalação e Configuração

### **Pré-requisitos**

- Node.js 18+ ou Bun
- Git

### **Clonagem do Repositório**

```bash
git clone https://github.com/betinhochagas/rvcar.git
cd rvcar
```

### **Instalação de Dependências**

```bash
# Com npm
npm install

# Com yarn
yarn install

# Com bun (recomendado)
bun install
```

### **Scripts Disponíveis**

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
bun dev             # Com Bun (mais rápido)

# Build
npm run build       # Build para produção
npm run build:dev   # Build para desenvolvimento

# Qualidade de Código
npm run lint        # Executa ESLint

# Preview
npm run preview     # Preview do build de produção
```

## 🌐 Deploy

### **Ambientes Suportados**

- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **Servidor próprio**

### **Build de Produção**

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### **Configuração do Servidor**

Para SPAs, configure o servidor para redirecionar todas as rotas para `index.html`:

**Nginx**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache (.htaccess)**

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 📊 Performance

### **Métricas de Performance**

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

### **Otimizações Implementadas**

- **Code Splitting** com React Router
- **Lazy Loading** de imagens
- **Tree Shaking** automático
- **Minificação** de assets
- **Compressão** de imagens

## 🔧 Personalização

### **Alterando Cores**

Edite as variáveis CSS em `src/index.css`:

```css
:root {
  --primary: 217 91% 60%; /* Sua cor primária */
  --secondary: 210 40% 98%; /* Sua cor secundária */
}
```

### **Modificando Conteúdo**

- **Veículos**: `src/components/VehicleCatalog.tsx`
- **Contato**: `src/components/Contact.tsx`
- **Sobre**: `src/components/About.tsx`

### **Adicionando Páginas**

1. Crie o componente em `src/pages/`
2. Adicione a rota em `src/App.tsx`
3. Atualize a navegação em `src/components/Navbar.tsx`

## 📱 Responsividade

### **Breakpoints**

```css
sm: 640px    /* Smartphones */
md: 768px    /* Tablets */
lg: 1024px   /* Laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large screens */
```

### **Componentes Responsivos**

- Grid layouts adaptáveis
- Tipografia responsiva
- Imagens otimizadas
- Navegação mobile-friendly

## 🛡️ SEO

### **Meta Tags Implementadas**

```html
<title>RV Car Solutions - Aluguel de Carros para Motoristas de App</title>
<meta
  name="description"
  content="Locação de veículos para motoristas de aplicativo em Blumenau-SC. Planos a partir de R$650/semana. WhatsApp: (47) 98448-5492"
/>
<meta
  name="keywords"
  content="aluguel carro, motorista app, uber, 99, blumenau, locação veículos"
/>
```

### **Estrutura Semântica**

- Uso correto de tags HTML5
- Hierarquia de headings (h1-h6)
- Alt text em imagens
- Links descritivos

## 🔒 Segurança

### **Implementações de Segurança**

- **Content Security Policy** (CSP)
- **HTTPS** obrigatório
- **Sanitização** de inputs
- **Validação** client-side

## 🐛 Troubleshooting

### **Problemas Comuns**

**Build falha:**

```bash
# Limpe o cache
rm -rf node_modules dist .vite
npm install
npm run build
```

**Imagens não carregam:**

- Verifique se estão na pasta `src/assets/`
- Confirme a importação correta
- Valide o formato (jpg, png, webp)

**WhatsApp não abre:**

- Verifique o número no formato internacional
- Teste em dispositivo mobile
- Confirme as permissões do navegador

## 🤝 Contribuição

### **Como Contribuir**

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit as mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### **Padrões de Código**

- Use TypeScript para type safety
- Siga as convenções do ESLint
- Componentes funcionais com hooks
- CSS-in-JS com Tailwind
- Commits semânticos

## 📈 Roadmap

### **Próximas Features**

- [ ] Sistema de reservas online
- [ ] Painel administrativo
- [ ] Integração com API de pagamentos
- [ ] Chat em tempo real
- [ ] PWA (Progressive Web App)
- [ ] Dashboard para investidores
- [ ] Sistema de avaliações
- [ ] Multilíngue (EN/ES)

## 📞 Suporte

### **Contatos**

- **WhatsApp Business**: (47) 98448-5492
- **Email**: contato@rvcar.com.br
- **Endereço**: Blumenau - Santa Catarina

### **Horários de Atendimento**

- **Segunda a Sábado**: 8h às 20h
- **Domingo**: 9h às 18h
- **Emergencial**: 24/7

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

## 📋 Changelog

### **v1.0.0** (2024)

- ✅ Landing page completa
- ✅ Catálogo de 8 veículos
- ✅ Integração WhatsApp
- ✅ Design responsivo
- ✅ Formulário de contato
- ✅ Seção de investimento
- ✅ Animações CSS
- ✅ SEO otimizado

---

**Desenvolvido com ❤️ para RV Car Solutions**

> 🚗 Facilitando a mobilidade urbana em Blumenau - SC
