# 🚀 GUIA RÁPIDO - Instalador Web

## 📦 GERAR O ZIP

```powershell
.\criar-instalador.ps1
```

**Resultado:** `rvcar-installer.zip` criado! ✅

---

## 🌐 UPLOAD NO SERVIDOR

1. **cPanel** → File Manager → `public_html/`
2. **Upload** do `rvcar-installer.zip`
3. **Botão direito** → Extract
4. **Pronto!** Arquivos extraídos

---

## 🗄️ CRIAR BANCO (cPanel)

1. **MySQL® Databases**
2. **Criar banco:** `usuario_rvcar_db`
3. **Criar usuário:** `usuario_rvcar_user`
4. **Senha forte:** `****************`
5. **Add User To Database** → ALL PRIVILEGES

---

## 🎯 EXECUTAR INSTALADOR

### **Acesse:**

```
https://seudominio.com.br/install/
```

### **4 Etapas:**

#### 1️⃣ Verificação

```
✅ PHP 7.4+
✅ MySQLi
✅ JSON
✅ mbstring
✅ Permissões

→ Continuar
```

#### 2️⃣ Banco de Dados

```
Host:     localhost
Banco:    usuario_rvcar_db
Usuário:  usuario_rvcar_user
Senha:    [sua_senha]

→ Continuar
```

#### 3️⃣ Instalação

```
Revisar dados

→ 🚀 Instalar Agora
```

#### 4️⃣ Concluído

```
🎉 Sucesso!

→ Ir para o Site
→ Testar API
```

---

## 🔒 SEGURANÇA (OBRIGATÓRIO!)

**DELETE a pasta:**

```
/install/
```

**Como:**
cPanel → File Manager → Selecionar `/install/` → Delete

---

## ✅ CHECKLIST

```
□ ZIP gerado
□ Upload feito
□ Arquivos extraídos
□ Banco criado
□ Instalador executado
□ Site funcionando
□ /install/ deletado ⚠️
□ Senha admin alterada
```

---

## 🎯 CREDENCIAIS

**Admin:**

```
URL: https://seudominio.com.br/admin/login
User: admin
Pass: rvcar2024
```

**⚠️ ALTERE A SENHA!**

---

## 🐛 PROBLEMAS?

**Erro de conexão:**
→ Verifique credenciais do banco

**Permissões:**
→ chmod 755 em /api/

**Extensões:**
→ Contate hospedagem

---

## ⏱️ TEMPO TOTAL

```
Gerar ZIP:     30s
Upload:        2min
Criar banco:   2min
Instalação:    1min
Delete /install/: 30s

TOTAL: ~6 minutos ⚡
```

---

## 📞 AJUDA

**Guia completo:**
`INSTALADOR-WEB-COMPLETO.md`

**Suporte:**
WhatsApp: (47) 98448-5492

---

**🎉 Instalação em 4 cliques!**
