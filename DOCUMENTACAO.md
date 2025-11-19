# 📚 RV Car Solutions - Documentação Completa

> Sistema completo de gestão de locação de veículos com painel administrativo intuitivo

**Versão**: 2.3.0  
**Data**: 19 de novembro de 2025  
**Licença**: MIT

---

## 📋 Índice

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Tecnologias](#tecnologias)
3. [Instalação](#instalação)
4. [Configuração](#configuração)
5. [Uso do Sistema](#uso-do-sistema)
6. [Painel Administrativo](#painel-administrativo)
7. [Deploy](#deploy)
8. [API](#api)
9. [Suporte](#suporte)

---

## 🎯 Sobre o Projeto

**RV Car Solutions** é um sistema web completo para empresas de locação de veículos, especialmente voltado para motoristas de aplicativos (Uber, 99, etc).

### Características Principais

✅ **Site Institucional**

- Design moderno e responsivo
- Catálogo de veículos com filtros
- Formulários de contato
- Sistema de seções dinâmicas
- Totalmente personalizável

✅ **Painel Administrativo**

- Interface intuitiva (sem necessidade de código)
- Gerenciamento de veículos
- Sistema de cores/temas
- Gerenciamento de seções do site
- Editor visual de blocos
- Upload de imagens

✅ **Funcionalidades Especiais**

- Sistema de investimento/parceria
- WhatsApp integrado
- Modal de consultor
- SEO otimizado
- Performance otimizada

---

## 🛠️ Tecnologias

### Frontend

- **React 18** - Biblioteca JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes UI
- **React Router** - Roteamento
- **Lucide React** - Ícones

### Backend

- **PHP 8+** - Linguagem servidor
- **MySQL 8+** - Banco de dados
- **JSON Files** - Armazenamento simples

### Ferramentas

- **npm** - Gerenciador de pacotes
- **XAMPP** - Ambiente local (opcional)
- **Git** - Controle de versão

---

## 📦 Instalação

### Pré-requisitos

```bash
Node.js 18+
PHP 8+
MySQL 8+
```

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/betinhochagas/rvcar.git
cd rv-car-solutions-main
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Configurar Banco de Dados

1. Abra o **XAMPP Control Panel**
2. Inicie o **MySQL**
3. Acesse `http://localhost/phpmyadmin`
4. Crie um banco: `rv_car_solutions`
5. Importe o SQL (se disponível) ou use o sistema JSON

### Passo 4: Iniciar Servidores

**Opção A: Script Automático (Recomendado)**

```bash
.\start-completo.bat
```

**Opção B: Manual**

Terminal 1 - Backend PHP:

```bash
php -S 0.0.0.0:3000
```

Terminal 2 - Frontend React:

```bash
npm run dev
```

### Passo 5: Acessar

- **Site**: http://localhost:8080
- **Admin**: http://localhost:8080/admin

**Credenciais padrão:**

- Usuário: `admin`
- Senha: `admin123`

⚠️ **IMPORTANTE**: Altere a senha no primeiro acesso!

---

## ⚙️ Configuração

### Arquivo .env (Desenvolvimento)

Crie `.env.local` na raiz:

```env
VITE_API_URL=http://localhost:3000/api
```

### Arquivo .env (Produção)

```env
VITE_API_URL=/api
```

### Cores do Sistema

Edite `src/index.css`:

```css
:root {
  /* Cores da Marca */
  --brand-primary: 220 90% 56%;
  --brand-secondary: 220 14% 96%;

  /* Cores dos Botões */
  --button-primary: 220 90% 56%;
  --button-secondary: 220 14% 96%;
}
```

### PHP (Produção)

Configure `api/config.php` com suas credenciais:

```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'seu_banco');
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha');
```

---

## 🚀 Uso do Sistema

### Como Usuário do Site

**1. Navegar pelo Catálogo**

- Acesse a página inicial
- Role até a seção "Veículos"
- Use os filtros (categoria, disponibilidade)
- Clique em "Ver Detalhes" para mais informações

**2. Entrar em Contato**

- Clique no botão WhatsApp (canto inferior direito)
- Ou preencha o formulário de contato
- Aguarde retorno da equipe

**3. Conhecer Oportunidades**

- Navegue até a seção "Investimento"
- Leia sobre as opções de parceria
- Clique em "Quero Saber Mais"

### Como Administrador

Acesse: `http://seusite.com/admin`

**Dashboard Principal**

- Visão geral do sistema
- Acesso rápido às funcionalidades
- Estatísticas (em desenvolvimento)

---

## 🎨 Painel Administrativo

### 1. Gerenciar Veículos

**Adicionar Veículo:**

1. Painel Admin → Veículos
2. Clique em **[+ Novo Veículo]**
3. Preencha os campos:
   - Nome (ex: "HB20 2024")
   - Categoria (Econômico, Sedan, SUV, Premium)
   - Preço por dia/semana
   - Características (ar, direção, etc)
   - Imagens (upload direto)
4. Marque como disponível
5. Salvar

**Editar Veículo:**

1. Localize o veículo na lista
2. Clique no ícone de edição ✏️
3. Modifique os campos
4. Salvar alterações

**Remover Veículo:**

1. Clique no ícone de lixeira 🗑️
2. Confirme a remoção

### 2. Configurações do Site

**Cores e Temas:**

1. Admin → Configurações → Cores
2. Escolha as cores da marca
3. Cores dos botões (separadas!)
4. Preview em tempo real
5. Aplicar mudanças

**Informações Gerais:**

1. Admin → Configurações → Site
2. Nome da empresa
3. Logo (upload)
4. Favicon
5. Informações de contato
6. Redes sociais

### 3. Gerenciar Seções da Página

**Sistema de Seções Dinâmicas**

O site é composto por seções que você pode:

- ✅ Criar novas
- ✅ Editar existentes
- ✅ Reordenar (arrastar)
- ✅ Ativar/Desativar
- ✅ Remover

**Tipos de Seções Disponíveis:**

| Tipo             | Descrição                | Uso                         |
| ---------------- | ------------------------ | --------------------------- |
| 🎯 Hero          | Banner principal com CTA | Topo do site                |
| ⭐ Serviços      | Lista de serviços        | Apresentar ofertas          |
| 🚗 Veículos      | Catálogo dinâmico        | Mostra veículos cadastrados |
| 💰 Investimento  | Oportunidades            | Parcerias/Investimentos     |
| ℹ️ Sobre         | Sobre a empresa          | História/Missão             |
| 📞 Contato       | Formulário + Info        | Página de contato           |
| 📢 CTA           | Call to Action           | Incentivar ação             |
| 📊 Estatísticas  | Números                  | Credibilidade               |
| 💬 Depoimentos   | Avaliações               | Social proof                |
| ❓ FAQ           | Perguntas                | Dúvidas comuns              |
| 🔧 Personalizada | Editor visual            | Conteúdo livre              |

**Criar Seção:**

1. Admin → Gerenciar Seções
2. Clique em **[+ Nova Seção]**
3. Preencha:
   - Chave única (ex: `hero_principal`)
   - Nome descritivo
   - Tipo de seção
   - Ordem de exibição (1, 2, 3...)
   - ✅ Marcar como ativa
4. Aba **Formulário**: Preencher campos
5. Aba **Pré-visualização**: Ver resultado
6. Salvar

**Editor Visual de Blocos (Seção Personalizada):**

Para criar conteúdo totalmente customizado sem código:

1. Escolha tipo: **🔧 Personalizada**
2. Aba Formulário
3. Adicione blocos:
   - **📝 Título**: Títulos H1/H2/H3
   - **📄 Texto**: Parágrafos
   - **🖼️ Imagem**: Upload de fotos
   - **🔘 Botão**: Botões clicáveis
   - **📋 Lista**: Lista de itens
   - **━ Divisor**: Linha separadora
4. Configure cada bloco
5. Reordene com setas ↑ ↓
6. Preview para ver resultado
7. Salvar

**Exemplo Prático:**

```
[📝 Título] "Nossa Missão"
[📄 Texto] "Oferecer os melhores veículos..."
[🖼️ Imagem] (upload foto da equipe)
[📋 Lista]
  • Veículos novos
  • Preços justos
  • Suporte 24/7
[🔘 Botão] "Fale Conosco"
```

### 4. Upload de Imagens

**Onde fazer upload:**

- Veículos (múltiplas imagens)
- Logo e Favicon
- Seções (Hero, About, Personalizada)

**Como fazer:**

1. Localize o campo de imagem
2. Clique em **[📤 Upload]**
3. Selecione a imagem (computador/celular)
4. Aguarde upload
5. Preview aparece automaticamente

**Formatos aceitos:**

- JPG, PNG, WebP
- Tamanho máximo: 5MB

**Dica**: Use imagens otimizadas para melhor performance!

---

## 🌐 Deploy

### Opção 1: Hospedagem Compartilhada (cPanel)

**Pré-requisitos:**

- PHP 8+
- MySQL
- Acesso FTP ou cPanel

**Passos:**

1. **Build do Frontend**

```bash
npm run build
```

2. **Preparar Arquivos**

```
Fazer upload via FTP:
/dist/           → /public_html/
/api/            → /public_html/api/
/uploads/        → /public_html/uploads/
/.htaccess       → /public_html/.htaccess
```

3. **Configurar Banco**

- Criar banco no cPanel
- Importar estrutura (se houver)
- Atualizar `api/config.php`

4. **Ajustar .htaccess**

```apache
RewriteEngine On
RewriteBase /

# API
RewriteRule ^api/(.*)$ api/$1 [L]

# SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]
```

5. **Testar**

- Acesse seu domínio
- Teste login admin
- Verifique se veículos aparecem

### Opção 2: VPS (Linux)

**Pré-requisitos:**

- Ubuntu 20.04+
- Nginx ou Apache
- PHP-FPM
- MySQL

**Instalação:**

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependências
sudo apt install nginx php8.1-fpm php8.1-mysql mysql-server -y

# Clonar projeto
git clone https://github.com/betinhochagas/rvcar.git
cd rvcar

# Instalar Node/npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Build
npm install
npm run build

# Configurar Nginx
sudo nano /etc/nginx/sites-available/rvcar

# Reiniciar serviços
sudo systemctl restart nginx php8.1-fpm
```

**Configuração Nginx:**

```nginx
server {
    listen 80;
    server_name seudominio.com;
    root /var/www/rvcar/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        alias /var/www/rvcar/api;
        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/run/php/php8.1-fpm.sock;
        }
    }
}
```

### Opção 3: Netlify + Backend Separado

**Frontend (Netlify):**

```bash
npm run build
# Deploy da pasta dist/ no Netlify
```

**Backend (Heroku/Railway):**

- Deploy da pasta `api/` separadamente
- Configurar variáveis de ambiente
- Atualizar `VITE_API_URL` no frontend

---

## 📡 API

### Endpoints Disponíveis

#### Autenticação

```
POST /api/auth.php
Body: { "username": "admin", "password": "senha" }
Response: { "success": true, "token": "JWT_TOKEN", "user": {...} }
```

#### Veículos

```
GET  /api/vehicles.php          - Listar todos
GET  /api/vehicles.php?id=1     - Ver específico
POST /api/vehicles.php          - Criar (Auth)
PUT  /api/vehicles.php?id=1     - Editar (Auth)
DELETE /api/vehicles.php?id=1   - Remover (Auth)
```

#### Seções da Página

```
GET  /api/page-sections.php              - Listar todas
GET  /api/page-sections.php?active=true  - Apenas ativas
GET  /api/page-sections.php?id=1         - Ver específica
POST /api/page-sections.php              - Criar (Auth)
PUT  /api/page-sections.php?id=1         - Editar (Auth)
DELETE /api/page-sections.php?id=1       - Remover (Auth)
```

#### Upload

```
POST /api/upload.php
Headers: Authorization: Bearer TOKEN
Body: FormData com imagem
Response: { "success": true, "url": "/uploads/..." }
```

#### Configurações

```
GET  /api/site-settings.php               - Listar todas
GET  /api/site-settings.php?category=X    - Por categoria
POST /api/site-settings.php               - Criar (Auth)
PUT  /api/site-settings.php?key=X         - Editar (Auth)
```

### Autenticação

Todas as rotas marcadas com `(Auth)` requerem token JWT:

```javascript
headers: {
  'Authorization': 'Bearer SEU_TOKEN_JWT'
}
```

Token é retornado no login e armazenado no localStorage.

---

## 🔒 Segurança

### Boas Práticas Implementadas

✅ **Autenticação JWT**

- Tokens com expiração
- Refresh automático
- Logout seguro

✅ **Validação de Dados**

- Validação client-side e server-side
- Sanitização de inputs
- Prepared statements (SQL Injection)

✅ **Proteção CORS**

- Headers configurados corretamente
- Origens permitidas controladas

✅ **Upload Seguro**

- Validação de tipo MIME
- Limite de tamanho
- Nomes únicos (previne sobrescrita)

✅ **Headers de Segurança**

- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options

### Recomendações Adicionais

⚠️ **Antes de ir para produção:**

1. **Trocar credenciais padrão**

   - Usuário admin
   - Senha do banco
   - Secret JWT

2. **HTTPS obrigatório**

   - Configurar SSL/TLS
   - Redirecionar HTTP → HTTPS

3. **Backup automático**

   - Banco de dados
   - Arquivos JSON
   - Imagens uploads/

4. **Logs e Monitoramento**
   - Erros PHP
   - Tentativas de login
   - Uso de recursos

---

## 🐛 Troubleshooting

### Problemas Comuns

**1. Página em branco**

```bash
# Verificar console do navegador (F12)
# Verificar se build foi feito:
npm run build

# Verificar permissões de arquivos
chmod -R 755 dist/
```

**2. API não responde**

```bash
# Verificar se PHP está rodando:
netstat -ano | findstr :3000

# Testar endpoint:
curl http://localhost:3000/api/vehicles.php
```

**3. Erro CORS**

```php
// Verificar api/upload.php e outros
// Deve ter headers CORS configurados
header("Access-Control-Allow-Origin: *");
```

**4. Upload não funciona**

```bash
# Verificar permissões pasta uploads/
chmod -R 777 uploads/

# Verificar tamanho máximo PHP
php.ini:
upload_max_filesize = 10M
post_max_size = 10M
```

**5. Veículos não aparecem**

```bash
# Verificar se data/vehicles.json existe
ls -la data/

# Verificar permissões
chmod 644 data/vehicles.json
```

### Logs

**PHP Errors:**

```bash
# Ativar display de erros (dev only!)
php.ini:
display_errors = On
error_reporting = E_ALL
```

**Vite/React:**

```bash
# Console do navegador (F12)
# Verificar network tab para falhas de API
```

---

## 📊 Estrutura do Projeto

```
rv-car-solutions-main/
├── public/              # Arquivos públicos estáticos
│   ├── hero-bg.jpg
│   ├── about.jpg
│   └── uploads/         # Uploads copiados aqui (dev)
├── src/                 # Código React/TypeScript
│   ├── components/      # Componentes reutilizáveis
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── VehicleCatalog.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── SectionFormBuilder.tsx
│   │   ├── SectionPreview.tsx
│   │   └── ...
│   ├── pages/           # Páginas/Rotas
│   │   ├── Index.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── Vehicles.tsx
│   │   ├── PageSections.tsx
│   │   └── ...
│   ├── lib/             # Utilitários e gerenciadores
│   │   ├── authManager.ts
│   │   ├── vehicleManager.ts
│   │   ├── uploadManager.ts
│   │   ├── siteConfigManager.ts
│   │   └── ...
│   ├── types/           # TypeScript types
│   │   └── siteConfig.ts
│   ├── App.tsx          # Componente raiz
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos globais
├── api/                 # Backend PHP
│   ├── auth.php
│   ├── vehicles.php
│   ├── page-sections.php
│   ├── site-settings.php
│   ├── upload.php
│   └── config.php
├── data/                # Armazenamento JSON
│   ├── vehicles.json
│   ├── page-sections.json
│   ├── site-settings.json
│   └── users.json
├── uploads/             # Imagens uploaded
│   ├── vehicles/
│   ├── sections/
│   └── site/
├── dist/                # Build de produção (gerado)
├── .htaccess            # Apache config
├── package.json         # Dependências npm
├── vite.config.ts       # Configuração Vite
├── tailwind.config.ts   # Configuração Tailwind
└── DOCUMENTACAO.md      # Este arquivo
```

---

## 🎓 Tutoriais Rápidos

### Para Iniciantes

**Seu Primeiro Veículo:**

1. Login no admin
2. Menu → Veículos
3. [+ Novo Veículo]
4. Nome: "Fiat Uno 2024"
5. Categoria: "Econômico"
6. Preço: R$ 120/dia
7. Upload de foto
8. ✅ Disponível
9. Salvar
10. Veja no site!

**Sua Primeira Seção Personalizada:**

1. Menu → Gerenciar Seções
2. [+ Nova Seção]
3. Nome: "Promoção Especial"
4. Tipo: Personalizada
5. Aba Formulário:
   - Adicionar [📝 Título]: "Promoção de Verão"
   - Adicionar [📄 Texto]: "50% OFF em todos os..."
   - Adicionar [🔘 Botão]: "Aproveitar Oferta"
6. Aba Preview: Ver resultado
7. Salvar
8. Visite o site!

---

## 🤝 Contribuindo

Este projeto é mantido por **betinhochagas**.

Para contribuir:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📝 Changelog

### v2.3.0 (19/11/2025)

- ✨ Editor visual de blocos (seções personalizadas)
- ✨ Upload de imagens do dispositivo
- 🔧 Sistema de cores separado (marca vs botões)
- 📱 Interface mobile otimizada
- 🎨 Preview em tempo real de seções

### v2.2.0

- ✨ Sistema de seções dinâmicas
- 🔧 Formulários visuais por tipo de seção
- 📊 15 tipos de seções predefinidos

### v2.1.0

- ✨ Gerenciamento de veículos
- 🎨 Sistema de temas/cores
- 📱 Design responsivo

### v2.0.0

- 🎉 Lançamento inicial
- ⚡ React + TypeScript
- 🎨 Tailwind CSS

---

## 📞 Suporte

**Problemas técnicos:**

- GitHub Issues: https://github.com/betinhochagas/rvcar/issues

**Dúvidas sobre uso:**

- Consulte esta documentação primeiro
- Veja os tutoriais rápidos acima

**Desenvolvimento personalizado:**

- Entre em contato através do GitHub

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🙏 Agradecimentos

- **shadcn/ui** - Componentes UI incríveis
- **Lucide** - Ícones lindos
- **Tailwind CSS** - Framework CSS produtivo
- **Vite** - Build tool super rápida

---

**Desenvolvido com ❤️ por betinhochagas**

_Última atualização: 19 de novembro de 2025_
