# 🔌 Exemplos de Uso das APIs - Painel Administrativo

## 📋 Índice

{[`json**Response:**`GET /api/site-settings.php```http**Request:**### 1. Listar Todas as Configurações## Site Settings API---4. [Exemplos com cURL](#exemplos-com-curl)3. [Exemplos com JavaScript/Fetch](#exemplos-com-javascript)2. [Page Sections API](#page-sections-api)1. [Site Settings API](#site-settings-api)

    "id": 1,
    "config_key": "site_logo",

    "config_value": "/logo.svg",
    "config_type": "image",
    "description": "Logo principal do site",
    "updated_at": "2024-01-15 10:30:00"

},
{
"id": 2,
"config_key": "color_primary",
"config_value": "#1a56db",
"config_type": "color",
"description": "Cor primária do site",
"updated_at": "2024-01-15 10:30:00"
}
]

```

```

### 2. Buscar Configuração Específica

**Request:**

```http

```

GET /api/site-settings.php?key=site_logo

```

```

**Response:**

```json
{
  "id": 1,
  "config_key": "site_logo",
  "config_value": "/logo.svg",
  "config_type": "image",
  "description": "Logo principal do site",
  "updated_at": "2024-01-15 10:30:00"
}
```

### 3. Criar/Atualizar Configuração

**Request:**

```http
POST /api/site-settings.php
Content-Type: application/json

{
  "config_key": "site_title",
  "config_value": "Minha Empresa",
  "config_type": "text",
  "description": "Título do site"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Configuração criada com sucesso",
  "data": {
    "id": 25,
    "config_key": "site_title",
    "config_value": "Minha Empresa",
    "config_type": "text",
    "description": "Título do site",
    "updated_at": "2024-01-15 10:35:00"
  }
}
```

### 4. Atualizar Configuração Existente

**Request:**

```http
PUT /api/site-settings.php?key=color_primary
Content-Type: application/json

{
  "config_value": "#ff0000"
}
```

**Response:**

```json
{
  "id": 7,
  "config_key": "color_primary",
  "config_value": "#ff0000",
  "config_type": "color",
  "description": "Cor primária do site",
  "updated_at": "2024-01-15 10:40:00"
}
```

### 5. Deletar Configuração

**Request:**

```http
DELETE /api/site-settings.php?key=custom_config
```

**Response:**

```json
{
  "success": true,
  "message": "Configuração removida com sucesso"
}
```

---

## Page Sections API

### 1. Listar Todas as Seções

**Request:**

```http
GET /api/page-sections.php
```

**Response:**

```json
[
  {
    "id": 1,
    "section_key": "hero",
    "section_name": "Seção Hero (Principal)",
    "section_type": "hero",
    "content": {
      "title": "Alugue o Carro Perfeito",
      "subtitle": "Frota completa",
      "background_image": "/hero-bg.jpg",
      "cta_text": "Ver Veículos",
      "cta_link": "#vehicles"
    },
    "display_order": 1,
    "is_active": true,
    "created_at": "2024-01-15 10:00:00",
    "updated_at": "2024-01-15 10:00:00"
  }
]
```

### 2. Buscar Seção por ID

**Request:**

```http
GET /api/page-sections.php?id=1
```

**Response:**

```json
{
  "id": 1,
  "section_key": "hero",
  "section_name": "Seção Hero",
  "section_type": "hero",
  "content": {
    "title": "Título",
    "subtitle": "Subtítulo"
  },
  "display_order": 1,
  "is_active": true,
  "created_at": "2024-01-15 10:00:00",
  "updated_at": "2024-01-15 10:00:00"
}
```

### 3. Buscar Seção por Chave

**Request:**

```http
GET /api/page-sections.php?key=hero
```

### 4. Criar Nova Seção

**Request:**

```http
POST /api/page-sections.php
Content-Type: application/json

{
  "section_key": "testimonials",
  "section_name": "Depoimentos de Clientes",
  "section_type": "testimonials",
  "content": {
    "title": "O Que Dizem Nossos Clientes",
    "items": [
      {
        "name": "João Silva",
        "text": "Excelente serviço!",
        "rating": 5
      }
    ]
  },
  "display_order": 6,
  "is_active": true
}
```

**Response:**

```json
{
  "id": 6,
  "section_key": "testimonials",
  "section_name": "Depoimentos de Clientes",
  "section_type": "testimonials",
  "content": {
    "title": "O Que Dizem Nossos Clientes",
    "items": [...]
  },
  "display_order": 6,
  "is_active": true,
  "created_at": "2024-01-15 11:00:00",
  "updated_at": "2024-01-15 11:00:00"
}
```

### 5. Atualizar Seção

**Request:**

```http
PUT /api/page-sections.php?id=1
Content-Type: application/json

{
  "section_name": "Banner Principal Atualizado",
  "content": {
    "title": "Novo Título"
  }
}
```

### 6. Deletar Seção

**Request:**

```http
DELETE /api/page-sections.php?id=6
```

**Response:**

```json
{
  "success": true,
  "message": "Seção removida com sucesso"
}
```

### 7. Ativar/Desativar Seção

**Request:**

```http
PATCH /api/page-sections.php?id=1&action=toggle
```

**Response:**

```json
{
  "id": 1,
  "section_key": "hero",
  "section_name": "Seção Hero",
  "is_active": false,
  ...
}
```

### 8. Reordenar Seções

**Request:**

```http
PATCH /api/page-sections.php?action=reorder
Content-Type: application/json

{
  "sections": [
    { "id": 1, "display_order": 1 },
    { "id": 2, "display_order": 3 },
    { "id": 3, "display_order": 2 }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Seções reordenadas com sucesso"
}
```

---

## Exemplos com JavaScript

### Buscar Todas as Configurações

```javascript
async function getSiteSettings() {
  try {
    const response = await fetch("/api/site-settings.php");
    const data = await response.json();
    console.log("Configurações:", data);
    return data;
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

### Atualizar Cor Primária

```javascript
async function updatePrimaryColor(newColor) {
  try {
    const response = await fetch("/api/site-settings.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        config_key: "color_primary",
        config_value: newColor,
        config_type: "color",
      }),
    });

    const result = await response.json();
    console.log("Cor atualizada:", result);
    return result;
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Uso
updatePrimaryColor("#ff0000");
```

### Criar Nova Seção

```javascript
async function createSection(sectionData) {
  try {
    const response = await fetch("/api/page-sections.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sectionData),
    });

    const result = await response.json();
    console.log("Seção criada:", result);
    return result;
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Uso
createSection({
  section_key: "promo",
  section_name: "Promoções",
  section_type: "custom",
  content: {
    title: "Promoções Especiais",
    items: [],
  },
  display_order: 7,
  is_active: true,
});
```

### Toggle Seção Ativa

```javascript
async function toggleSectionActive(sectionId) {
  try {
    const response = await fetch(
      `/api/page-sections.php?id=${sectionId}&action=toggle`,
      { method: "PATCH" }
    );

    const result = await response.json();
    console.log("Status alterado:", result);
    return result;
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Uso
toggleSectionActive(1);
```

---

## Exemplos com cURL

### Listar Configurações

```bash
curl -X GET "http://localhost/api/site-settings.php"
```

### Buscar Configuração Específica

```bash
curl -X GET "http://localhost/api/site-settings.php?key=site_logo"
```

### Criar/Atualizar Configuração

```bash
curl -X POST "http://localhost/api/site-settings.php" \
  -H "Content-Type: application/json" \
  -d '{
    "config_key": "site_title",
    "config_value": "Minha Empresa",
    "config_type": "text"
  }'
```

### Atualizar Configuração

```bash
curl -X PUT "http://localhost/api/site-settings.php?key=color_primary" \
  -H "Content-Type: application/json" \
  -d '{"config_value": "#ff0000"}'
```

### Deletar Configuração

```bash
curl -X DELETE "http://localhost/api/site-settings.php?key=custom_config"
```

### Criar Seção

```bash
curl -X POST "http://localhost/api/page-sections.php" \
  -H "Content-Type: application/json" \
  -d '{
    "section_key": "newsletter",
    "section_name": "Newsletter",
    "section_type": "custom",
    "content": {
      "title": "Assine Nossa Newsletter"
    },
    "display_order": 8,
    "is_active": true
  }'
```

### Atualizar Seção

```bash
curl -X PUT "http://localhost/api/page-sections.php?id=1" \
  -H "Content-Type: application/json" \
  -d '{
    "section_name": "Novo Nome",
    "is_active": true
  }'
```

### Toggle Seção

```bash
curl -X PATCH "http://localhost/api/page-sections.php?id=1&action=toggle"
```

### Reordenar Seções

```bash
curl -X PATCH "http://localhost/api/page-sections.php?action=reorder" \
  -H "Content-Type: application/json" \
  -d '{
    "sections": [
      {"id": 1, "display_order": 1},
      {"id": 2, "display_order": 3},
      {"id": 3, "display_order": 2}
    ]
  }'
```

---

## 🔐 Autenticação (Futuro)

Atualmente as APIs têm autenticação básica. Para produção, considere implementar JWT:

```javascript
// Exemplo com JWT (futuro)
async function authenticatedRequest(url, options = {}) {
  const token = localStorage.getItem("admin_token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}
```

---

## 📝 Notas Importantes

1. **CORS**: As APIs já estão configuradas com CORS adequado
2. **Validação**: Dados são validados no backend
3. **Erros**: Sempre verifique a resposta e trate erros
4. **Tipos**: No TypeScript, use os tipos em `src/types/siteConfig.ts`

---

## 🎯 Boas Práticas

1. Sempre valide dados antes de enviar
2. Trate erros apropriadamente
3. Use try/catch em operações assíncronas
4. Mantenha os tipos TypeScript atualizados
5. Adicione loading states na UI

---

**Pronto para integrar!** 🚀
