# 🚀 Guia de Inicialização - RV Car Solutions

## ⚠️ Problema Identificado

O projeto apresentava dois problemas principais:

1. **CORS Error**: Headers duplicados na API PHP
2. **Caminho da API**: Frontend tentando acessar URL incorreta

## ✅ Soluções Implementadas

### 1. Correção do CORS na API

- Removido headers duplicados no `config.php`
- Ajustado CORS no `vehicles.php` para enviar apenas um header `Access-Control-Allow-Origin`

### 2. Configuração do Ambiente Local

- Criado arquivo `.env` com URL correta da API
- Criado scripts para iniciar servidor PHP e React simultaneamente

## 📋 Pré-requisitos

- **PHP 7.4+** (verifique com: `php -v`)
- **Node.js 16+** (verifique com: `node -v`)
- **MySQL** (XAMPP, WAMP ou servidor MySQL separado)

## 🔧 Instalação - Passo a Passo

### 1️⃣ Instalar Dependências do Frontend

```powershell
npm install
```

### 2️⃣ Configurar o Banco de Dados

**Opção A - Via Browser (Recomendado)**

1. Inicie o servidor PHP:
   ```powershell
   .\start-api.bat
   ```
2. Abra no navegador: http://localhost:3000/api/install.php
3. Clique em "🚀 Instalar Banco de Dados"
4. Aguarde a conclusão

**Opção B - Via MySQL direto**

1. Abra o phpMyAdmin ou MySQL Workbench
2. Execute o script `api/schema.sql`

### 3️⃣ Iniciar o Projeto

**Modo Automático (Recomendado)**

```powershell
.\start-dev.bat
```

Isso iniciará:

- Backend PHP na porta 3000
- Frontend React na porta 8080

**Modo Manual**

```powershell
# Terminal 1 - Backend
.\start-api.bat

# Terminal 2 - Frontend
npm run dev
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000/api/vehicles.php
- **Instalador DB**: http://localhost:3000/api/install.php

## 🧪 Testar a API

Teste no navegador ou Postman:

```
GET http://localhost:3000/api/vehicles.php
```

Resposta esperada:

```json
[
  {
    "id": "1",
    "name": "Fiat Mobi",
    "price": "R$650",
    "image": "/assets/mobi.jpg",
    "features": ["Econômico", "Ar Condicionado", ...],
    "available": true,
    "created_at": "2024-01-01 10:00:00",
    "updated_at": "2024-01-01 10:00:00"
  },
  ...
]
```

## ❌ Solução de Problemas

### Erro: "CORS policy"

✅ **Corrigido!** Verifique se:

- O arquivo `.env` tem: `VITE_API_URL=http://localhost:3000/api/vehicles.php`
- O servidor PHP está rodando na porta 3000

### Erro: "Failed to fetch"

- Verifique se o servidor PHP está rodando: `.\start-api.bat`
- Teste a API direto no navegador: http://localhost:3000/api/vehicles.php

### Erro: "Database connection failed"

- Verifique se o MySQL está rodando (XAMPP/WAMP)
- Execute o instalador: http://localhost:3000/api/install.php
- Verifique as credenciais em `api/config.php`

### Erro: "Port 3000 is already in use"

Pare o processo na porta 3000:

```powershell
netstat -ano | findstr :3000
taskkill /PID [número_do_processo] /F
```

Ou altere a porta no `.env` e no `start-api.bat`

## 📁 Estrutura de Arquivos Importantes

```
rv-car-solutions-main/
├── .env                    # Configuração de ambiente (NOVO)
├── start-api.bat          # Inicia servidor PHP (NOVO)
├── start-dev.bat          # Inicia tudo (NOVO)
├── api/
│   ├── config.php         # Config DB (CORRIGIDO)
│   ├── vehicles.php       # API REST (CORRIGIDO)
│   ├── schema.sql         # Schema do banco
│   └── install.php        # Instalador visual
└── src/
    └── lib/
        └── vehicleManager.ts  # Cliente da API
```

## 🔒 Segurança

⚠️ **Importante para Produção:**

1. Delete o arquivo `api/install.php` após instalar
2. Configure senhas fortes no MySQL
3. Atualize as credenciais em `api/config.php`
4. Habilite HTTPS

## 📞 Suporte

Se continuar com problemas:

1. Verifique os logs no Console do navegador (F12)
2. Verifique os logs do PHP no terminal
3. Certifique-se que as portas 3000 e 8080 estão livres

## ✨ Recursos Disponíveis

✅ Catálogo de veículos
✅ Painel administrativo
✅ CRUD completo de veículos
✅ API RESTful em PHP
✅ Interface moderna com React + TypeScript
✅ Sistema de autenticação

---

**Desenvolvido para RV Car Solutions** 🚗
