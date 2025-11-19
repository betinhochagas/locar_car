# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [2.3.0] - 2025-11-19

### Adicionado

#### 🎨 Editor Visual de Blocos

- ✅ **Editor visual completo** sem necessidade de código
- ✅ **6 tipos de blocos:**
  - 📝 Título (H1/H2/H3 com alinhamento)
  - 📄 Parágrafo (texto multilinha com alinhamento)
  - 🖼️ Imagem (upload + alt text + legenda)
  - 🔘 Botão (3 estilos: primary/secondary/outline)
  - 📋 Lista (adicionar/remover itens dinamicamente)
  - ━ Divisor (linha horizontal)
- ✅ **Controles intuitivos:** adicionar, remover, reordenar com setas
- ✅ **Preview em tempo real** em abas separadas
- ✅ **Componente CustomSection** para renderizar blocos no site

#### 📚 Documentação Consolidada

- ✅ **README.md** moderno com badges e quick start
- ✅ **DOCUMENTACAO.md** completa (500+ linhas):
  - Instalação detalhada (3 métodos)
  - Configuração (env, cores, PHP)
  - Guia do painel admin (veículos, settings, seções, uploads)
  - Deploy guides (cPanel, VPS, Netlify)
  - API documentation (todos endpoints)
  - Security best practices
  - Troubleshooting completo
  - Project structure
  - Quick tutorials
  - Contributing guidelines
- ✅ **EDITOR-VISUAL-BLOCOS.md** (380+ linhas):
  - Como funciona o editor
  - Tutorial de cada bloco
  - Exemplos práticos
  - Dicas de design
  - FAQ

#### 🎯 Interface Visual para Seções

- ✅ **Formulários específicos** para cada tipo de seção
- ✅ **Sistema de abas:** Formulário | Pré-visualização
- ✅ **Gerenciamento de arrays** com add/remove buttons
- ✅ **Star rating system** interativo
- ✅ **Upload de imagens** integrado
- ✅ **Preview dinâmico** mostra resultado final

### Modificado

- ✅ **SectionFormBuilder.tsx:** adicionado editor de blocos completo
- ✅ **SectionPreview.tsx:** renderização de todos os blocos
- ✅ **DynamicSection.tsx:** suporte a blocks + HTML legacy
- ✅ **Sistema de cores:** separação brand colors vs button colors
- ✅ **Upload manager:** suporte multi-tipo (vehicle, logo, favicon, section)

### Removido

- 🗑️ **129 arquivos de documentação antiga** consolidados
- 🗑️ **Requirement de código HTML** para seções customizadas
- 🗑️ **JSON editing manual** substituído por forms visuais

### Melhorado

- ⚡ **Performance:** build otimizado (496 kB bundle, 149 kB gzip)
- 🎨 **UX:** interface 100% visual, sem código
- 📱 **Mobile:** todos formulários responsivos
- ♿ **Acessibilidade:** componentes com ARIA labels
- 🔒 **Segurança:** validação de uploads, sanitização de inputs

## [1.0.0] - 2024-10-14

### Adicionado

- ✅ **Landing page completa** com design moderno e responsivo
- ✅ **Seção Hero** com call-to-action para WhatsApp
- ✅ **Catálogo de veículos** com 8 modelos disponíveis:
  - Fiat Mobi (R$ 650/semana)
  - Renault Kwid (R$ 650/semana)
  - Fiat Uno (R$ 650/semana)
  - Chevrolet Onix (R$ 700/semana)
  - VW Gol (R$ 700/semana)
  - VW Voyage (R$ 700/semana)
  - Renault Sandero (R$ 700/semana)
  - Nissan Versa (R$ 700/semana)
- ✅ **Seção de serviços** com cards informativos
- ✅ **Seção de investimento** para atrair investidores
- ✅ **Seção sobre** com missão e visão da empresa
- ✅ **Formulário de contato** integrado com WhatsApp
- ✅ **Botão flutuante do WhatsApp** sempre visível
- ✅ **Navegação suave** entre seções
- ✅ **Animações CSS** para melhor UX
- ✅ **Design responsivo** para todos os dispositivos
- ✅ **Integração completa com WhatsApp** ((47) 98448-5492)

### Tecnologias Implementadas

- ✅ **React 18.3.1** como framework principal
- ✅ **TypeScript 5.8.3** para type safety
- ✅ **Vite 5.4.19** como build tool
- ✅ **Tailwind CSS 3.4.17** para styling
- ✅ **shadcn/ui** para componentes
- ✅ **React Router DOM** para navegação
- ✅ **React Hook Form** para formulários
- ✅ **Lucide React** para ícones
- ✅ **Sonner** para notificações

### SEO e Performance

- ✅ **Meta tags** otimizadas
- ✅ **Estrutura semântica** HTML5
- ✅ **Lazy loading** de imagens
- ✅ **Code splitting** implementado
- ✅ **Performance otimizada** para Core Web Vitals

## Próximas Versões

### [1.1.0] - Planejado

- [ ] Sistema de reservas online
- [ ] Painel administrativo básico
- [ ] Melhorias na seção de investimento
- [ ] Mais opções de contato

### [1.2.0] - Planejado

- [ ] Integração com API de pagamentos
- [ ] Dashboard para investidores
- [ ] Sistema de avaliações de clientes
- [ ] Chat em tempo real

### [2.0.0] - Futuro

- [ ] PWA (Progressive Web App)
- [ ] Aplicativo mobile
- [ ] Sistema completo de gestão de frota
- [ ] Multilíngue (EN/ES)

---

**Legenda:**

- ✅ Implementado
- 🔄 Em desenvolvimento
- 📋 Planejado
- ❌ Cancelado
