# 🚀 Guia Completo de Deploy - RV Car no cPanel

## 📋 Informações do Servidor

**URL cPanel:** https://srv41.hinetworks.com.br:2083  
**Tipo de Hospedagem:** cPanel (Shared Hosting)

---

## 📦 PARTE 1: PREPARAÇÃO LOCAL

### Passo 1: Build do Projeto React

Execute no terminal do VS Code:

```powershell
# 1. Parar o servidor de desenvolvimento (se estiver rodando)
# Pressione Ctrl+C no terminal onde está rodando

# 2. Fazer o build de produção
npm run build
```

**O que acontece:**

- ✅ Vite compila todos os arquivos TypeScript/React
- ✅ Cria uma pasta `dist/` com os arquivos otimizados
- ✅ HTML, CSS, JS minificados e prontos para produção

**Resultado esperado:**

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [imagens].jpg/png
└── vite.svg
```

### Passo 2: Verificar a Pasta dist/

```powershell
# Verificar se a pasta foi criada
dir dist
```

✅ Deve mostrar: `index.html` e pasta `assets/`

---

## 🗄️ PARTE 2: PREPARAÇÃO DO BANCO DE DADOS

### Passo 3: Exportar o Banco Local

**Opção A: Via phpMyAdmin do XAMPP**

1. Abra: `http://localhost/phpmyadmin`
2. Selecione o banco `rvcar_db`
3. Clique em "Exportar"
4. Escolha "Método rápido" ou "Personalizado"
5. Clique em "Executar"
6. Salve o arquivo: `rvcar_db.sql`

**Opção B: Via Linha de Comando**

```powershell
# Navegue até a pasta do MySQL
cd C:\xampp\mysql\bin

# Exporte o banco
.\mysqldump.exe -u root rvcar_db > D:\website\rv-car-solutions-main\rvcar_db.sql
```

✅ Arquivo `rvcar_db.sql` criado com sucesso!

---

## 🌐 PARTE 3: CONFIGURAÇÃO NO cPANEL

### Passo 4: Login no cPanel

1. Acesse: https://srv41.hinetworks.com.br:2083
2. Digite suas credenciais de login
3. Você verá o painel principal do cPanel

### Passo 5: Criar o Banco de Dados MySQL

**5.1. Acesse "MySQL® Databases"**

No cPanel, procure por:

```
🔍 Buscar: "MySQL"
📂 Seção: Databases → MySQL® Databases
```

**5.2. Criar Novo Banco**

```
Nome do Banco: rvcar_db
(ou se tiver prefixo: usuario_rvcar_db)
```

Clique em **"Create Database"**

**5.3. Criar Usuário do Banco**

Desça até **"MySQL Users"**:

```
Username: rvcar_user
Password: [CRIE UMA SENHA FORTE]
```

⚠️ **IMPORTANTE:** Anote essa senha! Você vai precisar depois.

Clique em **"Create User"**

**5.4. Adicionar Usuário ao Banco**

Desça até **"Add User To Database"**:

```
User: rvcar_user
Database: rvcar_db (ou usuario_rvcar_db)
```

Selecione **ALL PRIVILEGES** (todos os privilégios)

Clique em **"Add"** → **"Make Changes"**

### Passo 6: Importar o Banco de Dados

**6.1. Acesse phpMyAdmin**

No cPanel, procure por:

```
🔍 Buscar: "phpMyAdmin"
📂 Clique em "phpMyAdmin"
```

**6.2. Importar o SQL**

1. Selecione o banco `rvcar_db` (ou `usuario_rvcar_db`) na lateral esquerda
2. Clique na aba **"Importar"** (Import)
3. Clique em **"Escolher arquivo"** (Choose File)
4. Selecione o arquivo `rvcar_db.sql` que você exportou
5. Desça até o final e clique em **"Executar"** (Go)

✅ Mensagem de sucesso deve aparecer!

**6.3. Verificar Dados**

1. Clique na tabela `vehicles` na lateral
2. Clique em "Procurar" (Browse)
3. ✅ Deve mostrar os 8 veículos cadastrados

---

## 📁 PARTE 4: UPLOAD DOS ARQUIVOS

### Passo 7: Acessar o Gerenciador de Arquivos

No cPanel:

```
🔍 Buscar: "File Manager"
📂 Clique em "File Manager"
```

### Passo 8: Preparar a Estrutura de Pastas

**8.1. Navegar para public_html**

```
📂 public_html/
```

Este é o diretório raiz do seu site.

**8.2. Criar Estrutura de Pastas (se necessário)**

Opção 1: **Site principal** (recomendado)

```
public_html/
├── index.html (do dist/)
├── assets/ (do dist/)
└── api/
```

Opção 2: **Subpasta** (exemplo: public_html/rvcar/)

```
public_html/rvcar/
├── index.html
├── assets/
└── api/
```

### Passo 9: Upload do Frontend (dist/)

**9.1. Upload via cPanel File Manager**

1. Entre em `public_html/`
2. Clique em **"Upload"** no topo
3. Selecione **TODOS** os arquivos da pasta `dist/`:
   - `index.html`
   - Pasta `assets/` (completa)
   - `vite.svg` (se existir)
4. Aguarde o upload completar

**9.2. Verificar Upload**

Volte ao File Manager e confirme:

```
public_html/
├── index.html ✅
├── assets/ ✅
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [imagens]
└── vite.svg
```

### Passo 10: Upload do Backend (API)

**10.1. Criar Pasta API**

No File Manager (`public_html/`):

1. Clique em **"+ Folder"** (Nova Pasta)
2. Nome: `api`
3. Clique em **"Create New Folder"**

**10.2. Upload dos Arquivos PHP**

Entre na pasta `api/` e faça upload de:

```
D:\website\rv-car-solutions-main\api\
├── config.php ✅
├── vehicles.php ✅
└── schema.sql (opcional, backup)
```

⚠️ **NÃO** faça upload do `install.php` em produção!

---

## ⚙️ PARTE 5: CONFIGURAÇÃO DO BACKEND

### Passo 11: Editar config.php

**11.1. Abrir o Arquivo**

No File Manager:

1. Navegue até `public_html/api/`
2. Clique com botão direito em `config.php`
3. Selecione **"Edit"**

**11.2. Atualizar Credenciais do Banco**

Encontre a seção de **PRODUÇÃO** e altere:

```php
} else {
    // Configurações de PRODUÇÃO (cPanel)
    define('DB_HOST', 'localhost');  // ← Geralmente é localhost
    define('DB_NAME', 'usuario_rvcar_db');  // ← SEU banco (com prefixo)
    define('DB_USER', 'usuario_rvcar_user');  // ← SEU usuário (com prefixo)
    define('DB_PASS', 'SUA_SENHA_AQUI');     // ← Senha que você criou
    define('DB_CHARSET', 'utf8mb4');
}
```

**Exemplo real:**

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'betinho_rvcar_db');  // betinho é o prefixo do usuário cPanel
define('DB_USER', 'betinho_rvcar_user');
define('DB_PASS', 'MinhaSenh@Forte123');
define('DB_CHARSET', 'utf8mb4');
```

**11.3. Salvar e Fechar**

Clique em **"Save Changes"** → **"Close"**

### Passo 12: Testar a API

Abra no navegador:

```
https://seudominio.com.br/api/vehicles.php
```

✅ **Sucesso:** Deve retornar JSON com os veículos:

```json
[
  {
    "id": "1",
    "name": "Fiat Mobi",
    "price": "R$650",
    ...
  }
]
```

❌ **Erro 500:** Verifique as credenciais do banco em `config.php`

---

## 🔧 PARTE 6: CONFIGURAÇÕES FINAIS

### Passo 13: Configurar .htaccess (Importante!)

**13.1. Criar arquivo .htaccess**

No File Manager (`public_html/`):

1. Clique em **"+ File"** (Novo Arquivo)
2. Nome: `.htaccess`
3. Clique em **"Create New File"**

**13.2. Editar .htaccess**

Clique com botão direito → **"Edit"** e cole:

```apache
# Habilitar rewrite
RewriteEngine On

# CORS para API
<FilesMatch "\.(php)$">
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</FilesMatch>

# Redirecionar todas as rotas para index.html (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^(.*)$ /index.html [L,QSA]

# Cache para assets
<FilesMatch "\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Comprimir arquivos
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Segurança
<Files "config.php">
    Order allow,deny
    Deny from all
</Files>
```

**13.3. Salvar**

Clique em **"Save Changes"**

### Passo 14: Configurar SSL (HTTPS)

**14.1. Acessar SSL/TLS**

No cPanel:

```
🔍 Buscar: "SSL"
📂 Clique em "SSL/TLS Status"
```

**14.2. Ativar AutoSSL**

1. Selecione seu domínio
2. Clique em **"Run AutoSSL"**
3. Aguarde alguns minutos

✅ Certificado SSL instalado automaticamente!

**14.3. Forçar HTTPS**

Adicione no topo do `.htaccess`:

```apache
# Forçar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 🧪 PARTE 7: TESTES E VERIFICAÇÃO

### Passo 15: Testar o Site

**15.1. Acesse seu domínio:**

```
https://seudominio.com.br
```

**15.2. Verificar Funcionalidades:**

✅ **Frontend:**

- [ ] Página carrega corretamente
- [ ] Imagens aparecem
- [ ] Navegação funciona
- [ ] Design responsivo ok

✅ **API:**

- [ ] Veículos aparecem na página
- [ ] Console do navegador sem erros (F12)

✅ **Modais:**

- [ ] Botão "Fale com um consultor" abre modal
- [ ] Formulário de aluguel funciona
- [ ] Formulário de investimento funciona
- [ ] WhatsApp abre corretamente

✅ **Contatos:**

- [ ] E-mail clicável funciona
- [ ] Telefone/WhatsApp funciona
- [ ] Formulário de contato envia

### Passo 16: Verificar Console de Erros

Abra o DevTools (F12):

**Console:**

```
✅ Sem erros vermelhos
✅ API retorna dados
✅ Imagens carregam
```

**Network:**

```
✅ Status 200 para index.html
✅ Status 200 para assets/
✅ Status 200 para api/vehicles.php
```

---

## 🐛 PARTE 8: TROUBLESHOOTING

### Problema 1: Página em Branco

**Causa:** Caminho dos assets incorreto

**Solução:**

Edite `index.html` no servidor:

```html
<!-- Trocar caminhos absolutos por relativos -->
<script type="module" src="/assets/index-xxx.js"></script>
<!-- Por: -->
<script type="module" src="./assets/index-xxx.js"></script>
```

### Problema 2: API não Funciona (CORS Error)

**Causa:** CORS não configurado

**Solução:**

Verifique `api/vehicles.php`:

```php
// Deve estar no INÍCIO do arquivo
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
```

### Problema 3: Erro 500 na API

**Causa:** Credenciais do banco incorretas

**Solução:**

1. Verifique `api/config.php`
2. Confirme o nome do banco no cPanel (pode ter prefixo)
3. Teste a conexão:

Crie arquivo `test.php` em `public_html/api/`:

```php
<?php
$host = 'localhost';
$db = 'usuario_rvcar_db';
$user = 'usuario_rvcar_user';
$pass = 'sua_senha';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    echo "✅ Conexão OK!";
} catch (PDOException $e) {
    echo "❌ Erro: " . $e->getMessage();
}
?>
```

Acesse: `https://seudominio.com.br/api/test.php`

### Problema 4: Veículos Não Aparecem

**Causa:** Banco vazio ou API com erro

**Solução:**

1. Acesse phpMyAdmin
2. Verifique se a tabela `vehicles` tem dados
3. Execute query:

```sql
SELECT * FROM vehicles;
```

Se vazia, importe novamente o `rvcar_db.sql`

### Problema 5: Imagens Não Carregam

**Causa:** Caminhos incorretos

**Solução:**

Verifique se todas as imagens foram enviadas:

```
public_html/assets/
├── logo-xxx.jpg
├── hero-bg-xxx.jpg
├── mobi-xxx.jpg
└── [outras imagens]
```

---

## 📊 CHECKLIST FINAL DE DEPLOY

```
PRÉ-DEPLOY:
├─ [x] npm run build executado
├─ [x] Pasta dist/ criada
├─ [x] Banco exportado (rvcar_db.sql)
└─ [x] Credenciais anotadas

cPANEL - BANCO:
├─ [ ] Banco criado no MySQL
├─ [ ] Usuário criado
├─ [ ] Privilégios concedidos
├─ [ ] SQL importado
└─ [ ] Dados verificados

cPANEL - ARQUIVOS:
├─ [ ] Frontend (dist/) enviado
├─ [ ] Backend (api/) enviado
├─ [ ] config.php atualizado
└─ [ ] .htaccess criado

TESTES:
├─ [ ] Site abre (https://)
├─ [ ] API funciona (/api/vehicles.php)
├─ [ ] Veículos aparecem
├─ [ ] Modais funcionam
├─ [ ] WhatsApp funciona
├─ [ ] E-mails funcionam
└─ [ ] Sem erros no console

SEGURANÇA:
├─ [ ] SSL ativo (HTTPS)
├─ [ ] HTTPS forçado
├─ [ ] install.php removido
└─ [ ] Senhas fortes

STATUS: ___/19 ✅
```

---

## 📝 INFORMAÇÕES IMPORTANTES

### Credenciais para Anotar

```
=== BANCO DE DADOS ===
Host: localhost
Nome: usuario_rvcar_db
Usuário: usuario_rvcar_user
Senha: ________________

=== cPANEL ===
URL: https://srv41.hinetworks.com.br:2083
Usuário: ________________
Senha: ________________

=== DOMÍNIO ===
URL: https://________________
```

### Arquivos Importantes no Servidor

```
public_html/
├── index.html (Frontend)
├── assets/ (JS, CSS, Imagens)
├── .htaccess (Configuração)
└── api/
    ├── config.php (Credenciais - PROTEGER!)
    └── vehicles.php (API)
```

---

## 🚀 PRÓXIMOS PASSOS

Após deploy bem-sucedido:

1. **Configurar DNS** (se ainda não estiver apontando)
2. **Testar em dispositivos móveis**
3. **Configurar backup automático** (cPanel → Backup)
4. **Adicionar Google Analytics** (opcional)
5. **Configurar email profissional** (contato@seudominio.com.br)

---

## 📞 SUPORTE

**Dúvidas durante o deploy?**

1. Verifique a seção de Troubleshooting acima
2. Consulte logs do cPanel (Metrics → Errors)
3. Entre em contato com o suporte da HiNetworks

---

## 🎉 CONCLUSÃO

Seguindo este guia passo a passo, seu site RV Car estará online e funcionando perfeitamente!

**Tempo estimado:** 30-45 minutos

**Dificuldade:** Intermediária

---

**Criado por: GitHub Copilot**  
**Data: 18/10/2025**  
**Versão: Deploy para cPanel/HiNetworks**
