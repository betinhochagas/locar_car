# 🎯 Instalação no Subdiretório /rvcar/

## ✅ Configuração Aplicada

O projeto foi configurado para funcionar no subdiretório `/rvcar/`:

```
https://bnutech.com.br/rvcar/        ← Site
https://bnutech.com.br/rvcar/api/    ← API
```

---

## 🔧 Mudanças Realizadas

### 1. **vite.config.ts**

```typescript
base: "/rvcar/"; // Era '/' antes
```

### 2. **vehicleManager.ts**

```typescript
return "/rvcar/api/vehicles.php"; // Era '/api/vehicles.php' antes
```

### 3. **Build Atualizado**

- ✅ Novo build gerado com base path correto
- ✅ Arquivos CSS/JS apontam para `/rvcar/assets/`
- ✅ API aponta para `/rvcar/api/vehicles.php`

---

## 📋 Como Usar (Instalação Limpa)

### **Opção A: Reinstalar do Zero (RECOMENDADO)**

1. **No cPanel File Manager:**

   - Delete TUDO dentro de `public_html/rvcar/`
   - Delete a pasta `/install/` se existir

2. **Faça upload do novo ZIP:**

   - Arquivo: `rvcar-installer.zip` (acabamos de gerar)
   - Local: `public_html/rvcar/`

3. **Extraia o ZIP:**

   - Clique com botão direito → **Extract**
   - Extrair para: `/public_html/rvcar/`

4. **Estrutura final:**

   ```
   public_html/
   └── rvcar/
       ├── index.html
       ├── assets/
       ├── api/
       │   └── config.php   ← Cole o código PDO aqui
       └── install/
   ```

5. **Configure o banco:**

   - Edite: `/public_html/rvcar/api/config.php`
   - Cole o código PDO (está no `SOLUCAO-RAPIDA-PDO.md`)

6. **Acesse o instalador:**

   ```
   https://bnutech.com.br/rvcar/install/
   ```

7. **Siga os 4 passos**

8. **DELETE `/rvcar/install/`** após concluir

---

## 📋 Estrutura Final Esperada

```
public_html/
└── rvcar/
    ├── index.html              ✅
    ├── 404.html
    ├── .htaccess
    ├── favicon.ico
    ├── placeholder.svg
    ├── robots.txt
    ├── assets/
    │   ├── index-O3gN9mho.css
    │   ├── index-BHdoACWz.js   ← NOVO arquivo (base path correto)
    │   └── imagens...
    └── api/
        ├── config.php          ← Com PDO
        └── vehicles.php
```

---

## 🧪 URLs de Teste

### 1. Site Principal

```
https://bnutech.com.br/rvcar/
```

**Deve:** Carregar o site completo ✅

### 2. API

```
https://bnutech.com.br/rvcar/api/vehicles.php
```

**Deve:** Retornar JSON com veículos ✅

### 3. Instalador (temporário)

```
https://bnutech.com.br/rvcar/install/
```

**Deve:** Abrir wizard de instalação ✅

### 4. Admin

```
https://bnutech.com.br/rvcar/admin
```

**Deve:** Abrir tela de login (após instalação) ✅

---

## ✅ Vantagens do Subdiretório

### **Organização:**

```
public_html/
├── (outros sites ou projetos)
└── rvcar/                      ← Seu site isolado
```

### **Possibilidades:**

- Você pode ter outros projetos em outras pastas
- Fácil fazer backup (só copiar a pasta `/rvcar/`)
- Fácil deletar ou migrar

---

## 🔧 Arquivo config.php Correto

Crie/Edite: `/public_html/rvcar/api/config.php`

```php
<?php
/**
 * RV Car Solutions - Configuração do Banco de Dados
 */

// Configurações do Banco de Dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'bnutechc_rvcar');
define('DB_USER', 'bnutechc_rvcar');
define('DB_PASS', 'R.chagas1988');
define('DB_CHARSET', 'utf8mb4');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

function getDBConnection()
{
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Erro de conexão: " . $e->getMessage());
        http_response_code(500);
        die(json_encode(['error' => 'Erro ao conectar ao banco de dados']));
    }
}

function sendResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

function sendError($message, $statusCode = 400)
{
    http_response_code($statusCode);
    echo json_encode([
        'error' => true,
        'message' => $message
    ], JSON_UNESCAPED_UNICODE);
    exit();
}
?>
```

---

## 🔍 Verificação Console (F12)

Após acessar `https://bnutech.com.br/rvcar/`:

**Deve aparecer:**

```
VehicleManager - API URL: /rvcar/api/vehicles.php
Environment: production
✅ Sem erros 404
```

**Não deve aparecer:**

```
❌ Failed to load resource: 404
❌ CORS error
❌ Porta 3000
```

---

## 📦 Novo ZIP Gerado

**Arquivo:** `rvcar-installer.zip` (0.48 MB)  
**Localização:** `D:\website\rv-car-solutions-main\`  
**Data:** 19/10/2025  
**Configuração:** Base path `/rvcar/`

**Conteúdo:**

- ✅ Frontend com caminhos corretos para `/rvcar/`
- ✅ API configurada para PDO
- ✅ Instalador web funcional
- ✅ .htaccess otimizado

---

## 🎬 Passo a Passo Resumido

1. **Delete** tudo em `/public_html/rvcar/`
2. **Upload** do novo `rvcar-installer.zip`
3. **Extraia** dentro de `/rvcar/`
4. **Edite** `/rvcar/api/config.php` (cole código PDO acima)
5. **Acesse** `https://bnutech.com.br/rvcar/install/`
6. **Complete** os 4 passos do instalador
7. **Delete** `/rvcar/install/`
8. **Acesse** `https://bnutech.com.br/rvcar/` ✅

---

## 📞 Checklist Final

- [ ] Novo ZIP baixado/transferido
- [ ] Conteúdo antigo de `/rvcar/` deletado
- [ ] Novo ZIP extraído em `/rvcar/`
- [ ] `config.php` editado com PDO
- [ ] Instalador executado
- [ ] Banco criado com 8 veículos
- [ ] Pasta `/install/` deletada
- [ ] Site funciona: `https://bnutech.com.br/rvcar/`
- [ ] API funciona: `https://bnutech.com.br/rvcar/api/vehicles.php`
- [ ] Sem erros 404 no Console (F12)
- [ ] Admin acessível: `https://bnutech.com.br/rvcar/admin`
- [ ] Senha do admin alterada

---

## 💡 Diferença para Raiz

### **Instalação na Raiz** (como era antes):

```
public_html/
├── index.html          → https://bnutech.com.br/
├── assets/             → https://bnutech.com.br/assets/
└── api/                → https://bnutech.com.br/api/
```

### **Instalação no Subdiretório** (como está agora):

```
public_html/
└── rvcar/
    ├── index.html      → https://bnutech.com.br/rvcar/
    ├── assets/         → https://bnutech.com.br/rvcar/assets/
    └── api/            → https://bnutech.com.br/rvcar/api/
```

---

## 🎯 Resumo

**Configuração aplicada:** ✅  
**Build atualizado:** ✅  
**Instalador gerado:** ✅  
**Base path:** `/rvcar/`  
**API path:** `/rvcar/api/vehicles.php`

**Próximo passo:** Reinstalar usando o novo ZIP!

---

**Criado:** 19/10/2025  
**Versão:** v2.0.0 (subdiretório)  
**Base Path:** /rvcar/  
**Status:** ✅ Pronto para instalação
