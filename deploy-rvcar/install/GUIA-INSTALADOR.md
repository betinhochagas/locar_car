# 📦 Guia do Instalador Web

## 🎯 Sobre o Instalador

O **RV Car Solutions Installer** é um instalador web completo que automatiza toda a configuração do sistema via navegador. Basta fazer upload de um arquivo ZIP e acessar pelo navegador!

---

## 🚀 Como Usar

### **Passo 1: Fazer Upload**

1. **Baixe o arquivo:** `rvcar-installer.zip`
2. **Acesse seu cPanel:** https://srv41.hinetworks.com.br:2083
3. **Vá em:** File Manager → `public_html/`
4. **Faça upload** do arquivo `rvcar-installer.zip`
5. **Extraia** o arquivo (botão direito → Extract)

### **Passo 2: Acessar o Instalador**

Abra seu navegador e acesse:

```
https://seudominio.com.br/install/
```

### **Passo 3: Seguir os 4 Passos**

#### **📋 Etapa 1: Verificação do Sistema**

O instalador verifica automaticamente:

- ✅ Versão do PHP (mínimo 7.4)
- ✅ Extensões necessárias (mysqli, json, mbstring)
- ✅ Permissões de escrita

**Se tudo estiver OK:** Clique em "Continuar"

#### **🗄️ Etapa 2: Banco de Dados**

Preencha os dados do MySQL:

- **Host:** `localhost` (geralmente)
- **Nome do Banco:** Ex: `usuario_rvcar_db`
- **Usuário:** Ex: `usuario_rvcar_user`
- **Senha:** A senha que você criou

**Onde encontrar?** cPanel → MySQL® Databases

#### **⚙️ Etapa 3: Instalação**

Revise os dados e clique em:

```
🚀 Instalar Agora
```

O instalador irá:

1. Criar o banco (se não existir)
2. Criar tabela `vehicles`
3. Inserir 8 veículos padrão
4. Gerar arquivo `api/config.php`
5. Configurar ambiente automaticamente

#### **🎉 Etapa 4: Concluído**

✅ Sistema instalado com sucesso!

**Ações:**

- 🏠 **Ir para o Site** - Ver o site funcionando
- 🔧 **Testar API** - Verificar se API está OK

---

## 🔒 Segurança - IMPORTANTE!

### **Após a Instalação:**

```
⚠️ DELETE IMEDIATAMENTE a pasta /install/ do servidor!
```

**Como deletar:**

1. cPanel → File Manager
2. Navegue até `public_html/install/`
3. Selecione a pasta
4. Clique em "Delete"

**Por quê?** Manter o instalador acessível é um risco de segurança grave!

---

## 🔐 Credenciais Padrão

### **Painel Administrativo:**

```
URL: https://seudominio.com.br/admin/login
Usuário: admin
Senha: rvcar2024
```

**⚠️ IMPORTANTE:** Altere a senha após o primeiro login!

---

## 📁 Estrutura do Instalador

```
rvcar-installer.zip
├── install/
│   ├── index.php          # Instalador web principal
│   └── .htaccess          # Proteção da pasta
├── api/
│   ├── vehicles.php       # API REST
│   └── .htaccess          # Configuração da API
├── assets/                # Imagens dos veículos
│   ├── mobi.jpg
│   ├── kwid.jpg
│   ├── uno.jpg
│   ├── onix.jpg
│   ├── gol.jpg
│   ├── voyage.jpg
│   ├── sandero.jpg
│   └── versa.jpg
├── index.html             # Página principal
├── .htaccess              # Configuração Apache
└── assets/
    └── index-*.js         # JavaScript compilado
    └── index-*.css        # CSS compilado
```

---

## ✅ Checklist Pós-Instalação

### **1. Verificar Site**

- [ ] Acesse: `https://seudominio.com.br`
- [ ] Página carrega corretamente
- [ ] Imagens aparecem

### **2. Verificar API**

- [ ] Acesse: `https://seudominio.com.br/api/vehicles.php`
- [ ] Retorna JSON com veículos

### **3. Testar Modais**

- [ ] Botão "Fale com um consultor" funciona
- [ ] Modal de locação lista veículos
- [ ] Modal de investimento abre

### **4. Testar WhatsApp**

- [ ] Botão aparece após 10 segundos
- [ ] Abre modal de seleção
- [ ] Mensagens formatadas corretamente

### **5. Testar Admin**

- [ ] Acesse: `https://seudominio.com.br/admin/login`
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Consegue adicionar/editar veículos

### **6. Segurança**

- [ ] Pasta `/install/` deletada
- [ ] SSL ativo (HTTPS)
- [ ] Senha do admin alterada

---

## 🐛 Resolução de Problemas

### **Erro: "Página não encontrada"**

```
Solução:
1. Verifique se o arquivo foi extraído corretamente
2. Certifique-se de acessar /install/ (com barra final)
3. Verifique permissões da pasta (755)
```

### **Erro: "Não foi possível conectar ao banco"**

```
Solução:
1. Verifique as credenciais no cPanel
2. Certifique-se de que o banco existe
3. Verifique se o usuário tem permissões (ALL PRIVILEGES)
4. Teste host: pode ser "localhost" ou "127.0.0.1"
```

### **Erro: "Não foi possível criar config.php"**

```
Solução:
1. Verifique permissões da pasta /api/
2. chmod 755 ou 775 na pasta
3. Tente criar a pasta api/ manualmente no File Manager
```

### **Erro: "Extensão mysqli não encontrada"**

```
Solução:
1. Entre em contato com seu provedor de hospedagem
2. Solicite ativação da extensão mysqli
3. Geralmente já vem ativada em hospedagens modernas
```

### **Instalador diz "Já instalado"**

```
Solução:
1. Delete o arquivo /install/.installed.lock
2. OU acesse: /install/?force=1
```

---

## 🔄 Reinstalar o Sistema

Se precisar reinstalar:

**Opção 1: Via URL**

```
https://seudominio.com.br/install/?force=1
```

**Opção 2: Manual**

1. Delete arquivo: `/install/.installed.lock`
2. Delete arquivo: `/api/config.php`
3. Acesse: `https://seudominio.com.br/install/`

**⚠️ ATENÇÃO:** Reinstalar irá recriar o banco e pode perder dados!

---

## 📊 O Que o Instalador Faz?

### **Verificações Automáticas:**

```
✓ PHP 7.4 ou superior
✓ Extensão mysqli
✓ Extensão json
✓ Extensão mbstring
✓ Permissões de escrita
```

### **Criação do Banco:**

```sql
CREATE DATABASE `seubancoaqui`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

### **Criação da Tabela:**

```sql
CREATE TABLE vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price VARCHAR(20),
  image VARCHAR(255),
  category VARCHAR(50),
  features TEXT,
  available TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### **Inserção de Dados:**

```
8 veículos padrão:
- Fiat Mobi (R$ 650)
- Renault Kwid (R$ 650)
- Fiat Uno (R$ 650)
- Chevrolet Onix (R$ 700)
- VW Gol (R$ 700)
- VW Voyage (R$ 700)
- Renault Sandero (R$ 700)
- Nissan Versa (R$ 700)
```

### **Geração de Arquivos:**

```
✓ api/config.php - Configuração do banco
✓ install/.installed.lock - Marcador de instalação
```

---

## 🎨 Interface do Instalador

O instalador possui uma interface moderna com:

- ✅ Barra de progresso visual (4 etapas)
- ✅ Verificação em tempo real
- ✅ Validação de formulários
- ✅ Mensagens de erro claras
- ✅ Design responsivo (mobile-friendly)
- ✅ Cores e ícones intuitivos

---

## 💡 Dicas Importantes

### **Antes de Instalar:**

1. Crie o banco de dados no cPanel
2. Crie um usuário MySQL
3. Dê permissões ALL PRIVILEGES ao usuário
4. Anote as credenciais

### **Durante a Instalação:**

1. Use navegador moderno (Chrome, Firefox, Edge)
2. Não feche a página durante instalação
3. Aguarde a mensagem de sucesso

### **Após a Instalação:**

1. DELETE a pasta /install/ imediatamente
2. Altere senha do admin
3. Teste todas as funcionalidades
4. Configure SSL (HTTPS)

---

## 📞 Suporte

**Problemas com o instalador?**

- Veja: `TROUBLESHOOTING.md`
- Verifique: `DEBUGGING.md`
- Issues: https://github.com/betinhochagas/rvcar/issues

**Contato:**

- 📱 WhatsApp: (47) 98448-5492
- 📧 Email: contato@rvcarlocacoes.com.br

---

## ✨ Recursos do Instalador

```
✅ Interface web intuitiva
✅ Verificação automática de requisitos
✅ Criação automática de banco
✅ Inserção de dados padrão
✅ Geração de config.php
✅ Detecção de ambiente (dev/prod)
✅ Proteção contra reinstalação acidental
✅ Validação de credenciais
✅ Mensagens de erro claras
✅ Design responsivo
✅ Sistema de segurança
✅ Testes pós-instalação
```

---

## 🎯 Tempo de Instalação

```
⏱️ Tempo estimado: 5-10 minutos

1. Upload do ZIP: 2 min
2. Extração: 1 min
3. Acesso ao instalador: 30 seg
4. Preenchimento de dados: 2 min
5. Instalação automática: 30 seg
6. Testes finais: 2 min
7. Limpeza (delete /install/): 1 min
```

---

## 🔐 Segurança

O instalador implementa:

- ✅ Proteção contra reinstalação acidental
- ✅ Validação de inputs
- ✅ Senha criptografada no banco
- ✅ Arquivo .htaccess de proteção
- ✅ Detecção de ambiente
- ✅ CORS configurado corretamente

---

## 📝 Notas da Versão

**v2.0.0** - Instalador Web

- Interface web completa
- Verificação automática de requisitos
- Criação automática de estrutura
- Inserção de dados padrão
- Configuração inteligente de ambiente
- Sistema de segurança integrado

---

**🎉 Instalação Simplificada!**  
_Apenas 4 cliques para ter seu site funcionando!_

---

**Desenvolvido com ❤️ para RV Car Solutions**  
_Blumenau - Santa Catarina_
