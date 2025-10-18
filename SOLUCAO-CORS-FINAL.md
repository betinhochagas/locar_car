# 🔴 PROBLEMA: CORS Bloqueando + Nenhum Veículo Aparece

## ❌ Erros Vistos no Console

```
Access to fetch at 'http://localhost/rvcar-api/vehicles.php' from origin 'http://localhost:8080'
has been blocked by CORS policy: Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.

Failed to load resource: net::ERR_FAILED
TypeError: Failed to fetch
```

---

## ✅ SOLUÇÃO APLICADA

### 1. **vehicles.php** - Headers CORS no Topo

```php
<?php
// CORS DEVE SER A PRIMEIRA COISA
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

// OPTIONS retorna imediatamente
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// ... resto do código
```

### 2. **.htaccess** - Forçar Headers no Apache

```apache
<IfModule mod_headers.c>
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    Header always set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
    Header always set Access-Control-Allow-Credentials "true"
    Header always set Access-Control-Max-Age "86400"
</IfModule>

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_METHOD} OPTIONS
    RewriteRule ^(.*)$ $1 [R=200,L]
</IfModule>
```

### 3. **vehicleManager.ts** - Sem localStorage

```typescript
// APENAS API - sem fallback
const fetchAPI = async (
  endpoint: string = "",
  options: RequestInit = {}
): Promise<any> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    mode: "cors",
    credentials: "omit",
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};
```

---

## 🔧 PASSOS OBRIGATÓRIOS PARA FUNCIONAR

### ✅ 1. Reinicie o Apache

```
XAMPP Control Panel
├── Apache → Stop
├── Aguarde 3 segundos
└── Apache → Start
```

### ✅ 2. Limpe o Cache do Navegador

```
Ctrl + Shift + Delete
✓ Cache de imagens e arquivos
✓ Cookies e outros dados
```

### ✅ 3. Recarregue com Ctrl+F5

```
Ctrl + F5 (recarregamento forçado)
ou
Ctrl + Shift + R
```

### ✅ 4. Verifique o Console (F12)

**Deve aparecer:**

```
VehicleManager - API URL: http://localhost/rvcar-api/vehicles.php
🌐 Requisição: GET http://localhost/rvcar-api/vehicles.php
📡 Resposta: 200
```

**NÃO deve aparecer:**

```
❌ Access to fetch... blocked by CORS
❌ Failed to fetch
❌ net::ERR_FAILED
```

---

## 🧪 Testes de Validação

### Teste 1: Curl no Terminal

```powershell
# Testar GET
curl http://localhost/rvcar-api/vehicles.php

# Deve retornar JSON com veículos
```

### Teste 2: Curl OPTIONS (Preflight)

```powershell
curl -i -X OPTIONS -H "Origin: http://localhost:8080" http://localhost/rvcar-api/vehicles.php

# Deve retornar 200 com headers Access-Control
```

### Teste 3: Navegador - Listar Veículos

1. Acesse http://localhost:8080
2. Deve carregar 8 veículos padrão
3. Console não deve mostrar erros

### Teste 4: Admin - Adicionar Veículo

1. Acesse http://localhost:8080/admin
2. Login: admin / rvcar2024
3. Clique em "Adicionar Veículo"
4. Preencha os dados
5. Salve
6. **Deve adicionar sem erros**

### Teste 5: Sincronização - Guia Anônima

1. Adicione um veículo no admin
2. Abra guia anônima (Ctrl+Shift+N)
3. Acesse http://localhost:8080
4. **Veículo DEVE aparecer**

---

## 📊 Arquivos Modificados

```
✅ api/vehicles.php    - CORS headers no topo
✅ api/.htaccess       - Headers always + RewriteRule OPTIONS
✅ src/lib/vehicleManager.ts - Sem localStorage
```

---

## 🔍 Diagnóstico de Problemas

### Se ainda der erro CORS:

**1. Verifique mod_headers no Apache:**

```
C:\xampp\apache\conf\httpd.conf
```

Procure por:

```apache
LoadModule headers_module modules/mod_headers.so
```

Se tiver `#` na frente, remova o `#` e reinicie o Apache.

**2. Verifique mod_rewrite no Apache:**

```apache
LoadModule rewrite_module modules/mod_rewrite.so
```

Se tiver `#` na frente, remova o `#` e reinicie o Apache.

**3. Veja os logs do Apache:**

```powershell
Get-Content "C:\xampp\apache\logs\error.log" -Tail 20
```

**4. Teste API diretamente no navegador:**

```
http://localhost/rvcar-api/vehicles.php
```

Deve retornar JSON

---

## 🆘 Se NADA Funcionar

### Solução Alternativa: Proxy no Vite

Edite `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      "/rvcar-api": {
        target: "http://localhost",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/rvcar-api/, "/rvcar-api"),
      },
    },
  },
});
```

Edite `.env.local`:

```bash
VITE_API_URL=/rvcar-api/vehicles.php
```

Reinicie o `npm run dev`

---

## ✅ Checklist Final

Antes de testar, confirme:

- [ ] Apache REINICIADO no XAMPP
- [ ] MySQL rodando no XAMPP
- [ ] Arquivos copiados para `C:\xampp\htdocs\rvcar-api\`
- [ ] Cache do navegador LIMPO
- [ ] Página recarregada com Ctrl+F5
- [ ] Console aberto (F12) para ver logs
- [ ] mod_headers habilitado no Apache
- [ ] mod_rewrite habilitado no Apache

---

## 🎯 Resultado Esperado

```
Console (F12):
✅ VehicleManager - API URL: http://localhost/rvcar-api/vehicles.php
✅ 🌐 Requisição: GET ...
✅ 📡 Resposta: 200

Página:
✅ 8 veículos carregados
✅ Pode adicionar novos veículos
✅ Sincroniza entre dispositivos
```

---

## 📝 Notas Importantes

1. **CORS está configurado em 2 lugares:**

   - PHP (vehicles.php) - Envia headers programaticamente
   - Apache (.htaccess) - Força headers no servidor

2. **`always` é crucial no .htaccess:**

   ```apache
   Header always set ...  # ← SEMPRE envia o header
   ```

3. **OPTIONS deve retornar 200:**

   - Sem OPTIONS 200, navegador bloqueia a requisição principal
   - RewriteRule no .htaccess garante isso

4. **localStorage foi removido:**
   - Sem fallback
   - API é obrigatória
   - Dados persistem no MySQL

---

**Última atualização:** 18/10/2025 15:30  
**Status:** ✅ Correção aplicada - Aguardando teste após reiniciar Apache

---

## 🚀 Após Funcionar

Quando tudo estiver OK:

1. ✅ Teste no celular (mesma rede)
2. ✅ Verifique sincronização
3. ✅ Prepare para deploy em produção (cPanel)
4. ✅ Atualize credenciais do banco no `config.php` (produção)

---

**Precisa de ajuda? Me avise após:**

1. Reiniciar Apache
2. Limpar cache
3. Recarregar página
4. Ver Console (F12)
