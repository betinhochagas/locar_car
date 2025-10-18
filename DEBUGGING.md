# 🔍 Guia de Debugging - RV Car Solutions

## ⚠️ Problema Relatado

- Alterações salvando apenas localmente (localStorage)
- Dados não sincronizam entre dispositivos
- Guia anônima não mostra alterações

---

## 📋 Checklist de Verificação

### 1️⃣ Verificar XAMPP

```powershell
# Apache e MySQL devem estar VERDES no painel XAMPP
```

### 2️⃣ Testar API Diretamente

Abra no navegador:

```
http://localhost/rvcar-api/vehicles.php
```

**Resultado esperado:** JSON com lista de veículos

---

## 🧪 Testes a Realizar

### Teste 1: Página de Teste de Conexão

1. Abra: `http://localhost:8080/check-env.html`
2. Clique em "🔄 Testar Conexão"
3. **Esperado:** ✅ API CONECTADA!

### Teste 2: Console do Navegador

1. Abra o site: `http://localhost:8080`
2. Pressione `F12` (DevTools)
3. Vá na aba **Console**
4. Procure por: `🔧 VehicleManager Config:`

**O que você deve ver:**

```javascript
{
  API_URL: "http://localhost/rvcar-api/vehicles.php",
  USE_API: true,
  ENV_VITE_API_URL: "http://localhost/rvcar-api/vehicles.php",
  ENV_VITE_USE_API: "true"
}
```

### Teste 3: Aba Network (Rede)

1. Com DevTools aberto (F12)
2. Vá na aba **Network** (Rede)
3. Recarregue a página (F5)
4. Procure por requisição: `vehicles.php`

**O que verificar:**

- ✅ Status: 200 OK
- ✅ Type: xhr ou fetch
- ✅ Response: JSON com veículos

---

## 🐛 Possíveis Problemas e Soluções

### Problema 1: Variáveis de ambiente não carregam

**Sintomas:**

```javascript
ENV_VITE_API_URL: undefined;
ENV_VITE_USE_API: undefined;
```

**Solução:**

```powershell
# 1. Pare o servidor (Ctrl+C no terminal)
# 2. Verifique se .env.local existe:
Get-Content .env.local

# 3. Reinicie o servidor:
npm run dev
```

### Problema 2: CORS ainda bloqueando

**Sintomas no Console:**

```
Access to fetch... has been blocked by CORS policy
```

**Solução:**

```powershell
# 1. Verifique se config.php tem os headers corretos
Get-Content api/config.php | Select-String "Access-Control"

# 2. Reinicie o Apache no XAMPP
```

### Problema 3: API retorna 404

**Sintomas:**

```
Failed to fetch
404 Not Found
```

**Solução:**

```powershell
# Verifique se a pasta existe:
Test-Path "C:\xampp\htdocs\rvcar-api\vehicles.php"

# Se FALSE, copie novamente:
Copy-Item -Path "api\*" -Destination "C:\xampp\htdocs\rvcar-api\" -Recurse -Force
```

### Problema 4: Banco não instalado

**Sintomas:**

```json
{ "error": "Tabela vehicles não existe" }
```

**Solução:**

```
1. Abra: http://localhost/rvcar-api/install.php
2. Clique em "Instalar Banco de Dados"
3. Aguarde mensagem de sucesso
```

---

## 🔬 Teste Completo Passo a Passo

Execute EXATAMENTE nesta ordem:

### Passo 1: Verificar XAMPP

```powershell
# Abra o XAMPP Control Panel
# Apache: ✅ Verde (Running)
# MySQL: ✅ Verde (Running)
```

### Passo 2: Verificar Arquivos da API

```powershell
# No PowerShell, execute:
Test-Path "C:\xampp\htdocs\rvcar-api\vehicles.php"
Test-Path "C:\xampp\htdocs\rvcar-api\config.php"

# Ambos devem retornar: True
```

### Passo 3: Testar API no Navegador

```
1. Abra: http://localhost/rvcar-api/vehicles.php
2. Deve aparecer JSON com veículos
3. Se aparecer erro, anote a mensagem
```

### Passo 4: Verificar Banco de Dados

```
1. Abra: http://localhost/phpmyadmin
2. Procure banco: rvcar_db
3. Procure tabela: vehicles
4. Deve ter 8 registros
```

### Passo 5: Verificar Frontend

```
1. Abra: http://localhost:8080
2. Pressione F12
3. Vá em Console
4. Procure: "🔧 VehicleManager Config"
5. Verifique se USE_API: true
```

### Passo 6: Testar CRUD

```
1. Vá para: http://localhost:8080/admin
2. Login: admin / rvcar2024
3. Adicione um veículo teste
4. Abra nova guia anônima (Ctrl+Shift+N)
5. Acesse: http://localhost:8080
6. O veículo DEVE aparecer!
```

---

## 📊 Resultados Esperados

### ✅ Se tudo estiver OK:

- [ ] XAMPP: Apache e MySQL verdes
- [ ] API responde: http://localhost/rvcar-api/vehicles.php
- [ ] Console mostra: USE_API: true
- [ ] Network mostra: vehicles.php com status 200
- [ ] Guia anônima mostra mesmas alterações
- [ ] Celular (na mesma rede) mostra mesmas alterações

### ❌ Se NÃO funcionar:

Anote EXATAMENTE:

1. Qual passo falhou?
2. Qual mensagem de erro apareceu?
3. Tire print da aba Console (F12)
4. Tire print da aba Network (F12)

---

## 📱 Testar no Celular (Mesma Rede WiFi)

### Passo 1: Descubra seu IP

```powershell
ipconfig | Select-String "IPv4"
```

**Exemplo de resultado:**

```
IPv4 Address: 192.168.15.163
```

### Passo 2: No Celular

```
1. Conecte no MESMO WiFi do PC
2. Abra o navegador
3. Digite: http://192.168.15.163:8080
4. Faça alterações no admin
5. Recarregue no PC
6. Deve sincronizar!
```

---

## 🆘 Se Nada Funcionar

**Execute este comando e me envie o resultado:**

```powershell
# Teste completo da API
Invoke-WebRequest -Uri "http://localhost/rvcar-api/vehicles.php" -Method GET | Select-Object StatusCode, Content, Headers
```

**Verifique o arquivo .env.local:**

```powershell
Get-Content .env.local
```

**Verifique se a API está configurada corretamente:**

```powershell
Get-Content api\config.php | Select-String -Pattern "header|Access-Control" -Context 2,2
```

---

## 📝 Notas Importantes

1. **SEMPRE reinicie o `npm run dev` após alterar `.env.local`**
2. **SEMPRE verifique o Console (F12) do navegador**
3. **SEMPRE teste a API diretamente antes de testar pelo frontend**
4. **Guia anônima NÃO compartilha localStorage, por isso é perfeito para testar**

---

## 🎯 Como Deve Funcionar

```
┌─────────────┐
│   Browser   │
│ (Frontend)  │
└──────┬──────┘
       │ fetch()
       │ http://localhost/rvcar-api/vehicles.php
       │
┌──────▼──────┐
│   Apache    │
│   (XAMPP)   │
└──────┬──────┘
       │ SQL
       │
┌──────▼──────┐
│    MySQL    │
│  (rvcar_db) │
└─────────────┘
```

**Quando você adiciona um veículo:**

1. Frontend envia POST para API
2. API insere no MySQL
3. Qualquer dispositivo que buscar verá o novo veículo

**Quando você abre em outro dispositivo:**

1. Frontend faz GET na API
2. API busca do MySQL
3. Retorna os mesmos dados

---

## ✅ Checklist Final

Antes de me chamar, confirme:

- [ ] XAMPP está rodando (Apache + MySQL)
- [ ] API responde: `http://localhost/rvcar-api/vehicles.php`
- [ ] Banco instalado: `http://localhost/rvcar-api/install.php`
- [ ] `.env.local` existe e tem as variáveis corretas
- [ ] Reiniciou o `npm run dev` após criar `.env.local`
- [ ] Console (F12) mostra `USE_API: true`
- [ ] Aba Network mostra requisição para `vehicles.php`

Se TODOS os itens acima estão ✅, mas ainda não funciona:
**Me envie prints do Console e Network!**
