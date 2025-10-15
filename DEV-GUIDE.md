# 🚀 Guia de Desenvolvimento Local

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ou **Bun** (recomendado)
- **Git**
- **Editor de código** (VS Code recomendado)

## 🔧 Configuração Inicial

### 1. Clone o repositório

```bash
git clone https://github.com/betinhochagas/rvcar.git
cd rvcar
```

### 2. Instale as dependências

```bash
# Com Bun (recomendado - mais rápido)
bun install

# Ou com npm
npm install

# Ou com yarn
yarn install
```

### 3. Configure o ambiente de desenvolvimento

```bash
# Crie um arquivo .env.local (opcional)
cp .env.example .env.local
```

## 🏃‍♂️ Executando o Projeto

### Servidor de Desenvolvimento

```bash
# Com Bun
bun dev

# Com npm
npm run dev

# Com yarn
yarn dev
```

O projeto estará disponível em: **http://localhost:8080**

### Build para Produção

```bash
# Build otimizado
bun run build

# Preview do build
bun run preview
```

## 🛠️ Scripts Disponíveis

| Script          | Descrição                          |
| --------------- | ---------------------------------- |
| `bun dev`       | Inicia servidor de desenvolvimento |
| `bun build`     | Build para produção                |
| `bun build:dev` | Build para desenvolvimento         |
| `bun preview`   | Preview do build                   |
| `bun lint`      | Executa ESLint                     |

## 📁 Estrutura de Desenvolvimento

### Diretórios Principais

```
src/
├── 📁 components/     # Componentes React
│   ├── 🏠 Hero.tsx    # Seção principal
│   ├── 🚗 VehicleCatalog.tsx # Catálogo
│   └── 📁 ui/         # Componentes UI
├── 📁 pages/          # Páginas da aplicação
├── 📁 hooks/          # Custom hooks
├── 📁 lib/            # Utilitários
└── 📁 assets/         # Imagens e recursos
```

### Arquivos de Configuração

- `vite.config.ts` - Configuração do Vite
- `tailwind.config.ts` - Configuração do Tailwind
- `tsconfig.json` - Configuração do TypeScript
- `eslint.config.js` - Configuração do ESLint

## 🎨 Desenvolvimento de Componentes

### Criando um Novo Componente

```typescript
// src/components/MeuComponente.tsx
import { ComponentProps } from "react";

interface MeuComponenteProps {
  title: string;
  description?: string;
}

const MeuComponente = ({ title, description }: MeuComponenteProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};

export default MeuComponente;
```

### Usando o Componente

```typescript
// src/pages/MinhaPagea.tsx
import MeuComponente from "@/components/MeuComponente";

const MinhaPagina = () => {
  return (
    <div>
      <MeuComponente
        title="Título do Componente"
        description="Descrição opcional"
      />
    </div>
  );
};
```

## 🎨 Sistema de Design

### Cores Principais

```css
/* src/index.css */
:root {
  --primary: 217 91% 60%; /* Azul RV Car */
  --secondary: 210 40% 98%; /* Cinza claro */
  --background: 0 0% 100%; /* Branco */
}
```

### Classes Tailwind Mais Usadas

```css
/* Layout */
.container mx-auto px-4
.grid md:grid-cols-2 lg:grid-cols-4
.flex items-center justify-center

/* Spacing */
.py-20 .px-4 .mb-6 .mt-12

/* Typography */
.text-3xl .font-bold .text-primary
.text-muted-foreground .leading-relaxed

/* Effects */
.hover:shadow-lg .transition-all
.animate-fade-in .hover:-translate-y-1
```

## 📱 WhatsApp Integration

### Configuração

```typescript
// Número principal da RV Car
const WHATSAPP_NUMBER = "5547984485492";

// Função helper
const openWhatsApp = (message?: string) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
  window.open(url, "_blank");
};
```

### Uso nos Componentes

```typescript
// Botão simples
<Button onClick={() => openWhatsApp()}>
  Falar no WhatsApp
</Button>

// Com mensagem personalizada
<Button onClick={() => openWhatsApp("Quero alugar um carro!")}>
  Solicitar Orçamento
</Button>
```

## 🚗 Adicionando Novos Veículos

### 1. Adicione a imagem

```
src/assets/novo-veiculo.jpg
```

### 2. Importe no VehicleCatalog

```typescript
import novoVeiculoImg from "@/assets/novo-veiculo.jpg";
```

### 3. Adicione ao array de veículos

```typescript
const vehicles = [
  // ... veículos existentes
  {
    name: "Novo Veículo",
    price: "R$700",
    image: novoVeiculoImg,
    features: ["Característica 1", "Característica 2"],
  },
];
```

## 🧪 Testes e Qualidade

### ESLint

```bash
# Verificar problemas
bun lint

# Corrigir automaticamente
bun lint --fix
```

### Verificação de Tipos

```bash
# TypeScript check
npx tsc --noEmit
```

### Performance

```bash
# Análise do bundle
bun run build --analyze
```

## 🔧 Troubleshooting

### Problemas Comuns

**Erro de importação de imagens:**

```typescript
// ❌ Incorreto
import heroImg from "assets/hero.jpg";

// ✅ Correto
import heroImg from "@/assets/hero.jpg";
```

**Erro de Tailwind não funcionando:**

```bash
# Reinicie o servidor
Ctrl+C
bun dev
```

**Build falhando:**

```bash
# Limpe o cache
rm -rf node_modules dist .vite
bun install
bun build
```

## 📊 Performance Tips

### Otimizações Recomendadas

- Use `lazy loading` para imagens grandes
- Implemente `code splitting` para rotas
- Minimize o uso de bibliotecas pesadas
- Use `React.memo` para componentes pesados

### Ferramentas de Análise

- **Lighthouse** - Auditoria de performance
- **Bundle Analyzer** - Análise do tamanho do bundle
- **React DevTools** - Debugging de componentes

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte o GitHub ao Vercel
2. Configure: `Framework Preset: Vite`
3. Build Command: `bun run build`
4. Output Directory: `dist`

### Netlify

1. Conecte o repositório
2. Build Command: `bun run build`
3. Publish Directory: `dist`

## 📞 Suporte de Desenvolvimento

### Dúvidas Técnicas

- **GitHub Issues**: Para bugs e melhorias
- **WhatsApp**: (47) 98448-5492
- **Email**: dev@rvcar.com.br

### Recursos Úteis

- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎯 Próximos Passos

Após configurar o ambiente:

1. ✅ Familiarize-se com a estrutura do projeto
2. ✅ Execute o projeto localmente
3. ✅ Explore os componentes existentes
4. ✅ Faça uma pequena modificação de teste
5. ✅ Leia o guia de contribuição (`CONTRIBUTING.md`)

**Happy coding! 🚗💻**
