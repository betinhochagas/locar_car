# 🚨 CORREÇÃO URGENTE - APIs FALTANDO

## ❌ PROBLEMA 2 IDENTIFICADO

**Erro 404 ao fazer login:** `POST https://bnutech.com.br/rvcar/api/auth.php`

**Causa:** Instalador antigo **NÃO incluía** `auth.php` e `upload.php` na pasta `/api/`

---

## ✅ SOLUÇÃO (5 MINUTOS)

### Opção 1: Upload Manual dos Arquivos (RÁPIDO) ⚡

1. **Acesse cPanel:** https://srv41.hinetworks.com.br:2083

2. **File Manager** → `public_html/rvcar/api/`

3. **Upload** estes 2 arquivos:

   - `D:\website\rv-car-solutions-main\api\auth.php`
   - `D:\website\rv-car-solutions-main\api\upload.php`

4. **Verifique** se ficou assim:

   ```
   /rvcar/api/
   ├── .htaccess
   ├── auth.php      ← NOVO
   ├── config.php
   ├── upload.php    ← NOVO
   └── vehicles.php
   ```

5. **Teste login:** https://bnutech.com.br/rvcar/admin/login

---

### Opção 2: Reinstalar Tudo (COMPLETO) 🔄

1. **DELETE** a pasta `/rvcar/` inteira no servidor

2. **Upload** do novo instalador: `rvcar-installer.zip` (0.48 MB)

   - ✅ Agora inclui `auth.php`
   - ✅ Agora inclui `upload.php`
   - ✅ `.htaccess` corrigido

3. **Extract** o ZIP

4. **Instalar:** https://bnutech.com.br/rvcar/install/

   - Database: `bnutechc_rvcar`
   - User: `bnutechc_rvcar`
   - Pass: `R.chagas1988`

5. **DELETE** pasta `/install/` após concluir

---

## 🔧 O QUE FOI CORRIGIDO NO INSTALADOR

### ANTES (bugado):

```powershell
# Copiava APENAS vehicles.php
Copy-Item -Path (Join-Path $apiFolder "vehicles.php") -Destination $tempApiFolder
```

### DEPOIS (corrigido):

```powershell
# Copia TODOS os arquivos necessários
$apiFiles = @("vehicles.php", "auth.php", "upload.php", ".htaccess")
foreach ($file in $apiFiles) {
    Copy-Item -Path $sourcePath -Destination $tempApiFolder
}
```

---

## 📦 NOVO INSTALADOR

**Arquivo:** `rvcar-installer.zip` (0.48 MB)  
**Localização:** `D:\website\rv-car-solutions-main\`

**Conteúdo agora inclui:**

- ✅ Frontend compilado
- ✅ `api/vehicles.php`
- ✅ `api/auth.php` ← CORRIGIDO
- ✅ `api/upload.php` ← CORRIGIDO
- ✅ `api/.htaccess`
- ✅ Instalador web
- ✅ `.htaccess` raiz (corrigido para /rvcar/)

---

## ✅ CHECKLIST PÓS-CORREÇÃO

Após fazer upload dos arquivos:

- [ ] Acesse: https://bnutech.com.br/rvcar/admin/login
- [ ] Login: `admin` / `rvcar2024`
- [ ] Console (F12) **sem erros** 404
- [ ] Dashboard aparece
- [ ] Upload de imagem funciona
- [ ] Adicionar veículo funciona

---

## 🎯 RESUMO DOS PROBLEMAS E SOLUÇÕES

### ✅ Problema 1: .htaccess (RESOLVIDO)

- **Sintoma:** 404 em `/rvcar/admin/login`
- **Causa:** Faltava `RewriteBase /rvcar/`
- **Status:** ✅ CORRIGIDO (commit 9cbbba1)

### ✅ Problema 2: APIs Faltando (AGORA)

- **Sintoma:** 404 em `POST /rvcar/api/auth.php`
- **Causa:** Script não copiava `auth.php` e `upload.php`
- **Status:** ✅ CORRIGIDO (novo instalador gerado)

---

## 📞 PRÓXIMO PASSO

**Escolha uma das opções:**

### 🚀 RÁPIDA (2 min):

Fazer upload manual de `auth.php` e `upload.php` na pasta `/rvcar/api/`

### 🔄 COMPLETA (10 min):

Reinstalar tudo com o novo `rvcar-installer.zip`

---

**Recomendação:** Use a **opção rápida** se quiser testar agora!

---

**Status:** 🟢 Correção aplicada e novo instalador gerado  
**Data:** 19/10/2025  
**Commit:** Próximo (será commitado agora)
