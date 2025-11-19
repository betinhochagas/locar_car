# 📄 Painel Admin - Sistema JSON (Sem Banco de Dados)

## 🎯 Visão Geral

    "updated_at": "2024-01-15T10:30:00"    "description": "Logo principal do site",    "type": "image",    "value": "/logo.png",  "site_logo": {{```jsonContém 30 configurações do site:### 1. site-settings.json## 🗄️ Arquivos JSON```        └── siteConfigManager.ts ← Cliente da API    └── lib/    │   └── PageSections.tsx    ← Interface de seções    │   ├── SiteSettings.tsx    ← Interface de configurações    ├── pages/└── src/│   └── page-sections.json      ← Seções da página (dinâmico)│   ├── site-settings.json      ← Configurações do site (30 itens)├── data/│   └── page-sections.php       ← API de seções da página│   ├── site-settings.php      ← API de configurações gerais├── api/rv-car-solutions/```## 📁 Estrutura de Arquivos- ✅ **Versionamento**: Pode versionar configurações com Git- ✅ **Performance**: Para configurações, JSON é mais rápido que consultas SQL- ✅ **Portabilidade**: Pode mover entre servidores facilmente- ✅ **Backup Fácil**: Basta copiar os arquivos JSON- ✅ **Deploy Simplificado**: Funciona em qualquer servidor com PHP 7.4+- ✅ **Zero Configuração de Banco**: Não precisa criar tabelas ou configurar MySQL## ✅ Vantagens do Sistema JSONO painel administrativo foi implementado usando **arquivos JSON** para armazenamento, eliminando a necessidade de configurar banco de dados MySQL.

},
"primary_color": {
"value": "#8B5CF6",

    "type": "color",
    "description": "Cor primária do site",

    "updated_at": "2024-01-15T10:30:00"

}
// ... mais 28 configurações
}

```

**Categorias de configurações:**

- **Branding**: logo, favicon, título, slogan
- **Cores**: 12 cores da paleta (primária, secundária, destaque, botões, etc)
- **Contatos**: telefone, email, WhatsApp, endereço
- **Redes Sociais**: Facebook, Instagram, Twitter, LinkedIn
- **Open Graph**: título, descrição, imagem para preview de links
```

### 2. page-sections.json

Array de seções da página:

```json
[
  {
    "id": 1,
    "section_key": "hero",
    "section_name": "Banner Principal",
    "section_type": "hero",
    "content": {
      "title": "Aluguel de Trailers e Motorhomes",
      "subtitle": "Sua aventura começa aqui",
      "background_image": "/hero-bg.jpg",
      "button_text": "Ver Frota",
      "button_link": "/vehicles"
    },
    "display_order": 1,
    "is_active": true,
    "created_at": "2024-01-15T10:00:00",
    "updated_at": "2024-01-15T10:00:00"
  }
  // ... mais seções
]
```

**Tipos de seções disponíveis:**

- `hero` - Banner principal
- `features` - Recursos/diferenciais
- `vehicles` - Lista de veículos
- `about` - Sobre nós
- `contact` - Contato
- `testimonials` - Depoimentos
- `custom` - Seção personalizada

## 🔌 APIs RESTful

### site-settings.php

```bash
# Listar todas as configurações
GET /api/site-settings.php

# Buscar configuração específica
GET /api/site-settings.php?key=site_logo

# Criar/atualizar configuração
POST /api/site-settings.php
{
  "config_key": "site_logo",
  "config_value": "/novo-logo.png",
  "config_type": "image"
}

# Atualizar configuração existente
PUT /api/site-settings.php?key=site_logo
{
  "config_value": "/logo-atualizado.png"
}

# Remover configuração
DELETE /api/site-settings.php?key=custom_setting
```

### page-sections.php

```bash
# Listar todas as seções
GET /api/page-sections.php

# Listar apenas seções ativas
GET /api/page-sections.php?active=true

# Buscar seção por ID
GET /api/page-sections.php?id=1

# Buscar seção por chave
GET /api/page-sections.php?key=hero

# Criar nova seção
POST /api/page-sections.php
{
  "section_key": "about",
  "section_name": "Sobre Nós",
  "section_type": "about",
  "content": { "title": "...", "description": "..." },
  "display_order": 3,
  "is_active": true
}

# Atualizar seção
PUT /api/page-sections.php?id=1
{
  "section_name": "Sobre Nossa Empresa",
  "content": { "title": "...", "description": "..." }
}

# Remover seção
DELETE /api/page-sections.php?id=1

# Ativar/desativar seção
PATCH /api/page-sections.php?id=1&action=toggle

# Reordenar seções
PATCH /api/page-sections.php?action=reorder
{
  "sections": [
    { "id": 1, "display_order": 1 },
    { "id": 3, "display_order": 2 },
    { "id": 2, "display_order": 3 }
  ]
}
```

## 🚀 Instalação

### 1. Verificar Permissões

O diretório `data/` precisa ter permissão de escrita:

```bash
# Linux/Mac
chmod -R 755 data/

# Windows
# Garantir que o usuário do IIS/Apache pode escrever na pasta
```

### 2. Primeiro Acesso

Os arquivos JSON são criados automaticamente no primeiro acesso às APIs.

Para inicializar com dados padrão:

```bash
# Os arquivos já estão criados em:
data/site-settings.json
data/page-sections.json
```

### 3. Testar APIs

```bash
# Testar configurações
curl http://localhost:8080/api/site-settings.php

# Testar seções
curl http://localhost:8080/api/page-sections.php
```

## 🎨 Interfaces Administrativas

### 1. Configurações do Site (`/admin/site-settings`)

5 abas de configuração:

1. **Marca**: Logo, favicon, título, slogan
2. **Cores**: 12 cores da paleta (com color pickers)
3. **Preview de Links**: Open Graph tags
4. **Contato**: Telefone, email, WhatsApp, endereço
5. **Redes Sociais**: URLs das redes sociais

### 2. Seções da Página (`/admin/page-sections`)

- Lista todas as seções com status (ativa/inativa)
- Botões para criar, editar, deletar seções
- Toggle para ativar/desativar
- Reordenar seções por drag & drop (futuro)
- Editor contextual por tipo de seção

## 🔒 Segurança

### Proteção dos Arquivos JSON

Adicione ao `.htaccess`:

```apache
# Bloquear acesso direto aos arquivos JSON
<FilesMatch "\.json$">
  Order allow,deny
  Deny from all
</FilesMatch>
```

### Validação de Dados

As APIs validam:

- ✅ Tipos de dados (string, number, boolean, color, image)
- ✅ Campos obrigatórios
- ✅ Chaves únicas (section_key)
- ✅ IDs válidos

### CORS

Configurado para:

- **Produção**: Apenas domínio do servidor
- **Desenvolvimento**: localhost:8080, localhost:5173

## 🔄 Migração Futura para MySQL

Se no futuro precisar migrar para banco de dados:

1. Execute o script SQL: `api/site-config.sql` (se ainda existir)
2. Migre os dados dos JSON para as tabelas
3. Atualize as APIs para usar PDO em vez de file_get_contents

**Script de migração** (criar quando necessário):

```php
// migrate-json-to-mysql.php
// Lê os JSON e insere no banco
```

## 📊 Comparação: JSON vs MySQL

| Aspecto            | JSON                   | MySQL                          |
| ------------------ | ---------------------- | ------------------------------ |
| **Setup**          | ✅ Nenhum              | ❌ Criar banco e tabelas       |
| **Performance**    | ✅ Rápido para configs | ✅ Rápido para grandes volumes |
| **Escalabilidade** | ⚠️ Até ~1000 itens     | ✅ Milhões de registros        |
| **Backup**         | ✅ Copiar arquivo      | ⚠️ Dump SQL                    |
| **Versionamento**  | ✅ Git-friendly        | ❌ Difícil                     |
| **Concorrência**   | ⚠️ File locking        | ✅ Transações                  |
| **Auditoria**      | ❌ Manual              | ✅ Triggers/history            |
| **Busca Complexa** | ❌ Limitada            | ✅ SQL queries                 |

**Recomendação**: JSON é perfeito para este caso de uso (configurações e seções). MySQL seria necessário apenas para:

- Sistema com múltiplos usuários simultâneos
- Histórico de alterações (auditoria)
- Relatórios complexos
- Mais de 10.000 registros de configurações

## 📝 Notas Técnicas

### Auto-increment IDs

```php
function getNextId($sections) {
    if (empty($sections)) return 1;
    return max(array_column($sections, 'id')) + 1;
}
```

### Timestamps

Formato ISO 8601: `2024-01-15T10:30:00`

```php
date('Y-m-d\TH:i:s')
```

### Content Structure

Cada tipo de seção tem estrutura de `content` diferente:

```typescript
// Hero
content: {
  title: string,
  subtitle: string,
  background_image: string,
  button_text: string,
  button_link: string
}

// Features
content: {
  title: string,
  items: Array<{
    icon: string,
    title: string,
    description: string
  }>
}
```

## 🆘 Troubleshooting

### Erro: "Permission denied"

```bash
chmod 755 data/
# Ou no Windows: dar permissão de escrita para o usuário do IIS/Apache
```

### Erro: "Cannot read JSON file"

Os arquivos são criados automaticamente. Se não existirem:

```bash
# Copiar os arquivos de exemplo
cp data/site-settings.json.example data/site-settings.json
cp data/page-sections.json.example data/page-sections.json
```

### Erro: "Invalid JSON"

Verificar sintaxe:

```bash
php -r "json_decode(file_get_contents('data/site-settings.json'));"
```

## 📚 Documentação Adicional

- **NOVAS-FUNCIONALIDADES-ADMIN.md**: Detalhes completos das funcionalidades
- **EXEMPLOS-API-ADMIN.md**: Mais exemplos de uso das APIs
- **IMPLEMENTACAO-CONCLUIDA.md**: Status da implementação

## 🎉 Conclusão

O sistema JSON oferece:

- ✅ **Simplicidade**: Deploy sem complicações
- ✅ **Performance**: Rápido para configurações
- ✅ **Manutenibilidade**: Fácil debug e backup
- ✅ **Portabilidade**: Funciona em qualquer servidor PHP

**Perfeito para produção atual!** 🚀
