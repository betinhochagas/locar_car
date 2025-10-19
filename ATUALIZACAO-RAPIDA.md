# ⚡ GUIA RÁPIDO: Atualizar Site no /rvcar/

## 🎯 Situação Atual

Você JÁ tem o site instalado em `/rvcar/`, mas com configurações erradas (base path na raiz).

**Problema:**

- Build antigo esperava raiz: `/assets/`
- Mas está em subdiretório: `/rvcar/assets/`
- Resultado: Erros 404 nos arquivos CSS/JS

**Solução:**

- Novo build configurado para: `/rvcar/`
- Arquivos vão carregar corretamente ✅

---

## ✅ ATUALIZAÇÃO RÁPIDA (5 minutos)

### **Opção A: Substituir Apenas os Arquivos Afetados**

**1. No cPanel File Manager:**

a) **Delete os arquivos antigos:**

```
/public_html/rvcar/index.html        ← DELETE
/public_html/rvcar/404.html          ← DELETE
/public_html/rvcar/assets/           ← DELETE (pasta inteira)
```

b) **Mantenha:**

```
/public_html/rvcar/api/              ✅ MANTER (já tem config.php)
/public_html/rvcar/.htaccess         ✅ MANTER
```

**2. Faça upload dos arquivos novos:**

Do ZIP `rvcar-installer.zip` que acabamos de gerar, extraia SOMENTE:

- `index.html`
- `404.html`
- `assets/` (pasta completa)

Envie para: `/public_html/rvcar/`

**3. Teste:**

```
https://bnutech.com.br/rvcar/
```

---

### **Opção B: Reinstalar Tudo (Mais Seguro)**

**1. Backup do config.php:**

```
Copie o conteúdo de: /public_html/rvcar/api/config.php
Cole em um bloco de notas (salvar)
```

**2. Delete TUDO em /rvcar/:**

```
/public_html/rvcar/
```

**3. Upload do novo ZIP:**

```
Arquivo: rvcar-installer.zip
Local: /public_html/rvcar/
```

**4. Extraia:**

```
Clique com botão direito → Extract
Destino: /public_html/rvcar/
```

**5. Restaure o config.php:**

```
Edite: /public_html/rvcar/api/config.php
Cole o código que você salvou no passo 1
```

**6. Teste:**

```
https://bnutech.com.br/rvcar/
```

---

## 🔍 Verificação

### **Console do Navegador (F12):**

**ANTES (errado):**

```
GET https://bnutech.com.br/assets/index-xxx.css → 404
GET https://bnutech.com.br/assets/index-xxx.js → 404
```

**DEPOIS (correto):**

```
GET https://bnutech.com.br/rvcar/assets/index-O3gN9mho.css → 200 ✅
GET https://bnutech.com.br/rvcar/assets/index-BHdoACWz.js → 200 ✅
VehicleManager - API URL: /rvcar/api/vehicles.php ✅
```

---

## 📦 Arquivos Atualizados

**Novo build gerado:**

- `dist/index.html` → Agora aponta para `/rvcar/assets/`
- `dist/assets/index-BHdoACWz.js` → Arquivo JS com base path correto
- `dist/assets/index-O3gN9mho.css` → Arquivo CSS

**Diferença nos arquivos:**

**ANTES (index.html):**

```html
<script type="module" src="/assets/index-xxx.js"></script>
<link rel="stylesheet" href="/assets/index-xxx.css" />
```

**DEPOIS (index.html):**

```html
<script type="module" src="/rvcar/assets/index-BHdoACWz.js"></script>
<link rel="stylesheet" href="/rvcar/assets/index-O3gN9mho.css" />
```

---

## ⚠️ IMPORTANTE: config.php

O arquivo `/rvcar/api/config.php` **NÃO** está incluído no ZIP.

**Se você já configurou antes:** ✅ Mantenha o arquivo  
**Se é instalação nova:** ⚠️ Precisa criar/editar

**Código correto:**

```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'bnutechc_rvcar');
define('DB_USER', 'bnutechc_rvcar');
define('DB_PASS', 'R.chagas1988');
define('DB_CHARSET', 'utf8mb4');

date_default_timezone_set('America/Sao_Paulo');

function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        die(json_encode(['error' => 'Erro ao conectar ao banco de dados']));
    }
}

function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

function sendError($message, $statusCode = 400) {
    http_response_code($statusCode);
    echo json_encode(['error' => true, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit();
}
?>
```

---

## 📋 Checklist de Atualização

- [ ] Fazer backup do `config.php` atual
- [ ] Deletar arquivos antigos (index.html, 404.html, assets/)
- [ ] Upload e extração do novo ZIP
- [ ] Restaurar/verificar `config.php`
- [ ] Limpar cache do navegador (Ctrl+Shift+R)
- [ ] Testar: `https://bnutech.com.br/rvcar/`
- [ ] Verificar Console (F12) - sem erros 404
- [ ] Verificar API: `/rvcar/api/vehicles.php` retorna JSON
- [ ] Testar admin: `/rvcar/admin`

---

## 🎯 Resumo

**Mudança principal:**

- Base path: `/` → `/rvcar/`

**Arquivos afetados:**

- `index.html` (novo)
- `404.html` (novo)
- `assets/*.js` (novos arquivos)
- `assets/*.css` (novo arquivo)

**Arquivos NÃO afetados:**

- `api/config.php` ✅ Manter o seu
- `api/vehicles.php` ✅ Sem mudanças
- `.htaccess` ✅ Sem mudanças

**Ação:** Substituir apenas frontend (index.html + assets/)

---

**Tempo estimado:** 5 minutos  
**Risco:** Baixo (só afeta arquivos frontend)  
**Pode fazer sem parar o site:** ✅ Sim
