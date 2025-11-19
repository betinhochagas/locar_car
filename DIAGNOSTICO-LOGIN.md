# 🔍 DIAGNÓSTICO E CORREÇÃO DO LOGIN

## 🎯 PROBLEMA ATUAL

**Erro 401 (Unauthorized)** ao tentar fazer login.

Isso significa que:

- ✅ O `auth.php` está funcionando (não é mais 500)
- ❌ Mas a autenticação está falhando

**Possíveis causas:**

1. Tabelas não foram criadas corretamente
2. Usuário `admin` não existe no banco
3. Senha está diferente do esperado

---

## 🚀 SOLUÇÃO: SCRIPT DE DIAGNÓSTICO

Criei um script que vai:

1. ✅ Testar conexão com banco
2. ✅ Verificar se tabelas existem
3. ✅ Listar usuários cadastrados
4. ✅ **Criar/atualizar usuário admin**
5. ✅ Testar autenticação

---

## 📋 PASSO A PASSO

### **Passo 1: Upload do Script**

1. **Copie o arquivo:**

   ```
   D:\website\rv-car-solutions-main\deploy-rvcar\api\diagnostico.php
   ```

2. **Upload no cPanel:**
   - https://srv41.hinetworks.com.br:2083
   - File Manager → `public_html/rvcar/api/`
   - Upload do arquivo `diagnostico.php`

---

### **Passo 2: Executar o Script**

**Acesse no navegador:**

```
https://bnutech.com.br/rvcar/api/diagnostico.php
```

O script vai mostrar:

#### ✅ 1. Conexão com Banco

- Se conectou com sucesso
- Host e database

#### ✅ 2. Verificação de Tabelas

- ✓ vehicles existe
- ✓ admins existe
- ✓ admin_tokens existe

Se alguma tabela não existir, você precisa rodar o instalador!

#### ✅ 3. Usuários Cadastrados

Mostra tabela com todos os usuários:

- ID, Username, Nome, Data

#### ✅ 4. Criar/Atualizar Admin

O script automaticamente:

- Cria o usuário `admin` se não existir
- OU atualiza a senha se já existir
- Senha: `rvcar2024`

#### ✅ 5. Teste de Autenticação

Testa se o login vai funcionar

---

### **Passo 3: Testar Login**

Após rodar o script:

1. **Acesse:**

   ```
   https://bnutech.com.br/rvcar/admin/login
   ```

2. **Credenciais:**

   - Usuário: `admin`
   - Senha: `rvcar2024`

3. **Resultado esperado:**
   - ✅ Login funciona
   - ✅ Dashboard aparece

---

### **Passo 4: DELETAR o Script**

**IMPORTANTE:** Por segurança, delete o arquivo:

```
/rvcar/api/diagnostico.php
```

Este script mostra informações sensíveis do banco!

---

## 🔧 CENÁRIOS POSSÍVEIS

### **Cenário 1: Tabelas não existem**

**O script vai mostrar:**

```
❌ Tabela admins NÃO existe
❌ Tabela admin_tokens NÃO existe
```

**Solução:**

1. Rodar o instalador: https://bnutech.com.br/rvcar/install/
2. Depois rodar o diagnóstico novamente

---

### **Cenário 2: Tabelas existem, mas sem usuário**

**O script vai mostrar:**

```
⚠️ Nenhum usuário encontrado no banco!
✓ Usuário admin foi CRIADO com sucesso!
```

**Resultado:**

- ✅ Script cria o usuário automaticamente
- ✅ Login deve funcionar

---

### **Cenário 3: Usuário existe, mas senha errada**

**O script vai mostrar:**

```
✓ Usuário admin já existia
✓ Senha foi ATUALIZADA para: rvcar2024
```

**Resultado:**

- ✅ Senha corrigida
- ✅ Login deve funcionar

---

## 📊 O QUE O SCRIPT FAZ

### **No Banco de Dados:**

```sql
-- Se usuário NÃO existe:
INSERT INTO admins (username, password, name)
VALUES ('admin', '$2y$10$...', 'Administrador');

-- Se usuário JÁ existe:
UPDATE admins
SET password = '$2y$10$...'
WHERE username = 'admin';
```

A senha é **hashada com bcrypt** (segurança).

---

## ✅ CHECKLIST

Após rodar o script:

- [ ] Script executou sem erros
- [ ] Mostrou "✓ Conectado com sucesso"
- [ ] Todas as 3 tabelas existem
- [ ] Usuário admin foi criado/atualizado
- [ ] Teste de autenticação passou
- [ ] Tentou fazer login no painel
- [ ] Login funcionou ✅
- [ ] **Deletou** o arquivo `diagnostico.php`

---

## 🚨 SE AINDA NÃO FUNCIONAR

### **1. Verifique o Console (F12)**

Procure por erros diferentes de 401.

### **2. Teste a API diretamente**

Acesse:

```
https://bnutech.com.br/rvcar/api/vehicles.php
```

Deve retornar JSON com veículos.

### **3. Verifique Error Log**

cPanel → Error Log

Procure por erros recentes.

---

## 📝 INFORMAÇÕES TÉCNICAS

### **Hash da Senha:**

O script usa `password_hash()` do PHP:

```php
$hash = password_hash('rvcar2024', PASSWORD_DEFAULT);
// Resultado: $2y$10$randomstring...
```

### **Verificação:**

O `auth.php` usa `password_verify()`:

```php
if (password_verify('rvcar2024', $hash)) {
    // Login OK
}
```

---

## 🎯 RESUMO

**Problema:** Login retorna 401 (não autorizado)  
**Causa:** Usuário não existe ou senha incorreta  
**Solução:** Script de diagnóstico que cria/corrige o usuário

**Tempo:** ⚡ 2 minutos  
**Confiança:** 🟢 ALTA (script cria usuário automaticamente)

---

## 📞 PRÓXIMO PASSO

1. **Faça upload** de `diagnostico.php` para `/rvcar/api/`
2. **Acesse** https://bnutech.com.br/rvcar/api/diagnostico.php
3. **Leia** os resultados
4. **Teste** o login
5. **Delete** o arquivo de diagnóstico

---

**O script vai criar o usuário automaticamente e corrigir qualquer problema!** 🚀
