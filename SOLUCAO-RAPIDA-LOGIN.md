# 🚨 SOLUÇÃO RÁPIDA - FAZER LOGIN FUNCIONAR

## 📋 O QUE ACONTECEU

Você conseguiu acessar `/rvcar/admin/login` ✅  
Mas ao tentar logar: **404 (Not Found)** no `auth.php` ❌

---

## ⚡ SOLUÇÃO RÁPIDA (2 MINUTOS)

### **Passo 1: Download dos Arquivos**

Baixe estes 2 arquivos do GitHub:

- https://github.com/betinhochagas/rvcar/blob/master/api/auth.php
- https://github.com/betinhochagas/rvcar/blob/master/api/upload.php

**OU** copie do seu PC:

- `D:\website\rv-car-solutions-main\api\auth.php`
- `D:\website\rv-car-solutions-main\api\upload.php`

---

### **Passo 2: Upload no cPanel**

1. **Acesse:** https://srv41.hinetworks.com.br:2083

2. **File Manager** → `public_html/rvcar/api/`

3. **Upload** (botão azul no topo)

4. Selecione os 2 arquivos:

   - `auth.php`
   - `upload.php`

5. Aguarde upload completar

---

### **Passo 3: Verificar Estrutura**

A pasta `/rvcar/api/` deve ter:

```
api/
├── .htaccess     ✅ (já existe)
├── auth.php      ✅ (você acabou de fazer upload)
├── config.php    ✅ (criado pelo instalador)
├── upload.php    ✅ (você acabou de fazer upload)
└── vehicles.php  ✅ (já existe)
```

---

### **Passo 4: Testar Login**

1. **Acesse:** https://bnutech.com.br/rvcar/admin/login

2. **Login:**

   - Usuário: `admin`
   - Senha: `rvcar2024`

3. **Clique:** Entrar

4. **Abra Console (F12)** → Aba Console

5. **Verificar:**
   - ✅ Sem erro 404
   - ✅ Dashboard aparece

---

## 🔄 ALTERNATIVA: REINSTALAR TUDO

Se preferir começar do zero:

1. **DELETE** pasta `/rvcar/` inteira

2. **Upload** do novo instalador:

   - Arquivo: `rvcar-installer.zip` (0.48 MB)
   - Local PC: `D:\website\rv-car-solutions-main\`

3. **Extract** o ZIP

4. **Instalar:** https://bnutech.com.br/rvcar/install/

5. **Configurar banco:**

   - Host: `localhost`
   - Database: `bnutechc_rvcar`
   - User: `bnutechc_rvcar`
   - Pass: `R.chagas1988`

6. **DELETE** pasta `/install/`

---

## 🎯 CHECKLIST FINAL

Após fazer upload dos arquivos:

- [ ] Arquivo `auth.php` está em `/rvcar/api/`
- [ ] Arquivo `upload.php` está em `/rvcar/api/`
- [ ] Login em https://bnutech.com.br/rvcar/admin/login
- [ ] Console (F12) sem erros
- [ ] Dashboard aparece após login
- [ ] Pode adicionar veículos
- [ ] Pode fazer upload de imagens

---

## 🤔 POR QUE ISSO ACONTECEU?

O instalador antigo tinha um bug no script `criar-instalador.ps1`:

### ANTES (bugado):

```powershell
# Copiava APENAS 1 arquivo
Copy-Item vehicles.php
```

### DEPOIS (corrigido):

```powershell
# Copia TODOS os arquivos
$apiFiles = @("vehicles.php", "auth.php", "upload.php", ".htaccess")
foreach ($file in $apiFiles) {
    Copy-Item $file
}
```

---

## 📞 PRECISA DE AJUDA?

Se ainda tiver problemas:

1. Verifique permissões dos arquivos (0644)
2. Verifique se `config.php` existe
3. Teste a API diretamente: https://bnutech.com.br/rvcar/api/vehicles.php
4. Limpe cache do navegador (Ctrl+Shift+Delete)

---

**Status:** 🟢 Solução pronta  
**Tempo:** ⚡ 2 minutos  
**Dificuldade:** 🟢 Fácil

**Basta fazer upload de 2 arquivos e o login vai funcionar!** 🚀
