# 🚨 SOLUÇÃO: Site em Branco - Erro 404 nos Arquivos

## ❌ Problema Identificado

Analisando os prints:

### ✅ O QUE FUNCIONA:

- **API retorna JSON:** `http://bnutech.com.br/rvcar/api/vehicles.php` ✅
- **8 veículos no banco:** Dados corretos ✅

### ❌ O QUE NÃO FUNCIONA:

- **Arquivos CSS/JS retornam 404:**
  - `index-O3gN9mho.css1` → 404
  - `index-CBX8ARmR.js11` → 404
  - Outros arquivos → 404

### 🎯 CAUSA RAIZ:

Os arquivos foram enviados para a **pasta errada**!

**Estrutura ATUAL (ERRADA):**

```
public_html/
└── rvcar/              ← PASTA EXTRA!
    ├── index.html
    ├── api/
    └── assets/
```

**Estrutura ESPERADA (CORRETA):**

```
public_html/
├── index.html          ← DIRETO NA RAIZ!
├── api/
└── assets/
```

---

## ✅ SOLUÇÃO COMPLETA (5 minutos)

### PASSO 1: Acessar cPanel File Manager

```
URL: https://srv41.hinetworks.com.br:2083
```

### PASSO 2: Navegar até public_html/rvcar/

Você vai ver algo assim:

```
public_html/
└── rvcar/
    ├── index.html
    ├── 404.html
    ├── assets/
    ├── api/
    ├── .htaccess
    └── outros arquivos...
```

### PASSO 3: MOVER todos os arquivos para a raiz

**Opção A: Mover um por um (MAIS SEGURO)**

1. Dentro de `public_html/rvcar/`
2. Selecione TODOS os arquivos (Ctrl+A ou Select All)
3. Clique **Move** (Mover)
4. No campo "Destination", apague `/rvcar` deixando apenas:
   ```
   /public_html/
   ```
5. Clique **Move File(s)**

**Opção B: Via linha de comando (se tiver SSH)**

```bash
cd ~/public_html/
mv rvcar/* .
mv rvcar/.htaccess .
rmdir rvcar
```

### PASSO 4: Deletar a pasta vazia

Após mover todos os arquivos:

1. Delete a pasta `rvcar/` (agora vazia)
2. Clique com botão direito → Delete

### PASSO 5: Verificar estrutura final

```
public_html/
├── index.html          ✅
├── 404.html            ✅
├── .htaccess           ✅
├── robots.txt          ✅
├── favicon.ico         ✅
├── placeholder.svg     ✅
├── api/                ✅
│   ├── config.php
│   └── vehicles.php
└── assets/             ✅
    ├── index-O3gN9mho.css
    ├── index-CBX8ARmR.js
    └── outros arquivos...
```

### PASSO 6: Testar

Acesse:

```
https://bnutech.com.br
```

**Deve funcionar!** ✅

---

## 🔍 Como Identificamos o Problema

Nos prints vejo:

### Print 1 (Test API):

```
URL da API: http://bnutech.com.br/rvcar/api/vehicles.php
                                    ^^^^^
                                  PASTA EXTRA!
```

### Print 2 (Console do Navegador):

```
Failed to load resource: 404
- index-O3gN9mho.css1
- index-CBX8ARmR.js11
```

**Conclusão:** O `index.html` está carregando, mas os arquivos CSS/JS não são encontrados porque estão em `/rvcar/assets/` mas o HTML está procurando em `/assets/`.

---

## 🧪 Testes Após Mover os Arquivos

### Teste 1: Arquivos Estáticos

```
https://bnutech.com.br/assets/index-CBX8ARmR.js
```

**Deve:** Baixar o arquivo JavaScript ✅

### Teste 2: API

```
https://bnutech.com.br/api/vehicles.php
```

**Deve:** Retornar JSON com veículos ✅

### Teste 3: Site Completo

```
https://bnutech.com.br
```

**Deve:** Carregar site com veículos ✅

### Teste 4: Console (F12)

**Não deve ter:** Erros 404 ✅

---

## 🔧 Se Ainda Não Funcionar

### Problema 1: Erro de Permissões

**Sintoma:** Erro 403 Forbidden

**Solução:**

1. Selecione todos os arquivos em `public_html/`
2. Clique com botão direito → **Change Permissions**
3. Arquivos: `644` (rw-r--r--)
4. Pastas: `755` (rwxr-xr-x)

### Problema 2: .htaccess não foi movido

**Sintoma:** Erro ao acessar rotas do site

**Solução:**

1. Verifique se `.htaccess` está em `public_html/` (raiz)
2. Se estiver em `public_html/rvcar/.htaccess`:
   - Mova para `public_html/.htaccess`
3. Arquivos começando com `.` são ocultos
   - No File Manager, clique em **Settings** (engrenagem)
   - Marque **Show Hidden Files (dotfiles)**

### Problema 3: config.php ainda na pasta errada

**Solução:**

1. Verifique: `public_html/api/config.php` existe?
2. Se estiver em `public_html/rvcar/api/config.php`:
   - Mova para `public_html/api/config.php`

---

## 📋 Checklist Final

Após mover os arquivos:

**Arquivos na raiz do public_html:**

- [ ] `index.html`
- [ ] `404.html`
- [ ] `.htaccess` (arquivo oculto)
- [ ] `robots.txt`
- [ ] `favicon.ico`
- [ ] `placeholder.svg`

**Pastas na raiz do public_html:**

- [ ] `assets/` (com arquivos .js e .css)
- [ ] `api/` (com config.php e vehicles.php)

**Testes:**

- [ ] API funciona: `/api/vehicles.php` retorna JSON
- [ ] Site carrega: `https://bnutech.com.br`
- [ ] Sem erros 404 no Console (F12)
- [ ] Veículos aparecem na página
- [ ] Pasta `rvcar/` foi deletada

**Segurança:**

- [ ] Deletar pasta `/install/` (se existir)
- [ ] Trocar senha do admin

---

## 💡 Como Isso Aconteceu?

Quando você fez upload do ZIP `rvcar-installer.zip`:

1. Você estava dentro de `public_html/`
2. Extraiu o ZIP
3. O ZIP criou uma pasta `rvcar/` com todo o conteúdo dentro

**O correto seria:**

1. Extrair o ZIP
2. Entrar na pasta `rvcar/`
3. Mover tudo para fora (para a raiz)

OU

1. Antes de extrair, entrar no ZIP
2. Selecionar o conteúdo (não a pasta)
3. Extrair só o conteúdo

---

## 🎯 Resumo Visual

### ANTES (ERRADO):

```
https://bnutech.com.br/            → index.html vazio
https://bnutech.com.br/rvcar/      → site funciona AQUI
https://bnutech.com.br/assets/     → 404 (não existe)
https://bnutech.com.br/rvcar/assets/ → arquivos estão AQUI
```

### DEPOIS (CORRETO):

```
https://bnutech.com.br/            → site funciona ✅
https://bnutech.com.br/assets/     → arquivos JS/CSS ✅
https://bnutech.com.br/api/        → API funciona ✅
```

---

## 📞 Próximos Passos

1. **Mover arquivos da pasta `/rvcar/` para `/public_html/`**
2. **Deletar pasta `/rvcar/` vazia**
3. **Testar site:** `https://bnutech.com.br`
4. **Se funcionar:** Deletar `/install/` e trocar senha admin
5. **Me avisar:** "Funcionou! Site carregando!"

---

**Criado:** 19/10/2025 01:00  
**Prioridade:** 🔴 CRÍTICA  
**Tempo estimado:** 5 minutos  
**Dificuldade:** Fácil (só mover arquivos)
