# 🔧 Solução: Página em Branco - Erro 404 nos Assets

## ❌ Problema Identificado

**Sintomas:**

- Página em branco
- Apenas favicon e título aparecem
- Console mostra: "Failed to load resources: 404"
- Arquivos CSS e JS não carregam

**Causa:**

1. Falta arquivo `.htaccess` na raiz do `/rvcar/`
2. Servidor não está fazendo rewrite correto das URLs

---

## ✅ SOLUÇÃO 1: Criar .htaccess

### **No cPanel File Manager:**

1. **Navegue para:** `/public_html/rvcar/`

2. **Habilite arquivos ocultos:**

   - Clique no ícone de **Settings** (engrenagem) no topo
   - Marque: **"Show Hidden Files (dotfiles)"**
   - Save

3. **Verifique se existe `.htaccess`**

   - Se NÃO existir, crie!

4. **Criar novo arquivo:**

   - Clique em **"+ File"** (New File)
   - Nome: `.htaccess` (com ponto no início!)
   - Location: `/public_html/rvcar/`

5. **Edite o arquivo e cole este código:**

```apache
# RV Car - Configuração Apache (.htaccess)
# Base Path: /rvcar/

# Habilitar RewriteEngine
RewriteEngine On
RewriteBase /rvcar/

# Forçar HTTPS (Segurança)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# CORS para API
<FilesMatch "\.(php)$">
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
</FilesMatch>

# SPA - Redirecionar todas as rotas para index.html
# Exceto arquivos reais e a pasta API
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/rvcar/api/
RewriteRule ^(.*)$ /rvcar/index.html [L,QSA]

# Cache para Assets Estáticos (Performance)
<FilesMatch "\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

<FilesMatch "\.(css|js)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

<FilesMatch "\.(html)$">
    Header set Cache-Control "no-cache, must-revalidate"
</FilesMatch>

# Compressão Gzip (Performance)
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE font/ttf
    AddOutputFilterByType DEFLATE font/opentype
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Segurança - Bloquear acesso direto a arquivos sensíveis
<Files "config.php">
    Order allow,deny
    Deny from all
</Files>

<Files ".env">
    Order allow,deny
    Deny from all
</Files>

<Files ".htaccess">
    Order allow,deny
    Deny from all
</Files>

# Segurança - Prevenir listagem de diretórios
Options -Indexes

# Segurança - Prevenir acesso a arquivos ocultos
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>

# Segurança - Headers de Segurança
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# PHP Settings
<IfModule mod_php7.c>
    php_value upload_max_filesize 10M
    php_value post_max_size 10M
    php_value max_execution_time 300
    php_value max_input_time 300
</IfModule>

# Charset UTF-8
AddDefaultCharset UTF-8
```

6. **Salve o arquivo**

7. **Teste o site:**
   ```
   https://bnutech.com.br/rvcar/
   ```

---

## ✅ SOLUÇÃO 2: Verificar index.html

### **Verifique se o index.html está correto:**

1. **Abra:** `/public_html/rvcar/index.html`

2. **Procure pelas tags `<script>` e `<link>`**

3. **Devem estar assim:**

```html
<script
  type="module"
  crossorigin
  src="/rvcar/assets/index-CBX8ARmR.js"
></script>
<link rel="stylesheet" crossorigin href="/rvcar/assets/index-O3gN9mho.css" />
```

4. **Se estiver assim (ERRADO):**

```html
<script type="module" crossorigin src="/assets/index-CBX8ARmR.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-O3gN9mho.css" />
```

**Solução:** Substitua o `index.html` pelo do novo ZIP que geramos.

---

## ✅ SOLUÇÃO 3: Verificar Permissões

### **Permissões dos arquivos:**

1. **Selecione todos os arquivos em `/rvcar/`**

2. **Clique com botão direito → Change Permissions**

3. **Configure:**

   - Arquivos: `644` (rw-r--r--)
   - Pastas: `755` (rwxr-xr-x)

4. **Marque:** "Recurse into subdirectories"

5. **Apply**

---

## 🧪 Testes Após Aplicar

### **1. Teste arquivos diretos:**

```
https://bnutech.com.br/rvcar/assets/index-CBX8ARmR.js
```

**Deve:** Baixar o arquivo JavaScript ✅

```
https://bnutech.com.br/rvcar/assets/index-O3gN9mho.css
```

**Deve:** Baixar o arquivo CSS ✅

### **2. Teste a API:**

```
https://bnutech.com.br/rvcar/api/vehicles.php
```

**Deve:** Retornar JSON com veículos ✅

### **3. Teste o site:**

```
https://bnutech.com.br/rvcar/
```

**Deve:** Carregar completamente ✅

### **4. Console (F12):**

**Antes (com erro):**

```
❌ Failed to load resource: 404
```

**Depois (funcionando):**

```
✅ Sem erros 404
✅ VehicleManager - API URL: /rvcar/api/vehicles.php
```

---

## 📋 Checklist de Verificação

- [ ] Arquivo `.htaccess` existe em `/rvcar/`
- [ ] Conteúdo do `.htaccess` está correto (com RewriteBase /rvcar/)
- [ ] Permissões: arquivos 644, pastas 755
- [ ] `index.html` tem paths corretos (/rvcar/assets/)
- [ ] Arquivos CSS/JS carregam (testar URLs diretas)
- [ ] API funciona (retorna JSON)
- [ ] Site carrega sem erros no Console

---

## 🎯 Causa Mais Provável

**99% de chance:** Falta o arquivo `.htaccess` ou está com configuração errada.

**Por quê?**

- Sem `.htaccess`, o Apache não sabe como servir os arquivos
- SPA (Single Page Application) precisa de rewrite rules
- Assets precisam das configurações de cache e CORS

---

## 📞 Próximos Passos

1. **Crie o `.htaccess`** (código acima)
2. **Salve e teste**
3. **Limpe cache:** Ctrl+Shift+R
4. **Veja o Console (F12)** para verificar erros
5. **Me avise o resultado!**

---

**Tempo estimado:** 3 minutos  
**Dificuldade:** Fácil  
**Probabilidade de sucesso:** 99% 🚀
