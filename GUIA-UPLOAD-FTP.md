# 🚀 Guia: Upload Automático via FTP

## 📋 O Que É Isso?

Um script PowerShell que **VOCÊ** executa no seu computador para fazer upload automático dos arquivos para o servidor.

**Eu não posso executar**, mas posso **gerar o script** para você! 😊

---

## ✅ Como Usar

### **1. Obter Credenciais FTP**

No cPanel:

1. Vá em **"FTP Accounts"**
2. Anote:
   - **Servidor FTP:** `ftp.bnutech.com.br` (ou similar)
   - **Usuário:** seu usuário FTP
   - **Senha:** sua senha FTP
   - **Caminho:** `/public_html/rvcar/`

---

### **2. Configurar o Script**

Abra o arquivo: `upload-ftp.ps1`

Edite as linhas:

```powershell
$ftpServer = "ftp.bnutech.com.br"      # ← Seu servidor FTP
$ftpUsername = "seu_usuario_ftp"        # ← Seu usuário
$ftpPassword = "sua_senha_aqui"         # ← Sua senha
$ftpRemotePath = "/public_html/rvcar/"  # ← Pasta de destino
```

---

### **3. Executar o Script**

No PowerShell:

```powershell
cd D:\website\rv-car-solutions-main
.\upload-ftp.ps1
```

**O script vai:**

1. ✅ Conectar ao servidor FTP
2. ✅ Criar pasta `/assets/` se não existir
3. ✅ Enviar `index.html`
4. ✅ Enviar `404.html`
5. ✅ Enviar todos arquivos da pasta `assets/`
6. ✅ Mostrar progresso

---

## 🎯 Vantagens

### **Upload Manual (cPanel):**

- ⏱️ ~5-10 minutos
- 🖱️ Muitos cliques
- 😰 Risco de esquecer arquivos

### **Upload Automático (Script):**

- ⚡ ~30 segundos
- 🤖 Automático
- ✅ Não esquece nada

---

## 🔧 Alternativas

### **OPÇÃO 1: FileZilla (Recomendado para Iniciantes)**

1. **Baixe:** [filezilla-project.org](https://filezilla-project.org/)

2. **Configure:**

   - Host: `ftp.bnutech.com.br`
   - Usuário: seu usuário
   - Senha: sua senha
   - Porta: 21

3. **Conecte**

4. **Arraste arquivos:**
   - Da pasta local `dist/`
   - Para a pasta remota `/public_html/rvcar/`

---

### **OPÇÃO 2: WinSCP (Windows)**

1. **Baixe:** [winscp.net](https://winscp.net/)

2. **Configure conexão FTP**

3. **Sincronize pastas:**
   - Local: `D:\website\rv-car-solutions-main\dist\`
   - Remoto: `/public_html/rvcar/`

---

### **OPÇÃO 3: cPanel File Manager (Atual)**

O que você já está fazendo! 👍

---

## 📊 Comparação

| Método                | Tempo    | Dificuldade | Automação  |
| --------------------- | -------- | ----------- | ---------- |
| **cPanel Manual**     | 5-10 min | Fácil       | ❌ Nenhuma |
| **Script PowerShell** | 30 seg   | Média       | ✅ Total   |
| **FileZilla**         | 2-3 min  | Fácil       | ⚠️ Parcial |
| **WinSCP**            | 2-3 min  | Fácil       | ✅ Sync    |

---

## 🚫 Por Que Eu Não Posso Fazer Isso?

**Sou uma IA que roda localmente no VS Code, mas:**

- ❌ Não tenho acesso à rede externa
- ❌ Não posso fazer conexões SSH/FTP
- ❌ Não armazeno credenciais
- ❌ Não executo comandos em servidores remotos

**Segurança em primeiro lugar! 🔒**

---

## ✅ O Que Posso Fazer

1. ✅ **Gerar o script** (já fiz!)
2. ✅ **Gerar o ZIP** (já fiz!)
3. ✅ **Te guiar passo a passo**
4. ✅ **Corrigir código**
5. ✅ **Criar documentação**

---

## 🎯 Resumo

**3 Opções Simples:**

### **1. ZIP Manual (Mais Fácil):**

```
1. Baixe: rvcar-installer.zip
2. Upload no cPanel
3. Extraia
4. Pronto!
```

### **2. Script FTP (Mais Rápido):**

```
1. Configure credenciais em upload-ftp.ps1
2. Execute: .\upload-ftp.ps1
3. Pronto!
```

### **3. FileZilla (Visual):**

```
1. Instale FileZilla
2. Conecte ao FTP
3. Arraste arquivos
4. Pronto!
```

---

**Escolha a que preferir!** 🚀

---

**Criado:** 19/10/2025  
**Arquivo:** `upload-ftp.ps1`  
**Status:** Pronto para uso (precisa configurar credenciais)
