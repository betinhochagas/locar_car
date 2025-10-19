# 🚀 DEPLOY RV CAR - INSTRUÇÕES RÁPIDAS

## ✅ ESTA PASTA ESTÁ PRONTA PARA UPLOAD!

**Contém:**

- ✅ Frontend compilado (React + Vite)
- ✅ Backend APIs (vehicles.php, auth.php, upload.php)
- ✅ Instalador Web (4 passos)
- ✅ Configurações (.htaccess corrigido para /rvcar/)
- ✅ Estrutura de pastas completa

---

## 📦 PASSO 1: CRIAR ZIP

1. **Clique direito** na pasta `deploy-rvcar`
2. **Enviar para** > Pasta compactada
3. **Renomeie** para: `deploy-rvcar.zip`

---

## ⬆️ PASSO 2: UPLOAD

1. **cPanel:** https://srv41.hinetworks.com.br:2083
2. **File Manager** > `public_html/rvcar/`
3. **DELETE** tudo que estiver lá
4. **Upload** do `deploy-rvcar.zip`
5. **Extract** (clique direito)
6. **MOVA** conteúdo de `deploy-rvcar/` para `rvcar/`
   - (arquivos devem ficar direto em `/rvcar/`, não em `/rvcar/deploy-rvcar/`)
7. **DELETE** pasta vazia e o ZIP

---

## 🔧 PASSO 3: INSTALAR

**URL:** https://bnutech.com.br/rvcar/install/

### Passo 1 - Verificação:

- ✅ Requisitos do servidor

### Passo 2 - Banco de Dados:

```
Host:     localhost
Database: bnutechc_rvcar
User:     bnutechc_rvcar
Pass:     R.chagas1988
```

### Passo 3 - Instalação:

- Cria tabelas
- Insere 8 veículos
- Cria admin

### Passo 4 - Conclusão:

- Credenciais: `admin` / `rvcar2024`

---

## 🔒 PASSO 4: SEGURANÇA

**IMPORTANTE:** DELETE a pasta `/rvcar/install/` após concluir!

---

## ✅ PASSO 5: TESTAR

### Site:

https://bnutech.com.br/rvcar/

### Admin:

https://bnutech.com.br/rvcar/admin/login

- Login: `admin`
- Senha: `rvcar2024`

---

## 📋 ESTRUTURA FINAL

```
/rvcar/
├── index.html          (SPA React)
├── .htaccess           (Config Apache)
├── assets/             (JS, CSS, imagens)
├── api/
│   ├── vehicles.php    ✅
│   ├── auth.php        ✅
│   ├── upload.php      ✅
│   ├── config.php      (criado pelo instalador)
│   └── .htaccess       (CORS)
├── uploads/
│   └── vehicles/       (fotos dos carros)
└── install/            ❌ DELETAR APÓS INSTALAR!
```

---

## 🎯 CHECKLIST

- [ ] ZIP criado
- [ ] Upload feito
- [ ] Arquivos extraídos
- [ ] Instalador executado
- [ ] Pasta /install/ deletada
- [ ] Login funciona
- [ ] Dashboard acessível
- [ ] 8 veículos aparecem

---

## 📞 PROBLEMAS?

**404 no admin:**

- Verifique se `.htaccess` tem `RewriteBase /rvcar/`

**Erro ao fazer login:**

- Verifique se `auth.php` existe em `/rvcar/api/`

**Erro de banco:**

- Confira credenciais no instalador

---

## 📚 DOCUMENTAÇÃO COMPLETA

Veja: `LEIA-ME.txt` (instruções detalhadas)

---

**Status:** 🟢 100% PRONTO  
**Versão:** 2.1.0  
**Data:** 19/10/2025

**BOA SORTE! 🚀**
