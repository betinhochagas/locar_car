# 🚀 Guia Rápido de Deploy - RV Car

## ⚡ COMANDOS ESSENCIAIS

### 1. Build do Projeto

```powershell
# Parar servidor de desenvolvimento (se rodando)
# Ctrl+C no terminal

# Fazer build de produção
npm run build

# Verificar se criou a pasta dist/
dir dist
```

### 2. Exportar Banco de Dados

```powershell
# Via linha de comando (XAMPP)
cd C:\xampp\mysql\bin
.\mysqldump.exe -u root rvcar_db > D:\website\rv-car-solutions-main\rvcar_db.sql

# Verificar se criou o arquivo
dir D:\website\rv-car-solutions-main\rvcar_db.sql
```

---

## 📋 CHECKLIST RÁPIDO

### Antes do Deploy

```
[ ] npm run build executado
[ ] Pasta dist/ existe
[ ] rvcar_db.sql exportado
[ ] Credenciais do cPanel em mãos
```

### No cPanel - Banco de Dados

```
[ ] Acesse: MySQL® Databases
[ ] Crie banco: usuario_rvcar_db
[ ] Crie usuário: usuario_rvcar_user
[ ] Defina senha forte
[ ] Adicione usuário ao banco (ALL PRIVILEGES)
[ ] Importe rvcar_db.sql via phpMyAdmin
```

### No cPanel - Arquivos

```
[ ] Acesse: File Manager
[ ] Entre em public_html/
[ ] Upload: todos arquivos da pasta dist/
[ ] Crie pasta: api/
[ ] Upload: config.php e vehicles.php
[ ] Upload: .htaccess (da raiz do projeto)
```

### Configuração

```
[ ] Edite api/config.php (credenciais de produção)
[ ] Ative SSL/TLS (AutoSSL)
[ ] Teste: https://seudominio.com.br
[ ] Teste: https://seudominio.com.br/api/vehicles.php
```

---

## 🗂️ ESTRUTURA NO SERVIDOR

```
public_html/
├── index.html              ← dist/index.html
├── .htaccess               ← .htaccess
├── vite.svg                ← dist/vite.svg
├── assets/                 ← dist/assets/
│   ├── index-xxx.js
│   ├── index-xxx.css
│   └── [imagens].jpg
└── api/
    ├── config.php          ← api/config.php (EDITAR!)
    └── vehicles.php        ← api/vehicles.php
```

---

## ⚙️ CONFIG.PHP - O QUE ALTERAR

Abra `api/config.php` no servidor e edite:

```php
} else {
    // PRODUÇÃO - ALTERE AQUI! 👇
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'usuario_rvcar_db');     // ← SEU banco
    define('DB_USER', 'usuario_rvcar_user');   // ← SEU usuário
    define('DB_PASS', 'SUA_SENHA_AQUI');       // ← SUA senha
    define('DB_CHARSET', 'utf8mb4');
}
```

**Exemplo:**

```php
define('DB_NAME', 'betinho_rvcar_db');    // betinho = seu usuário cPanel
define('DB_USER', 'betinho_rvcar_user');
define('DB_PASS', 'MinhaSenha123@');
```

---

## 🧪 TESTES APÓS DEPLOY

### 1. Testar Site

```
https://seudominio.com.br
✅ Carrega?
✅ Imagens aparecem?
✅ Navegação funciona?
```

### 2. Testar API

```
https://seudominio.com.br/api/vehicles.php
✅ Retorna JSON?
✅ Mostra os 8 veículos?
```

### 3. Testar Console (F12)

```
✅ Sem erros vermelhos?
✅ Network: Status 200?
✅ Veículos carregam na página?
```

---

## 🐛 PROBLEMAS COMUNS

### Página em branco

```
Solução: Verifique caminhos no index.html
Troque /assets/ por ./assets/
```

### API não funciona (CORS)

```
Solução: Verifique .htaccess foi enviado
Verifique headers em vehicles.php
```

### Erro 500 na API

```
Solução: Verifique config.php
Nome do banco está correto?
Senha está correta?
```

### Veículos não aparecem

```
Solução: Acesse phpMyAdmin
SELECT * FROM vehicles;
Se vazio, importe novamente o SQL
```

---

## 📞 ACESSO RÁPIDO

### cPanel

```
URL: https://srv41.hinetworks.com.br:2083
Usuário: ___________
Senha: ___________
```

### Banco de Dados

```
Host: localhost
Banco: ___________
Usuário: ___________
Senha: ___________
```

### Site

```
URL: https://___________
```

---

## 📦 ARQUIVOS PARA UPLOAD

### Frontend (pasta dist/)

```
✅ index.html
✅ assets/ (completa)
✅ vite.svg
```

### Backend (pasta api/)

```
✅ config.php
✅ vehicles.php
❌ install.php (NÃO enviar!)
```

### Configuração (raiz)

```
✅ .htaccess
```

### Banco de Dados

```
✅ rvcar_db.sql (importar via phpMyAdmin)
```

---

## ⏱️ TEMPO ESTIMADO

```
Build local: 2 min
Criar banco: 5 min
Importar SQL: 3 min
Upload arquivos: 10 min
Configurar: 5 min
Testes: 5 min

TOTAL: ~30 minutos ⚡
```

---

## 🎯 ORDEM DE EXECUÇÃO

```
1. npm run build (LOCAL)
2. Exportar banco (LOCAL)
3. Login cPanel
4. Criar banco MySQL
5. Importar SQL
6. Upload dist/
7. Upload api/
8. Upload .htaccess
9. Editar config.php
10. Ativar SSL
11. Testar site
12. ✅ PRONTO!
```

---

## 📝 ANOTAÇÕES

```
Data do Deploy: ___/___/_____
Horário: ___:___
Status: [ ] OK  [ ] Pendente  [ ] Erro
Observações:
_________________________________
_________________________________
_________________________________
```

---

**💡 Dica:** Mantenha este guia aberto durante o deploy!

**📚 Guia Completo:** DEPLOY-CPANEL.md

**🚀 Boa sorte com o deploy!**
