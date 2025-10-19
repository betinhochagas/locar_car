# 🎯 COMO USAR O INSTALADOR - SUPER SIMPLES!

## 📦 PASSO 1: Gerar o ZIP

**No seu computador, execute:**

```powershell
.\criar-instalador.ps1
```

**Você verá:**

```
================================================
  RV Car Solutions - Gerador de Instalador
================================================

📦 Preparando arquivos...
✓ Pasta temporária criada
📁 Copiando frontend (dist/)...
✓ Frontend copiado
📁 Copiando instalador (install/)...
✓ Instalador copiado
📁 Copiando API (api/)...
✓ API copiada (sem config.php)
📝 Criando .htaccess raiz...
✓ .htaccess criado
📝 Criando README.txt...
✓ README.txt criado
✓ VERSION.txt criado

📦 Criando arquivo ZIP...
   Isso pode levar alguns segundos...
✓ ZIP criado com sucesso!

================================================
  ✅ INSTALADOR GERADO COM SUCESSO!
================================================

📦 Arquivo: rvcar-installer.zip
📊 Tamanho: 2.5 MB
```

**Uma pasta abrirá mostrando o arquivo `rvcar-installer.zip`** ✅

---

## 🌐 PASSO 2: Upload no cPanel

1. **Acesse:** https://srv41.hinetworks.com.br:2083
2. **Login** com suas credenciais
3. **File Manager**
4. **Navegue:** `public_html/`
5. **Clique em:** "Upload"
6. **Selecione:** `rvcar-installer.zip`
7. **Aguarde:** Upload 100%
8. **Volte ao File Manager**
9. **Clique direito no ZIP** → "Extract"
10. **Extract Files** → Pronto! ✅

---

## 🗄️ PASSO 3: Criar Banco

**No cPanel:**

1. **Procure:** "MySQL® Databases"
2. **Clique nele**
3. **Criar Novo Banco de Dados:**
   - Digite: `rvcar_db` (ou qualquer nome)
   - Clique: "Create Database"
4. **Criar Novo Usuário:**
   - Usuário: `rvcar_user` (ou qualquer nome)
   - Senha: [use uma senha forte]
   - Clique: "Create User"
5. **Adicionar Usuário ao Banco:**
   - Usuário: selecione o criado
   - Banco: selecione o criado
   - Clique: "Add"
6. **Dar Permissões:**
   - Marque: "ALL PRIVILEGES"
   - Clique: "Make Changes"

**Anote as credenciais:**

```
Host: localhost
Banco: cpaneluser_rvcar_db
Usuário: cpaneluser_rvcar_user
Senha: [sua_senha]
```

---

## 🎯 PASSO 4: Executar o Instalador

**Abra seu navegador e digite:**

```
https://seudominio.com.br/install/
```

### **Tela 1: Verificação ✅**

Você verá uma tela bonita com checks verdes:

```
✅ PHP 7.4 ou superior (Atual: 8.2)
✅ Extensão PHP: mysqli
✅ Extensão PHP: json
✅ Extensão PHP: mbstring
✅ Pasta /api/ com permissão de escrita

✅ Perfeito! Todos os requisitos foram atendidos.

[Continuar →]
```

**Clique em "Continuar"**

---

### **Tela 2: Banco de Dados 🗄️**

Preencha com as credenciais que você anotou:

```
Host do Banco de Dados:    localhost
Nome do Banco de Dados:    cpaneluser_rvcar_db
Usuário do Banco:          cpaneluser_rvcar_user
Senha do Banco:            [sua_senha]

[Continuar →]
```

**Clique em "Continuar"**

---

### **Tela 3: Instalação ⚙️**

Revise os dados:

```
Host: localhost
Banco: cpaneluser_rvcar_db
Usuário: cpaneluser_rvcar_user
Senha: ••••••••

📦 O que será instalado?
✅ Criação do banco de dados (se não existir)
✅ Criação da tabela vehicles
✅ Inserção de 8 veículos padrão
✅ Geração do arquivo api/config.php
✅ Configuração automática de ambiente

[🚀 Instalar Agora]
```

**Clique em "🚀 Instalar Agora"**

_O botão mudará para "⏳ Instalando... Por favor, aguarde..."_

---

### **Tela 4: Concluído! 🎉**

```
🎉

Instalação Concluída!

O RV Car Solutions foi instalado com sucesso!

✅ Sistema Instalado:
• Banco de dados configurado
• 8 veículos cadastrados
• API REST funcionando
• Configuração gerada automaticamente

🔐 Credenciais do Painel Admin:
URL: https://seudominio.com.br/admin/login
Usuário: admin
Senha: rvcar2024

⚠️ IMPORTANTE: Altere a senha após o primeiro login!

🔒 SEGURANÇA:
DELETE a pasta /install/ do seu servidor imediatamente!

[🏠 Ir para o Site]  [🔧 Testar API]
```

---

## 🔒 PASSO 5: Segurança (OBRIGATÓRIO!)

**⚠️ DELETE A PASTA /install/**

**No cPanel:**

1. **File Manager**
2. **Navegue:** `public_html/`
3. **Selecione:** pasta `install/`
4. **Clique em:** "Delete"
5. **Confirme:** "Delete Files"

**✅ Pronto! Seu site está seguro!**

---

## 🎉 PRONTO! SEU SITE ESTÁ NO AR!

**Acesse:**

```
https://seudominio.com.br
```

**Painel Admin:**

```
https://seudominio.com.br/admin/login
Usuário: admin
Senha: rvcar2024
```

**⚠️ LEMBRE-SE: Altere a senha do admin!**

---

## ✅ CHECKLIST FINAL

```
□ Script executado (criar-instalador.ps1)
□ ZIP gerado (rvcar-installer.zip)
□ Upload feito no cPanel
□ Arquivos extraídos
□ Banco de dados criado
□ Usuário criado e com permissões
□ Instalador executado (/install/)
□ Tela de sucesso apareceu
□ Pasta /install/ deletada ⚠️
□ Site acessível
□ API funcionando
□ Login admin funcionando
□ Senha do admin alterada
```

---

## ⏱️ TEMPO TOTAL

```
Gerar ZIP:         30 segundos
Upload:            2 minutos
Criar banco:       2 minutos
Executar instalador: 1 minuto
Delete /install/:  30 segundos

TOTAL: ~6 minutos! ⚡
```

---

## 🆘 PROBLEMAS?

### **Erro: "Não foi possível conectar ao banco"**

```
→ Verifique as credenciais
→ Certifique-se que o banco existe
→ Verifique se usuário tem ALL PRIVILEGES
```

### **Erro: "Extensão mysqli não encontrada"**

```
→ Contate seu provedor de hospedagem
→ Solicite ativação da extensão mysqli
```

### **Erro: "Não foi possível criar config.php"**

```
→ Verifique permissões da pasta /api/
→ Tente chmod 755 na pasta
```

### **Página em branco após instalar**

```
→ Verifique se .htaccess foi extraído
→ Limpe cache do navegador (Ctrl+F5)
→ Verifique logs de erro do cPanel
```

---

## 💡 DICAS

- ✅ Use navegador moderno (Chrome, Firefox, Edge)
- ✅ Não feche a página durante instalação
- ✅ Anote as credenciais do banco
- ✅ Use senha forte para o banco
- ✅ Delete /install/ imediatamente após usar
- ✅ Altere senha do admin no primeiro login
- ✅ Ative SSL (HTTPS) no cPanel

---

## 📞 PRECISA DE AJUDA?

**Documentação Completa:**

- `INSTALADOR-WEB-COMPLETO.md`
- `install/GUIA-INSTALADOR.md`

**Contato:**

- 📱 WhatsApp: (47) 98448-5492
- 📧 Email: contato@rvcarlocacoes.com.br

---

## 🎊 PARABÉNS!

**Você instalou o RV Car Solutions em apenas 4 cliques!** 🚀

Agora é só:

1. Alterar senha do admin
2. Adicionar/editar veículos
3. Personalizar informações
4. Divulgar seu site!

**Boa sorte! 🎉**
