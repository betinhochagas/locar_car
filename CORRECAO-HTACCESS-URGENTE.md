# 🚨 CORREÇÃO URGENTE - .HTACCESS

## ❌ PROBLEMA IDENTIFICADO

**Erro 404 no Admin Panel:** `https://bnutech.com.br/rvcar/admin/login`

**Causa:** `.htaccess` configurado para raiz `/` em vez de subdiretório `/rvcar/`

---

## ✅ SOLUÇÃO (2 MINUTOS)

### Opção 1: Upload do Novo .htaccess (RECOMENDADO)

1. **Acesse cPanel:** https://srv41.hinetworks.com.br:2083

2. **File Manager** → `public_html/rvcar/`

3. **BACKUP do .htaccess atual:**

   - Clique direito no `.htaccess`
   - **Download** (salvar backup)

4. **DELETE** o `.htaccess` antigo

5. **Upload** do novo `.htaccess` (arquivo está em: `D:\website\rv-car-solutions-main\.htaccess`)

6. **Teste:** https://bnutech.com.br/rvcar/admin/login

---

### Opção 2: Editar Manualmente

1. **File Manager** → `public_html/rvcar/`

2. **Clique direito** em `.htaccess` → **Edit**

3. **Adicione após linha 4:**

```apache
# Base path para subdiretório /rvcar/
RewriteBase /rvcar/
```

4. **Linha ~20 - Mude de:**

```apache
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^(.*)$ /index.html [L,QSA]
```

5. **Para:**

```apache
RewriteCond %{REQUEST_URI} !^/rvcar/api/
RewriteCond %{REQUEST_URI} !^/rvcar/install/
RewriteCond %{REQUEST_URI} !^/rvcar/uploads/
RewriteRule ^(.*)$ /rvcar/index.html [L,QSA]
```

6. **Save Changes**

---

## ✅ MUDANÇAS APLICADAS

### ANTES (errado):

```apache
RewriteEngine On
# Sem RewriteBase

RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^(.*)$ /index.html [L,QSA]
```

### DEPOIS (correto):

```apache
RewriteEngine On
RewriteBase /rvcar/  ← ADICIONADO

RewriteCond %{REQUEST_URI} !^/rvcar/api/      ← CORRIGIDO
RewriteCond %{REQUEST_URI} !^/rvcar/install/  ← ADICIONADO
RewriteCond %{REQUEST_URI} !^/rvcar/uploads/  ← ADICIONADO
RewriteRule ^(.*)$ /rvcar/index.html [L,QSA]  ← CORRIGIDO
```

---

## 📦 NOVO INSTALADOR GERADO

**Arquivo:** `rvcar-installer.zip` (0.48 MB)  
**Localização:** `D:\website\rv-car-solutions-main\`  
**Contém:** `.htaccess` corrigido

### Se quiser reinstalar tudo:

1. **DELETE** pasta `/rvcar/` inteira no servidor

2. **Upload** do novo `rvcar-installer.zip`

3. **Extract**

4. **Rodar instalação:** https://bnutech.com.br/rvcar/install/

---

## ✅ CHECKLIST PÓS-CORREÇÃO

Após aplicar a correção, teste:

- [ ] Site principal: https://bnutech.com.br/rvcar/
- [ ] Admin login: https://bnutech.com.br/rvcar/admin/login
- [ ] Admin dashboard: https://bnutech.com.br/rvcar/admin/dashboard
- [ ] API veículos: https://bnutech.com.br/rvcar/api/vehicles.php
- [ ] Sem erros no Console (F12)

---

## 🎯 O QUE CAUSOU O PROBLEMA?

O `.htaccess` original foi configurado pensando que o site estaria na **raiz** (`/`), mas você colocou em um **subdiretório** (`/rvcar/`).

Isso fez com que:

- ❌ Rotas do React Router não funcionassem
- ❌ `/admin/login` retornasse 404
- ❌ SPA não redirecionasse corretamente

**Agora está corrigido!** ✅

---

## 📞 SUPORTE

Se ainda tiver problemas após aplicar a correção:

1. Verifique se o `.htaccess` foi salvo com encoding correto (UTF-8)
2. Verifique permissões do arquivo (0644)
3. Limpe cache do navegador (Ctrl+Shift+Delete)
4. Teste em modo anônimo (Ctrl+Shift+N)

---

**Status:** 🟢 Correção aplicada e novo instalador gerado  
**Próximo passo:** Fazer upload do novo `.htaccess` ou reinstalar
