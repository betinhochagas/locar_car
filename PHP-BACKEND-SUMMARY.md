# ✅ Backend PHP + MySQL - Implementação Completa

## 🎯 Resumo da Solução

Implementamos um **backend PHP com MySQL** para substituir o Supabase, ideal para hospedar no seu servidor cPanel (srv41.hinetworks.com.br).

---

## 📦 O que foi criado:

### Backend API (`api/`)

```
api/
├── config.php          # Configuração do banco de dados e CORS
├── vehicles.php        # API REST completa (GET, POST, PUT, DELETE, PATCH)
├── schema.sql          # Script SQL para criar banco e tabela
├── install.php         # Instalador visual automático
└── .htaccess          # Configurações Apache (CORS, PHP)
```

### Documentação (`docs/`)

```
docs/
├── LOCAL-SETUP.md      # Como configurar XAMPP localmente
└── TESTING.md          # Guia completo de testes
```

### Frontend Atualizado

- ✅ `src/lib/vehicleManager.ts` - Usa API PHP
- ✅ `.env.local` - Configuração de ambiente
- ✅ `.gitignore` - Proteção de arquivos sensíveis

---

## 🚀 Como Testar Agora (LOCAL)

### Passo 1: Configurar XAMPP

```powershell
# Abra PowerShell como Administrador
New-Item -ItemType SymbolicLink -Path "C:\xampp\htdocs\rvcar-api" -Target "d:\website\rv-car-solutions-main\api"

# OU simplesmente copie:
Copy-Item -Path "d:\website\rv-car-solutions-main\api" -Destination "C:\xampp\htdocs\rvcar-api" -Recurse
```

### Passo 2: Iniciar XAMPP

1. Abra **XAMPP Control Panel**
2. Inicie:
   - ✅ **Apache**
   - ✅ **MySQL**

### Passo 3: Instalar Banco de Dados

**Opção A: Instalador Automático (Recomendado)**

```
1. Abra: http://localhost/rvcar-api/install.php
2. Clique em "🚀 Instalar Banco de Dados"
3. Aguarde 5-10 segundos
4. Pronto! ✅
```

**Opção B: Manual via phpMyAdmin**

```
1. Abra: http://localhost/phpmyadmin
2. Clique em "SQL"
3. Cole o conteúdo de api/schema.sql
4. Clique em "Executar"
```

### Passo 4: Testar API

```
http://localhost/rvcar-api/vehicles.php
```

**Deve retornar JSON com 8 veículos!**

### Passo 5: Testar Frontend

```powershell
cd d:\website\rv-car-solutions-main
npm run dev
```

Abra: http://localhost:8080

**Verificar:**

- ✅ Console (F12) mostra: "🌐 Buscando veículos da API"
- ✅ Veículos aparecem no catálogo
- ✅ Admin funciona (/admin/login)

---

## 🔧 Configuração

### Local (XAMPP)

Arquivo `.env.local`:

```env
VITE_API_URL=http://localhost/rvcar-api/vehicles.php
VITE_USE_API=true
```

### Produção (cPanel)

Arquivo `.env.production` (criar depois):

```env
VITE_API_URL=https://srv41.hinetworks.com.br/api/vehicles.php
VITE_USE_API=true
```

---

## 📊 Endpoints da API

| Método | Endpoint           | Descrição                |
| ------ | ------------------ | ------------------------ |
| GET    | /vehicles.php      | Lista todos os veículos  |
| GET    | /vehicles.php?id=X | Busca veículo específico |
| POST   | /vehicles.php      | Adiciona novo veículo    |
| PUT    | /vehicles.php?id=X | Atualiza veículo         |
| DELETE | /vehicles.php?id=X | Remove veículo           |
| PATCH  | /vehicles.php?id=X | Toggle disponibilidade   |

---

## 🧪 Testes Rápidos

### PowerShell

```powershell
# Listar veículos
Invoke-RestMethod -Uri "http://localhost/rvcar-api/vehicles.php"

# Adicionar veículo
$body = @{
    name = "Teste"
    price = "R$800"
    features = @("Teste 1", "Teste 2")
    available = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost/rvcar-api/vehicles.php" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

### Navegador

```
http://localhost/rvcar-api/vehicles.php
http://localhost/phpmyadmin (ver banco)
http://localhost:8080 (frontend)
http://localhost:8080/admin/login (admin)
```

---

## ✅ Vantagens desta Solução

### vs. Supabase

| Aspecto          | PHP + MySQL       | Supabase          |
| ---------------- | ----------------- | ----------------- |
| **Custo**        | ✅ Incluído       | ⚠️ Externo        |
| **Controle**     | ✅ Total          | ⚠️ Limitado       |
| **Performance**  | ✅ Mesmo servidor | ⚠️ Rede externa   |
| **Configuração** | ✅ Simples        | ⚠️ Complexa       |
| **Dependência**  | ✅ Nenhuma        | ⚠️ Serviço 3º     |
| **Hospedagem**   | ✅ cPanel nativo  | ⚠️ Precisa config |

### vs. localStorage

| Aspecto           | PHP + MySQL      | localStorage    |
| ----------------- | ---------------- | --------------- |
| **Sincronização** | ✅ Todos dispos. | ❌ Apenas local |
| **Backup**        | ✅ Automático    | ❌ Manual       |
| **Multi-usuário** | ✅ Sim           | ❌ Não          |
| **Persistência**  | ✅ Permanente    | ⚠️ Pode limpar  |

---

## 🔐 Segurança

### Headers CORS

```php
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Validação

- ✅ Nome e preço obrigatórios
- ✅ ID verificado antes de atualizar/remover
- ✅ Erros retornam códigos HTTP corretos (400, 404, 500)

### Proteção

- ✅ `.htaccess` impede acesso direto a `config.php`
- ✅ PDO com prepared statements (anti-SQL injection)
- ✅ JSON encoding seguro (UTF-8, unescaped)

---

## 🐛 Troubleshooting

### API não responde

**Solução:**

1. Verifique Apache no XAMPP (deve estar verde)
2. Teste: http://localhost/dashboard (XAMPP funcionando?)
3. Verifique pasta: `C:\xampp\htdocs\rvcar-api` existe?

### Erro de conexão com banco

**Solução:**

1. Verifique MySQL no XAMPP (deve estar verde)
2. Abra phpMyAdmin: http://localhost/phpmyadmin
3. Banco `rvcar_db` existe? Se não, rode `install.php`

### CORS Error

**Solução:**

1. Verifique `.htaccess` na pasta `api/`
2. Recarregue Apache no XAMPP
3. Verifique console: deve ter headers CORS

### Frontend não carrega veículos

**Solução:**

1. Abra DevTools (F12) → Console
2. Procure erros vermelhos
3. Verifique `.env.local` (VITE_API_URL correto?)
4. Reinicie o servidor React: `npm run dev`

---

## 📚 Documentação Completa

- **[LOCAL-SETUP.md](./LOCAL-SETUP.md)** - Configuração detalhada do XAMPP
- **[TESTING.md](./TESTING.md)** - Guia completo de testes
- **[CPANEL-DEPLOY.md]** - Deploy em produção (próximo passo)

---

## 📝 Checklist Antes de Deploy

Antes de subir para produção:

- [ ] Todos os testes locais passaram
- [ ] API responde corretamente
- [ ] Frontend se conecta à API
- [ ] Admin adiciona/edita/remove veículos
- [ ] Sincronização funcionando
- [ ] Backup do banco feito (Export do phpMyAdmin)
- [ ] `.env.production` criado com URL de produção
- [ ] Documentação de deploy lida

---

## 🎯 Próximos Passos

1. ✅ **Testar localmente** (siga LOCAL-SETUP.md)
2. ✅ **Rodar todos os testes** (TESTING.md)
3. ✅ **Fazer backup do banco**
4. 🚀 **Deploy no cPanel** (aguardar guia CPANEL-DEPLOY.md)

---

## 💡 Dicas

### Performance Local

- Use **localhost** em vez de **127.0.0.1** (DNS cache)
- Mantenha apenas Apache e MySQL rodando no XAMPP
- Feche apps pesados durante testes

### Desenvolvimento

- Use **Postman** ou **Insomnia** para testar API
- Mantenha **phpMyAdmin** aberto em aba
- Use **VS Code** com extensão PHP Intelephense

### Debug

```php
// Adicione no topo de vehicles.php temporariamente:
ini_set('display_errors', 1);
error_reporting(E_ALL);
```

---

## 🎉 Resultado Final

### ANTES (Supabase/localStorage)

```
❌ Dependência externa
❌ Configuração complexa
❌ Não sincroniza (localStorage)
```

### DEPOIS (PHP + MySQL)

```
✅ Tudo no seu servidor
✅ Configuração simples
✅ Sincronização total
✅ Controle completo
✅ Custo zero
```

---

**Solução perfeita para seu caso! 🚀**

Agora você pode testar localmente. Quando tudo estiver funcionando, faremos o deploy no cPanel.

Alguma dúvida sobre os testes? Estou aqui! 😊
