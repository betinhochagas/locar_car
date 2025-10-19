# 🔧 Solução: Site tentando usar porta 3000 em produção

## ❌ Problema Identificado

O site está tentando acessar:

```
http://bnutech.com.br:3000/api/vehicles.php
```

Mas deveria acessar:

```
https://bnutech.com.br/api/vehicles.php
```

**Causa:** Cache do navegador com versão antiga do código JavaScript

---

## ✅ Solução 1: Limpar Cache do Navegador (TENTE PRIMEIRO)

### Windows/Linux:

1. Abra o site: `https://bnutech.com.br`
2. Pressione: **Ctrl + Shift + Delete**
3. Selecione:
   - ✅ Cache de imagens e arquivos
   - ✅ Cookies e dados de sites
   - Período: **Última hora** ou **Tudo**
4. Clique: **Limpar dados**
5. Feche o navegador COMPLETAMENTE
6. Abra novamente e acesse o site

### Ou use HARD RELOAD:

```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

---

## ✅ Solução 2: Verificar Arquivos no Servidor

### A. Verifique se enviou os arquivos CORRETOS

1. **Acesse cPanel → File Manager**

2. **Verifique a pasta `assets/`:**

   ```
   public_html/assets/
   ```

   - Deve ter arquivos .js com nomes tipo: `index-abc123.js`
   - Data: 19/10/2025 (hoje)

3. **Se os arquivos são antigos:**
   - DELETE toda a pasta `assets/`
   - DELETE o arquivo `index.html`
   - Faça upload novamente do conteúdo da pasta `dist/`

---

## ✅ Solução 3: Forçar Atualização com .htaccess

Adicione no `.htaccess` (no início do arquivo):

```apache
# Forçar cache busting para JS/CSS
<FilesMatch "\.(js|css)$">
    Header set Cache-Control "no-cache, must-revalidate, max-age=0"
    Header set Pragma "no-cache"
    Header set Expires "0"
</FilesMatch>
```

**Como fazer:**

1. cPanel → File Manager
2. Edite: `public_html/.htaccess`
3. Cole as linhas ACIMA no topo do arquivo
4. Salve
5. Limpe cache e teste

---

## ✅ Solução 4: Rebuild e Upload Novamente

Se nada funcionar, vamos refazer o build:

### No seu computador:

```powershell
# Navegar para a pasta do projeto
cd D:\website\rv-car-solutions-main

# Limpar build antigo
Remove-Item -Recurse -Force dist

# Fazer novo build
npm run build

# Verificar se gerou corretamente
ls dist/assets/*.js
```

### Depois:

1. **Delete no servidor:**

   - `public_html/assets/` (pasta inteira)
   - `public_html/index.html`
   - `public_html/404.html`

2. **Faça upload da pasta `dist/`:**
   - Entre na pasta `dist/` local
   - Selecione TUDO
   - Upload para `public_html/`

---

## 🔍 Como Verificar se Está Usando a URL Correta

### Método 1: Console do Navegador

1. Pressione **F12**
2. Vá na aba **Console**
3. Procure por:
   ```
   VehicleManager - API URL: /api/vehicles.php
   ```

**Se aparecer:**

- ✅ `/api/vehicles.php` → CORRETO!
- ❌ `http://....:3000/api/vehicles.php` → Ainda em cache!

### Método 2: Network Tab

1. Pressione **F12**
2. Vá na aba **Network** (Rede)
3. Recarregue a página (F5)
4. Procure por requisição `vehicles.php`
5. Veja a URL completa

**Deve ser:**

```
https://bnutech.com.br/api/vehicles.php
```

---

## 🎯 Checklist de Verificação

- [ ] Limpou cache do navegador (Ctrl+Shift+Delete)
- [ ] Fez hard reload (Ctrl+Shift+R)
- [ ] Fechou e abriu o navegador novamente
- [ ] Verificou arquivos no servidor (data de hoje?)
- [ ] Console mostra URL correta (/api/vehicles.php)
- [ ] Network mostra requisição sem porta 3000
- [ ] Editou config.php com código PDO
- [ ] API retorna JSON ao acessar diretamente

---

## 🧪 Teste Rápido

### 1. Teste a API diretamente:

```
https://bnutech.com.br/api/vehicles.php
```

**Deve retornar JSON:**

```json
[{"id":"veh_...","name":"Fiat Mobi 2019",...}]
```

### 2. Se a API funciona mas o site não:

→ É problema de **cache do navegador**

### 3. Se a API NÃO funciona:

→ É problema do **config.php** (volte na correção PDO)

---

## 💡 Por Que Isso Acontece?

O código TypeScript tem esta lógica:

```typescript
// Em PRODUÇÃO
if (import.meta.env.PROD) {
  return "/api/vehicles.php"; // ← URL relativa (CORRETO)
}

// Em DESENVOLVIMENTO
return `http://${hostname}:3000/api/vehicles.php`; // ← Com porta 3000
```

Quando você faz `npm run build`, o Vite compila e:

- Remove o código de desenvolvimento
- Usa apenas a versão de produção
- Gera arquivos minificados

**MAS:** Se você acessou o site antes com versão antiga, o navegador guardou em cache.

---

## 🔥 Solução Definitiva (Se Nada Funcionar)

### Opção A: Modo Anônimo

1. Abra uma **janela anônima** (Ctrl+Shift+N no Chrome)
2. Acesse: `https://bnutech.com.br`
3. Se funcionar → É cache! Use as soluções acima

### Opção B: Outro Navegador

1. Abra outro navegador (Chrome, Firefox, Edge)
2. Acesse: `https://bnutech.com.br`
3. Se funcionar → Limpe cache do navegador original

### Opção C: Outro Dispositivo

1. Acesse do celular (usando dados móveis, não WiFi)
2. Se funcionar → É cache local do computador

---

## 📊 Diagnóstico Rápido

| Situação                  | Causa                 | Solução                      |
| ------------------------- | --------------------- | ---------------------------- |
| API retorna JSON          | ✅ Backend OK         | Limpar cache navegador       |
| API retorna erro 500      | ❌ config.php errado  | Aplicar correção PDO         |
| API retorna 404           | ❌ Arquivo não existe | Verificar upload de arquivos |
| Site usa porta 3000       | ❌ Cache do navegador | Hard reload (Ctrl+Shift+R)   |
| Console mostra erros CORS | ❌ .htaccess errado   | Verificar configuração       |

---

## 🎬 Passo a Passo Completo (Do Zero)

### 1. Verificar Backend

```bash
# Teste direto no navegador:
https://bnutech.com.br/api/vehicles.php

# Deve retornar JSON
# Se não retornar → Corrija config.php (SOLUCAO-RAPIDA-PDO.md)
```

### 2. Limpar Cache

```
Ctrl + Shift + Delete
→ Limpar cache e cookies
→ Fechar navegador
→ Abrir novamente
```

### 3. Testar Site

```bash
# Abra:
https://bnutech.com.br

# Pressione F12 → Console
# Deve aparecer:
VehicleManager - API URL: /api/vehicles.php
Environment: production

# Se aparecer porta 3000 → Ainda em cache, repita limpeza
```

### 4. Forçar Atualização

```
Ctrl + Shift + R (várias vezes)
```

### 5. Verificar Network

```
F12 → Network → Recarregar
→ Procurar: vehicles.php
→ URL deve ser: https://bnutech.com.br/api/vehicles.php
```

---

## 📞 Me Avise

✅ **Funcionou:** "Site carregando após limpar cache!"  
⚠️ **Modo anônimo funciona:** "Funciona no anônimo, não funciona no normal"  
❌ **API retorna erro:** "API dá erro 500" (me envie o erro)  
🔍 **Ainda usa porta 3000:** "Limpei cache mas ainda aparece :3000"

---

**Criado:** 19/10/2025  
**Prioridade:** 🔴 Alta  
**Causa mais provável:** Cache do navegador  
**Solução mais rápida:** Ctrl+Shift+R
