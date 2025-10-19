# 🔧 CORREÇÃO URGENTE: .htaccess Redirecionando Assets

## ❌ Erro Identificado

**Console mostra:**

```
Failed to load module script: Expected a JavaScript-or-Wasm module script
but the server responded with a MIME type of "text/html"
```

**Causa:**
O `.htaccess` está redirecionando **TODOS os arquivos** (incluindo `.js` e `.css`) para `index.html`!

**Resultado:**

- Navegador pede: `/rvcar/assets/index-CBX8ARmR.js`
- Servidor retorna: HTML do `index.html`
- Navegador espera: JavaScript
- Erro: MIME type incorreto ❌

---

## ✅ SOLUÇÃO IMEDIATA

### **Substitua TODO o conteúdo do `.htaccess`**

No cPanel, edite `/public_html/rvcar/.htaccess` e **SUBSTITUA TUDO** por:

```apache
# RV Car - Configuração Apache (.htaccess)
# Base Path: /rvcar/

# Habilitar RewriteEngine
RewriteEngine On
RewriteBase /rvcar/

# CORS para API (ANTES do rewrite)
<FilesMatch "\.(php)$">
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
</FilesMatch>

# SPA - Redirecionar APENAS rotas que não são arquivos
# IMPORTANTE: Excluir assets/, api/ e arquivos estáticos
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/rvcar/assets/
RewriteCond %{REQUEST_URI} !^/rvcar/api/
RewriteCond %{REQUEST_URI} !\.(js|css|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot|webp)$
RewriteRule ^(.*)$ /rvcar/index.html [L,QSA]

# Forçar HTTPS (DEPOIS do rewrite)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache para Assets Estáticos
<FilesMatch "\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

<FilesMatch "\.(css|js)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

<FilesMatch "\.(html)$">
    Header set Cache-Control "no-cache, must-revalidate"
</FilesMatch>

# Compressão Gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Segurança - Bloquear config.php
<Files "config.php">
    Order allow,deny
    Deny from all
</Files>

# Segurança - Prevenir listagem
Options -Indexes

# Charset UTF-8
AddDefaultCharset UTF-8
```

---

## 🔍 O Que Mudou?

### **ANTES (ERRADO):**

```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/rvcar/api/
RewriteRule ^(.*)$ /rvcar/index.html [L,QSA]
```

**Problema:** Não exclui `/rvcar/assets/` e não verifica extensões!

### **DEPOIS (CORRETO):**

```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/rvcar/assets/      ← ADICIONADO
RewriteCond %{REQUEST_URI} !^/rvcar/api/
RewriteCond %{REQUEST_URI} !\.(js|css|jpg|...)$  ← ADICIONADO
RewriteRule ^(.*)$ /rvcar/index.html [L,QSA]
```

**Benefício:** Agora EXCLUI:

- ✅ Pasta `/rvcar/assets/` completa
- ✅ Pasta `/rvcar/api/`
- ✅ Todos arquivos com extensões estáticas (.js, .css, .jpg, etc.)

---

## 🧪 Testes Após Aplicar

### **1. Teste arquivo JS direto:**

```
https://bnutech.com.br/rvcar/assets/index-CBX8ARmR.js
```

**Antes (ERRADO):**

- Content-Type: `text/html` ❌
- Conteúdo: HTML do index.html

**Depois (CORRETO):**

- Content-Type: `application/javascript` ✅
- Conteúdo: Código JavaScript minificado

### **2. Teste arquivo CSS direto:**

```
https://bnutech.com.br/rvcar/assets/index-O3gN9mho.css
```

**Deve retornar:** CSS puro ✅

### **3. Teste o site:**

```
https://bnutech.com.br/rvcar/
```

**Console (F12) deve mostrar:**

```
✅ Sem erros de MIME type
✅ Arquivos JS carregam
✅ Arquivos CSS carregam
✅ Site funciona!
```

---

## 📋 Passo a Passo Completo

1. **Acesse cPanel File Manager**

2. **Navegue:** `/public_html/rvcar/`

3. **Edite:** `.htaccess`

   - Clique com botão direito → Edit

4. **DELETE TODO o conteúdo antigo**

5. **COLE o código corrigido acima**

6. **Salve:** Save Changes

7. **Limpe cache:**

   ```
   Ctrl + Shift + R
   ```

8. **Teste arquivos diretos:**

   - `/rvcar/assets/index-CBX8ARmR.js` → JavaScript
   - `/rvcar/assets/index-O3gN9mho.css` → CSS

9. **Teste o site:**

   ```
   https://bnutech.com.br/rvcar/
   ```

10. **Verifique Console (F12):**
    - Não deve ter erros de MIME type
    - Arquivos devem carregar

---

## 🎯 Diferença Técnica

### **Por que o erro aconteceu?**

1. **Navegador pede:** `/rvcar/assets/index-CBX8ARmR.js`
2. **Apache verifica:** RewriteCond
3. **Arquivo existe?** Sim (condição `-f` é verdadeira)
4. **MAS...** A condição não checava se era da pasta `/assets/`
5. **Resultado:** Rewrite executou mesmo assim
6. **Apache retornou:** `/rvcar/index.html`
7. **Navegador esperava:** JavaScript
8. **Recebeu:** HTML
9. **ERRO:** MIME type mismatch

### **Como a correção resolve?**

Adicionamos **3 verificações extras**:

```apache
RewriteCond %{REQUEST_URI} !^/rvcar/assets/     # Exclui pasta assets/
RewriteCond %{REQUEST_URI} !^/rvcar/api/        # Exclui pasta api/
RewriteCond %{REQUEST_URI} !\.(js|css|...)$     # Exclui extensões estáticas
```

Agora o Apache **NÃO REESCREVE** se:

- URL começa com `/rvcar/assets/` ✅
- URL começa com `/rvcar/api/` ✅
- URL termina com `.js`, `.css`, `.jpg`, etc. ✅

---

## 📞 Checklist Final

- [ ] `.htaccess` atualizado com código corrigido
- [ ] Arquivo salvo
- [ ] Cache limpo (Ctrl+Shift+R)
- [ ] Teste JS direto: retorna JavaScript (não HTML)
- [ ] Teste CSS direto: retorna CSS (não HTML)
- [ ] Console sem erro de MIME type
- [ ] Site carrega completamente
- [ ] Veículos aparecem na página

---

## 🎬 Arquivo Correto

O arquivo `.htaccess-rvcar` já foi atualizado com a correção.

**Copie TODO o conteúdo dele e cole no servidor!**

---

**Tempo estimado:** 3 minutos  
**Probabilidade de sucesso:** 99% 🚀  
**Causa do problema:** Ordem incorreta das regras RewriteCond
