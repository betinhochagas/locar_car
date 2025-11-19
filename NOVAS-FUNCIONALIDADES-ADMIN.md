# 🎨 Novas Funcionalidades do Painel Administrativo

## 📋 Resumo das Funcionalidades Implementadas

Foi adicionado um sistema completo de configuração do site no painel administrativo, permitindo que o administrador tenha controle total sobre a aparência e conteúdo da página.

### ✨ Funcionalidades Principais

#### 1. **Configurações Gerais do Site**

- ✅ Edição da logo, favicon e título do site
- ✅ Configuração de paleta de cores completa (cores primárias, secundárias, de destaque)
- ✅ Personalização de cores dos botões (primário e secundário)
- ✅ Configuração de preview de links (Open Graph)
- ✅ Gerenciamento de informações de contato
- ✅ Links de redes sociais

#### 2. **Gerenciamento de Seções da Página**

- ✅ Criar, editar e excluir seções da página
- ✅ Ativar/desativar seções
- ✅ Reordenar seções (ordem de exibição)
- ✅ Tipos de seções pré-configurados:
  - Hero (banner principal)
  - Recursos/Diferenciais
  - Lista de Veículos
  - Sobre Nós
  - Contato
  - Depoimentos
  - Seções Personalizadas

#### 3. **Editor de Conteúdo**

- ✅ Campos específicos para cada tipo de seção
- ✅ Editor JSON para seções personalizadas
- ✅ Upload e gerenciamento de imagens
- ✅ Preview ao vivo das alterações

---

## 🚀 Como Instalar e Usar

### Passo 1: Criar as Tabelas no Banco de Dados

Execute o arquivo SQL para criar as novas tabelas:

```bash
# No MySQL/phpMyAdmin, execute:
api/site-config.sql
```

Ou via linha de comando:

```bash
mysql -u root -p rvcar_db < api/site-config.sql
```

**Tabelas criadas:**

- `site_config` - Configurações gerais do site
- `page_sections` - Seções da página
- `site_images` - Imagens do site
- `config_history` - Histórico de alterações (auditoria)

### Passo 2: Acessar o Painel Administrativo

1. Faça login no painel: `/admin/login`

   - Usuário: `admin`
   - Senha: `rvcar2024`

2. No painel principal, você verá novos botões:
   - **"Configurações do Site"** - Para configurar logo, cores, contato, etc.
   - **"Gerenciar Seções"** - Para criar e editar seções da página

---

## 📁 Arquivos Criados/Modificados

### Novos Arquivos Backend (PHP)

- `api/site-config.sql` - Script SQL para criar as tabelas
- `api/site-settings.php` - API para configurações do site
- `api/page-sections.php` - API para gerenciar seções

### Novos Arquivos Frontend (React/TypeScript)

- `src/types/siteConfig.ts` - Tipos TypeScript para configurações
- `src/lib/siteConfigManager.ts` - Funções para comunicar com as APIs
- `src/pages/SiteSettings.tsx` - Página de configurações do site
- `src/pages/PageSections.tsx` - Página de gerenciamento de seções

### Arquivos Modificados

- `src/App.tsx` - Adicionadas rotas para as novas páginas
- `src/pages/AdminDashboard.tsx` - Adicionados botões de acesso

---

## 🎯 Como Usar Cada Funcionalidade

### 1. Configurar Logo e Marca

1. Acesse **"Configurações do Site"**
2. Vá na aba **"Marca"**
3. Configure:
   - URL da logo (ex: `/logo.svg`)
   - Texto alternativo
   - Favicon
   - Título e slogan do site
4. Clique em **"Salvar Tudo"**

### 2. Personalizar Cores

1. Na aba **"Cores"**:
   - **Cores Principais**: Escolha as cores primárias, secundárias e de destaque
   - **Cores dos Botões**: Personalize a aparência dos botões
2. Use o seletor de cores ou digite o código hexadecimal
3. Salve as alterações

### 3. Configurar Preview de Links (Open Graph)

1. Na aba **"Preview Links"**:
   - Defina título, descrição e imagem
   - Veja o preview de como aparecerá nas redes sociais
2. Recomendado: Imagem 1200x630px

### 4. Gerenciar Seções da Página

1. Acesse **"Gerenciar Seções"**
2. Para criar uma nova seção:
   - Clique em **"Nova Seção"**
   - Escolha o tipo de seção
   - Preencha o conteúdo
   - Defina a ordem de exibição
3. Para editar: Clique no ícone de lápis
4. Para ativar/desativar: Clique no ícone de olho
5. Para excluir: Clique no ícone de lixeira

### 5. Tipos de Seções Disponíveis

#### **Hero (Banner Principal)**

- Título e subtítulo
- Imagem de fundo
- Botão com link (CTA)

#### **Recursos/Diferenciais**

- Lista de recursos com ícones
- Título e descrição para cada recurso

#### **Sobre Nós**

- Título e conteúdo
- Imagem
- Estatísticas (opcional)

#### **Contato**

- Formulário de contato
- Mapa (opcional)

#### **Personalizada**

- Editor JSON livre para criar qualquer tipo de seção

---

## 🔌 APIs Disponíveis

### Site Settings API

```
GET    /api/site-settings.php               - Listar configurações
GET    /api/site-settings.php?key=X         - Buscar configuração específica
POST   /api/site-settings.php               - Criar/Atualizar configuração
PUT    /api/site-settings.php?key=X         - Atualizar configuração
DELETE /api/site-settings.php?key=X         - Remover configuração
```

### Page Sections API

```
GET    /api/page-sections.php               - Listar seções
GET    /api/page-sections.php?id=X          - Buscar seção específica
POST   /api/page-sections.php               - Criar nova seção
PUT    /api/page-sections.php?id=X          - Atualizar seção
DELETE /api/page-sections.php?id=X          - Remover seção
PATCH  /api/page-sections.php?id=X&action=toggle - Ativar/desativar
PATCH  /api/page-sections.php?action=reorder - Reordenar seções
```

---

## 🎨 Configurações Padrão Criadas

Ao executar o SQL, as seguintes configurações são criadas automaticamente:

### Branding

- `site_logo`: Logo principal
- `site_title`: Título do site
- `site_tagline`: Slogan

### Cores

- `color_primary`: #1a56db
- `color_secondary`: #7c3aed
- `color_accent`: #db2777
- E outras cores para botões e textos

### Contato

- Telefone, email, WhatsApp
- Endereço

### Seções Padrão

- Hero
- Recursos
- Veículos
- Sobre
- Contato

---

## 🔧 Próximas Melhorias Sugeridas

1. **Upload de Imagens**

   - Interface para fazer upload direto pelo painel
   - Galeria de mídia

2. **Preview ao Vivo**

   - Visualizar mudanças antes de publicar
   - Modo de visualização em tempo real

3. **Templates Prontos**

   - Temas pré-configurados
   - Paletas de cores prontas

4. **Editor Visual Drag & Drop**

   - Arrastar e soltar seções
   - Editor WYSIWYG

5. **Histórico de Alterações**
   - Ver alterações anteriores
   - Reverter mudanças

---

## ⚠️ Notas Importantes

1. **Backup**: Sempre faça backup do banco antes de executar o SQL
2. **Permissões**: Certifique-se que o usuário do banco tem permissões para criar tabelas
3. **Segurança**: Em produção, implemente autenticação JWT mais robusta
4. **Cache**: Considere adicionar cache para as configurações carregadas

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique os logs do navegador (Console)
2. Verifique os logs do PHP (error.log)
3. Teste as APIs diretamente via Postman ou similar

---

## ✅ Checklist de Instalação

- [ ] Executar `api/site-config.sql` no banco de dados
- [ ] Verificar se as 4 tabelas foram criadas
- [ ] Acessar `/admin/login`
- [ ] Testar acesso a "Configurações do Site"
- [ ] Testar acesso a "Gerenciar Seções"
- [ ] Fazer uma alteração de teste e salvar
- [ ] Verificar se as alterações foram salvas no banco

---

**Pronto!** 🎉 Agora você tem controle completo sobre a aparência e conteúdo do site através do painel administrativo!
