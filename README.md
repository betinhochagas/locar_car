# 🚗 RV Car Solutions

> Sistema completo de gestão de locação de veículos com painel administrativo intuitivo

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-18+-green.svg)](https://nodejs.org)
[![PHP](https://img.shields.io/badge/PHP-8+-purple.svg)](https://php.net)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org)

---

## 📋 Sobre

**RV Car Solutions** é uma plataforma web moderna para empresas de locação de veículos, com foco em motoristas de aplicativos.

### ✨ Principais Recursos

- 🎨 **Interface Moderna** - Design responsivo e intuitivo
- 🚗 **Gestão de Veículos** - CRUD completo com imagens
- 🎛️ **Painel Admin** - Controle total sem código
- 📱 **Mobile First** - Otimizado para todos dispositivos
- 🎨 **Editor Visual** - Crie seções sem programar
- 📤 **Upload Simples** - Imagens direto do dispositivo
- 🎯 **SEO Otimizado** - Melhor ranqueamento
- ⚡ **Performance** - Carregamento rápido

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/betinhochagas/rvcar.git
cd rv-car-solutions-main

# Instale
npm install

# Inicie (automático)
.\start-completo.bat

# Ou manual
php -S 0.0.0.0:3000    # Backend (Terminal 1)
npm run dev            # Frontend (Terminal 2)

# Acesse
http://localhost:8080
```

**Login Admin:**

- Usuário: `admin`
- Senha: `admin123`

---

## 📚 Documentação

📖 **[Documentação Completa](DOCUMENTACAO.md)** - Guia detalhado de instalação, configuração e uso

**Conteúdo:**

- Instalação passo a passo
- Configuração do sistema
- Uso do painel administrativo
- Deploy em produção
- API e endpoints
- Troubleshooting
- Tutoriais práticos

---

## 🛠️ Tecnologias

### Frontend

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router

### Backend

- PHP 8+
- MySQL 8+
- JSON Storage

---

## 🎯 Funcionalidades

### Para Visitantes

- ✅ Catálogo de veículos com filtros
- ✅ Informações detalhadas
- ✅ Contato via WhatsApp
- ✅ Formulário de contato
- ✅ Seções informativas

### Para Administradores

- ✅ Gerenciar veículos (CRUD)
- ✅ Personalizar cores/temas
- ✅ Criar/editar seções do site
- ✅ Upload de imagens
- ✅ Editor visual de blocos
- ✅ Sistema de preview
- ✅ Sem necessidade de código!

---

## 📦 Instalação

### Pré-requisitos

```
Node.js 18+
PHP 8+
MySQL 8+ (ou XAMPP)
```

### Passos

1. **Clone o repositório**

   ```bash
   git clone https://github.com/betinhochagas/rvcar.git
   cd rv-car-solutions-main
   ```

2. **Instale dependências**

   ```bash
   npm install
   ```

3. **Configure banco de dados**

   - Inicie MySQL (XAMPP)
   - Crie banco `rv_car_solutions`
   - Sistema usa JSON por padrão

4. **Inicie servidores**

   ```bash
   .\start-completo.bat
   ```

5. **Acesse**
   - Site: http://localhost:8080
   - Admin: http://localhost:8080/admin

Veja [DOCUMENTACAO.md](DOCUMENTACAO.md) para mais detalhes.

---

## 🌐 Deploy

### Hospedagem Compartilhada

```bash
# Build
npm run build

# Upload via FTP
/dist/     → /public_html/
/api/      → /public_html/api/
/uploads/  → /public_html/uploads/
```

### VPS/Servidor

```bash
# Nginx + PHP-FPM
git clone [repo]
npm install && npm run build
# Configure nginx (veja docs)
```

Veja guia completo em [DOCUMENTACAO.md](DOCUMENTACAO.md#deploy).

---

## 🎨 Personalização

### Cores

Edite `src/index.css`:

```css
:root {
  --brand-primary: 220 90% 56%; /* Azul */
  --button-primary: 220 90% 56%; /* Botões */
}
```

Ou pelo painel admin: **Configurações → Cores**

### Conteúdo

Pelo painel admin: **Gerenciar Seções da Página**

- Crie seções personalizadas
- Use o editor visual de blocos
- Preview em tempo real
- Sem código!

---

## 📡 API

### Endpoints Principais

```
POST   /api/auth.php           - Login
GET    /api/vehicles.php       - Listar veículos
GET    /api/page-sections.php  - Listar seções
POST   /api/upload.php         - Upload imagem
```

Veja documentação completa da API em [DOCUMENTACAO.md](DOCUMENTACAO.md#api).

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit (`git commit -m 'Adiciona funcionalidade X'`)
4. Push (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

---

## 🐛 Problemas?

Encontrou um bug ou tem uma sugestão?

- 🐛 [Reporte Issues](https://github.com/betinhochagas/rvcar/issues)
- 📖 [Consulte a Documentação](DOCUMENTACAO.md)
- 💬 [Discussões](https://github.com/betinhochagas/rvcar/discussions)

---

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Lucide](https://lucide.dev/) - Ícones
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Vite](https://vitejs.dev/) - Build tool

---

## 📊 Status do Projeto

✅ **Produção** - Sistema estável e pronto para uso

**Versão Atual:** 2.3.0  
**Última Atualização:** 19 de novembro de 2025

---

<div align="center">

**Desenvolvido com ❤️ por [betinhochagas](https://github.com/betinhochagas)**

[⬆ Voltar ao topo](#-rv-car-solutions)

</div>
