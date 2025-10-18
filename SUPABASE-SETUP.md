# 🔧 Configuração do Supabase - RV Car Solutions

## 📋 Visão Geral

Este guia mostra como configurar o **Supabase** para sincronizar os dados de veículos entre todos os dispositivos. Sem Supabase, os dados são salvos apenas localmente no navegador (localStorage).

## 🆚 Comparação

### ❌ Sem Supabase (LocalStorage)

- Dados salvos apenas no navegador atual
- Não sincroniza entre dispositivos
- Desktop ≠ Mobile ≠ Tablet
- Backup manual necessário

### ✅ Com Supabase (Banco de Dados)

- Dados salvos na nuvem
- Sincronização automática entre dispositivos
- Desktop = Mobile = Tablet
- Backup automático
- **Totalmente Gratuito** (até 500MB de dados)

---

## 🚀 Passo a Passo

### 1. Criar Conta no Supabase

1. Acesse: https://supabase.com
2. Clique em **"Start your project"**
3. Faça login com GitHub (recomendado) ou email
4. É grátis!

### 2. Criar Novo Projeto

1. No Dashboard, clique em **"New Project"**
2. Preencha:
   - **Name:** `rvcar` (ou nome de sua escolha)
   - **Database Password:** Crie uma senha forte (salve-a!)
   - **Region:** Escolha a mais próxima (ex: `South America (São Paulo)`)
   - **Pricing Plan:** Free (gratuito)
3. Clique em **"Create new project"**
4. Aguarde 2-3 minutos para o projeto ser criado

### 3. Criar Tabela de Veículos

1. No menu lateral, clique em **"Table Editor"**
2. Clique em **"Create a new table"**
3. Configure a tabela:

```sql
-- Nome da tabela: vehicles
-- Enable Row Level Security (RLS): DESATIVADO por enquanto
```

4. Adicione as colunas:

| Nome       | Tipo        | Default | Nullable | Primary |
| ---------- | ----------- | ------- | -------- | ------- |
| id         | text        | -       | ❌       | ✅      |
| name       | text        | -       | ❌       | ❌      |
| price      | text        | -       | ❌       | ❌      |
| image      | text        | -       | ✅       | ❌      |
| features   | text[]      | '{}'    | ✅       | ❌      |
| available  | bool        | true    | ❌       | ❌      |
| created_at | timestamptz | now()   | ❌       | ❌      |
| updated_at | timestamptz | now()   | ❌       | ❌      |

**OU** use o SQL Editor:

1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**
3. Cole o código abaixo e execute:

```sql
-- Criar tabela vehicles
CREATE TABLE vehicles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  image TEXT,
  features TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Desabilitar RLS por enquanto (para simplificar)
ALTER TABLE vehicles DISABLE ROW LEVEL SECURITY;

-- Índice para buscar por disponibilidade
CREATE INDEX idx_vehicles_available ON vehicles(available);
```

### 4. Obter Credenciais da API

1. No menu lateral, clique em **"Settings"** (ícone de engrenagem)
2. Clique em **"API"**
3. Na seção **"Project API keys"**, você verá:

```
Project URL: https://seu-projeto.supabase.co
anon public: eyJhbGciOi... (chave longa)
```

4. **COPIE ESSES DOIS VALORES!**

### 5. Configurar o Projeto Local

#### A. Criar arquivo `.env`

1. No diretório raiz do projeto (`d:\website\rv-car-solutions-main`), crie o arquivo `.env`:

```bash
# Windows PowerShell
New-Item -Path .env -ItemType File
```

2. Abra o arquivo `.env` e cole:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...sua-chave-aqui
```

⚠️ **IMPORTANTE:** Substitua pelos valores reais do passo 4!

#### B. Adicionar `.env` ao `.gitignore`

1. Abra o arquivo `.gitignore`
2. Adicione na última linha:

```
# Environment variables
.env
.env.local
```

Isso evita que suas credenciais sejam enviadas ao GitHub!

### 6. Testar Localmente

1. **Reinicie o servidor de desenvolvimento:**

```bash
# Pare o servidor (Ctrl+C se estiver rodando)
# Então execute:
npm run dev
```

2. **Acesse o painel admin:**

   - URL: http://localhost:8080/admin/login
   - Login: `admin` / `rvcar2024`

3. **Adicione um veículo de teste:**

   - Clique em "Adicionar Veículo"
   - Preencha os dados
   - Salve

4. **Verifique no Supabase:**

   - Volte ao Supabase Dashboard
   - Clique em "Table Editor"
   - Selecione a tabela `vehicles`
   - Você deve ver o veículo adicionado!

5. **Teste em outro dispositivo:**
   - Abra o site no celular
   - Acesse via rede local: `http://192.168.15.163:8080`
   - O veículo deve aparecer! ✅

---

## 🌐 Configurar para Produção (Vercel/Netlify)

### Vercel

1. Acesse: https://vercel.com
2. Vá para o projeto `rvcar`
3. Clique em **"Settings"** → **"Environment Variables"**
4. Adicione:
   - **Name:** `VITE_SUPABASE_URL`
   - **Value:** `https://seu-projeto.supabase.co`
   - Clique em "Add"
5. Adicione outra:

   - **Name:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** `eyJhbGciOi...sua-chave`
   - Clique em "Add"

6. Faça um novo deploy:

```bash
git add .
git commit -m "Add Supabase integration"
git push origin main
```

7. Vercel vai fazer redeploy automaticamente!

### Netlify

1. Acesse: https://netlify.com
2. Vá para o projeto
3. Clique em **"Site settings"** → **"Environment variables"**
4. Clique em **"Add a variable"**
5. Adicione as duas variáveis (mesmo processo da Vercel)
6. Faça push no GitHub e aguarde o deploy

---

## 🧪 Testando a Sincronização

### Teste 1: Desktop → Mobile

1. **No desktop:**

   - Acesse `/admin/login`
   - Adicione um veículo: "Teste Sync"

2. **No celular:**
   - Abra o site
   - Role até "Nossos Veículos"
   - Deve aparecer "Teste Sync"! ✅

### Teste 2: Mobile → Tablet

1. **No celular:**

   - Marque um veículo como "Indisponível"

2. **No tablet:**
   - Atualize a página (F5)
   - O veículo deve aparecer em cinza! ✅

### Teste 3: Múltiplos Admins

1. **Dispositivo A:**

   - Edite o preço de um veículo

2. **Dispositivo B:**
   - Atualize a página
   - O preço deve estar atualizado! ✅

---

## 🔒 Segurança (Row Level Security)

⚠️ **Atualmente, RLS está desabilitado** para simplificar. Para produção, considere:

### Habilitar RLS (Opcional)

```sql
-- No SQL Editor do Supabase
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública (site)
CREATE POLICY "Todos podem ler veículos"
ON vehicles FOR SELECT
USING (true);

-- Permitir escrita apenas para admins autenticados
CREATE POLICY "Apenas admins podem modificar"
ON vehicles FOR ALL
USING (auth.role() = 'authenticated');
```

**Nota:** Isso requer configurar autenticação do Supabase no AdminLogin.tsx

---

## 📊 Monitoramento

### Ver Logs de Requisições

1. No Supabase Dashboard
2. Menu lateral → **"Logs"**
3. Filtro: `api`
4. Veja todas as requisições GET/POST/PUT/DELETE

### Backup Manual

1. Menu lateral → **"Database"**
2. Clique em **"Backups"**
3. Supabase faz backup automático diário!

### Exportar Dados

```sql
-- No SQL Editor
SELECT * FROM vehicles;
```

Clique em **"Download CSV"** para backup local

---

## 🐛 Solução de Problemas

### Erro: "Failed to load vehicles from Supabase"

**Causa:** Credenciais incorretas ou rede offline

**Solução:**

1. Verifique `.env` (URL e KEY corretos)
2. Reinicie o servidor (`npm run dev`)
3. Verifique console do navegador (F12)

### Veículos não aparecem

**Causa:** Tabela vazia

**Solução:**

1. Acesse `/admin/login`
2. Dashboard deve inicializar com 8 veículos padrão
3. Verifique no Supabase Table Editor

### "TypeError: data is null"

**Causa:** Tabela não criada corretamente

**Solução:**

1. Re-execute o SQL de criação da tabela
2. Verifique se o nome é exatamente `vehicles` (minúsculo)

### Mobile não atualiza

**Causa:** Cache do navegador

**Solução:**

1. Limpe cache do app (Settings → Apps → Chrome → Clear Cache)
2. Tente modo anônimo
3. Aguarde 30 segundos e recarregue

---

## 💡 Dicas

### Performance

- ✅ Supabase é rápido (< 200ms de latência)
- ✅ Usa CDN global da AWS
- ✅ Conexões são reusadas automaticamente

### Limite Gratuito

O plano Free inclui:

- ✅ 500MB de banco de dados
- ✅ 1GB de armazenamento de arquivos
- ✅ 2GB de largura de banda
- ✅ Projetos ilimitados!

Para 50-100 veículos: **mais que suficiente**!

### Migração de localStorage → Supabase

Se já tem dados no localStorage:

```javascript
// No console do navegador (F12)
const local = JSON.parse(localStorage.getItem("rvcar_vehicles"));
console.log(local);
// Copie e adicione manualmente no Supabase Table Editor
```

---

## 📞 Suporte

**Problemas com Supabase:**

- Documentação: https://supabase.com/docs
- Discord: https://discord.supabase.com
- GitHub: https://github.com/supabase/supabase

**Problemas com o projeto:**

- Consulte [ADMIN-GUIDE.md](./ADMIN-GUIDE.md)
- Issue no GitHub: https://github.com/betinhochagas/rvcar/issues

---

## ✅ Checklist de Configuração

- [ ] Conta Supabase criada
- [ ] Projeto criado (região São Paulo)
- [ ] Tabela `vehicles` criada com todas as colunas
- [ ] RLS desabilitado (ou políticas configuradas)
- [ ] URL e ANON_KEY copiados
- [ ] Arquivo `.env` criado localmente
- [ ] `.env` adicionado ao `.gitignore`
- [ ] Servidor reiniciado (`npm run dev`)
- [ ] Teste local funcionando
- [ ] Variáveis adicionadas no Vercel/Netlify
- [ ] Deploy em produção funcionando
- [ ] Sincronização entre dispositivos testada

---

**Pronto! Agora seu sistema está sincronizado em todos os dispositivos! 🎉**
