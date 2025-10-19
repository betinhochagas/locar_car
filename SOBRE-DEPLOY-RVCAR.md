# 📁 PASTA DEPLOY-RVCAR

## ✅ SOLUÇÃO DEFINITIVA PARA DEPLOY

Devido a problemas com o script PowerShell `criar-instalador.ps1`, foi criada a pasta **`deploy-rvcar/`** com **TODOS** os arquivos necessários prontos para upload.

---

## 🎯 O QUE É?

Uma pasta com a estrutura **COMPLETA** do sistema:

- ✅ Frontend compilado (React + Vite)
- ✅ Backend APIs (PHP)
- ✅ Instalador Web
- ✅ Configurações corretas

**Não precisa de scripts!** Basta compactar e fazer upload.

---

## 📦 CONTEÚDO

```
deploy-rvcar/
│
├── LEIA-ME.txt                  ← Instruções COMPLETAS
├── INSTRUCOES-RAPIDAS.md        ← Guia visual rápido
│
├── index.html                   (SPA React)
├── .htaccess                    (Corrigido para /rvcar/)
├── favicon.png
├── placeholder.svg
├── robots.txt
│
├── assets/                      (Frontend compilado)
│   ├── index-C-h9FbRP.js        (428 KB)
│   ├── index-O3gN9mho.css       (65 KB)
│   └── *.jpg                    (imagens)
│
├── api/                         (Backend PHP)
│   ├── vehicles.php             ✅ CRUD
│   ├── auth.php                 ✅ Login
│   ├── upload.php               ✅ Upload
│   └── .htaccess                (CORS)
│
├── install/                     (Instalador)
│   ├── index.php                (Wizard)
│   └── GUIA-INSTALADOR.md
│
└── uploads/                     (Uploads)
    └── vehicles/                (Fotos dos carros)
```

---

## 🚀 COMO USAR

### 1️⃣ Criar ZIP

Clique direito em `deploy-rvcar` → **Enviar para** → **Pasta compactada**

### 2️⃣ Upload

**cPanel:** https://srv41.hinetworks.com.br:2083

- File Manager → `public_html/rvcar/`
- Upload do ZIP
- Extract

### 3️⃣ Instalar

**URL:** https://bnutech.com.br/rvcar/install/

**Banco:**

- Host: `localhost`
- Database: `bnutechc_rvcar`
- User: `bnutechc_rvcar`
- Pass: `R.chagas1988`

### 4️⃣ Deletar /install/

**IMPORTANTE:** Por segurança, delete a pasta após instalar!

### 5️⃣ Testar

- **Site:** https://bnutech.com.br/rvcar/
- **Admin:** https://bnutech.com.br/rvcar/admin/login
- **Login:** `admin` / `rvcar2024`

---

## ✅ VANTAGENS DESTA ABORDAGEM

### Antes (script PowerShell):

- ❌ Erros de encoding
- ❌ Arquivos faltando
- ❌ Comandos complexos
- ❌ Difícil debugar

### Agora (pasta pronta):

- ✅ 100% confiável
- ✅ Todos os arquivos incluídos
- ✅ Você mesmo cria o ZIP
- ✅ Fácil de verificar

---

## 📋 ARQUIVOS INCLUÍDOS

### Frontend (dist):

- ✅ `index.html`
- ✅ `assets/*.js` (React compilado)
- ✅ `assets/*.css` (Tailwind compilado)
- ✅ `assets/*.jpg` (imagens)

### Backend (api):

- ✅ `vehicles.php` (CRUD veículos)
- ✅ `auth.php` (autenticação) ← **INCLUÍDO**
- ✅ `upload.php` (upload) ← **INCLUÍDO**
- ✅ `.htaccess` (CORS)
- ⚠️ `config.php` **NÃO** incluído (será gerado pelo instalador)

### Instalador:

- ✅ `install/index.php` (wizard completo)
- ✅ `install/GUIA-INSTALADOR.md`

### Configurações:

- ✅ `.htaccess` raiz (com `RewriteBase /rvcar/`)
- ✅ `robots.txt`
- ✅ `favicon.png`
- ✅ `placeholder.svg`

### Estrutura:

- ✅ `uploads/vehicles/` (pasta criada)

---

## 🔧 CORREÇÕES APLICADAS

Esta pasta já contém **TODAS as correções**:

### ✅ Correção 1: .htaccess

```apache
RewriteBase /rvcar/  # Adicionado
RewriteRule ^(.*)$ /rvcar/index.html  # Corrigido
```

### ✅ Correção 2: APIs

```
api/auth.php    ← INCLUÍDO (antes faltava)
api/upload.php  ← INCLUÍDO (antes faltava)
```

### ✅ Correção 3: Veículos

```sql
-- IDs únicos: veh_674e9f1a2b5c8
-- Imagens: /placeholder.svg
```

---

## 📝 DOCUMENTAÇÃO

### Dentro da pasta:

- `LEIA-ME.txt` - Instruções completas (texto)
- `INSTRUCOES-RAPIDAS.md` - Guia visual rápido

### No projeto:

- `PRONTO-PARA-PRODUCAO.md` - Análise completa
- `CORRECAO-HTACCESS-URGENTE.md` - Fix do .htaccess
- `CORRECAO-APIS-FALTANDO.md` - Fix das APIs
- `SOLUCAO-RAPIDA-LOGIN.md` - Solução do login

---

## ⚠️ IMPORTANTE

### Arquivos que SERÃO criados pelo instalador:

- `/api/config.php` (conexão com banco)

### Arquivos que DEVEM ser deletados após instalar:

- `/install/` (pasta inteira - segurança!)

### Arquivos que VOCÊ vai adicionar depois:

- `/uploads/vehicles/*.jpg` (fotos reais dos carros)

---

## 🎯 STATUS

**Status:** 🟢 100% PRONTO PARA DEPLOY  
**Versão:** 2.1.0 (Final)  
**Data:** 19/10/2025  
**Tamanho:** ~0.5 MB (compactado)

**Testado:** ✅ Estrutura verificada  
**Completo:** ✅ Todos os arquivos incluídos  
**Correções:** ✅ Todas aplicadas

---

## 🚀 PRÓXIMO PASSO

**1.** Abra a pasta `deploy-rvcar/`  
**2.** Leia o arquivo `LEIA-ME.txt`  
**3.** Siga as instruções passo a passo  
**4.** Faça o deploy! 🎉

---

## 📞 SUPORTE

Se tiver algum problema durante o deploy, consulte:

- `LEIA-ME.txt` (dentro da pasta)
- `PRONTO-PARA-PRODUCAO.md` (raiz do projeto)
- Seção Troubleshooting no LEIA-ME.txt

---

**Esta é a solução definitiva!** Não há mais dependência de scripts PowerShell.
Você tem controle total sobre os arquivos. ✅
