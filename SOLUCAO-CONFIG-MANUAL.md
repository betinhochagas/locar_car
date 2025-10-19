# 🔧 Solução: Criar config.php Manualmente

## ❌ Problema

O instalador não criou o arquivo `api/config.php` corretamente, causando erro "Failed to fetch" na API.

## ✅ Solução Rápida

### Opção 1: Via cPanel File Manager (MAIS FÁCIL)

1. **Acesse o File Manager do cPanel**

   - Login: https://srv41.hinetworks.com.br:2083

2. **Navegue até a pasta `/api/`**

   - Abra `public_html/api/`

3. **Crie novo arquivo**

   - Clique em **"+ File"** (Novo Arquivo)
   - Nome: `config.php`

4. **Edite o arquivo e cole este código:**

```php
<?php
/**
 * RV Car Solutions - Configuração do Banco de Dados
 */

// Configurações do Banco de Dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'bnutechc_rvcar');
define('DB_USER', 'bnutechc_rvcar');
define('DB_PASS', 'SUA_SENHA_DO_BANCO_AQUI');  // <<< ALTERE AQUI!
define('DB_CHARSET', 'utf8mb4');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Função de conexão PDO
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Erro de conexão: " . $e->getMessage());
        http_response_code(500);
        die(json_encode(['error' => 'Erro ao conectar ao banco de dados']));
    }
}

// Headers CORS
function setCorsHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';

    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}
?>
```

5. **IMPORTANTE: Altere a senha**

   - Na linha `define('DB_PASS', 'SUA_SENHA_DO_BANCO_AQUI');`
   - Coloque a **mesma senha** que você usou no instalador

6. **Salve o arquivo** (Save Changes)

7. **Teste a API**
   - Acesse: `https://bnutech.com.br/api/vehicles.php`
   - Deve retornar JSON com os veículos

---

### Opção 2: Verificar se o instalador criou o arquivo

1. **No File Manager, verifique:**

   - Pasta: `public_html/api/`
   - Arquivo: `config.php` existe?

2. **Se existir, edite e verifique:**
   - A senha está correta?
   - As credenciais do banco estão certas?
   - Formato está correto (sem erros de sintaxe)?

---

## 🧪 Como Testar se Funcionou

### 1. Teste Direto da API

```bash
# Acesse no navegador:
https://bnutech.com.br/api/vehicles.php
```

**Resultado esperado:**

```json
[
  {
    "id": "veh_...",
    "name": "Fiat Mobi 2019",
    "price": "44.900",
    "image": "/placeholder.svg",
    "features": ["Ar Condicionado", "Direção Elétrica"],
    "available": true
  }
]
```

### 2. Teste a Página do Site

```bash
# Acesse:
https://bnutech.com.br
```

**Resultado esperado:**

- Site carrega normalmente
- Seção de veículos aparece
- Não fica em branco

---

## 🔍 Verificação de Segurança

Após criar o `config.php`:

### 1. Verificar permissões

```bash
Permissão recomendada: 0644 ou 0640
- Owner: Read/Write
- Group: Read
- Public: Nenhuma
```

### 2. Proteger o arquivo

O `.htaccess` já está configurado para bloquear acesso direto ao `config.php`:

```apache
<Files "config.php">
    Order allow,deny
    Deny from all
</Files>
```

Teste: `https://bnutech.com.br/api/config.php` deve retornar **403 Forbidden** ✅

---

## 📋 Checklist de Verificação

- [ ] Arquivo `api/config.php` criado
- [ ] Credenciais do banco corretas
- [ ] Senha alterada (não está mais "SUA_SENHA_AQUI")
- [ ] API retorna JSON ao acessar `/api/vehicles.php`
- [ ] Site carrega normalmente
- [ ] Veículos aparecem na página
- [ ] Acesso direto ao config.php bloqueado (403)
- [ ] **DELETAR a pasta `/install/`** (SEGURANÇA!)

---

## ❓ Se Ainda Não Funcionar

### Cenário 1: API retorna erro 500

**Causa:** Senha do banco incorreta

**Solução:**

1. Verifique a senha no cPanel → MySQL Databases
2. Se necessário, recrie a senha do usuário
3. Atualize no `config.php`

### Cenário 2: API retorna erro de conexão

**Causa:** Banco de dados não existe

**Solução:**

1. Acesse cPanel → MySQL Databases
2. Verifique se o banco `bnutechc_rvcar` existe
3. Se não existir, volte ao instalador e refaça a Etapa 3

### Cenário 3: Site ainda fica em branco

**Causa:** Erro de JavaScript/CORS

**Solução:**

1. Abra o Console do navegador (F12)
2. Vá em "Console"
3. Veja quais erros aparecem
4. Compartilhe os erros para diagnóstico

---

## 📞 Próximos Passos Após Resolver

1. ✅ Deletar pasta `/install/` (SEGURANÇA!)
2. ✅ Acessar admin: `https://bnutech.com.br/admin`
3. ✅ Login: `admin` / `rvcar2024`
4. ✅ **TROCAR A SENHA PADRÃO!**
5. ✅ Testar adicionar/editar veículos
6. ✅ Testar formulário de contato
7. ✅ Testar botão WhatsApp

---

## 🎯 Resumo Visual

```
ESTRUTURA ESPERADA:
public_html/
├── index.html              ← Existe ✅
├── assets/                 ← Existe ✅
├── api/
│   ├── vehicles.php        ← Existe ✅
│   └── config.php          ← FALTA! ❌ (criar manualmente)
└── install/                ← Deletar depois ⚠️
```

**Arquivo crítico faltando:** `api/config.php`

**Solução:** Criar manualmente seguindo as instruções acima!

---

## 📚 Documentação Relacionada

- `INSTALADOR-WEB-COMPLETO.md` - Guia técnico do instalador
- `COMO-USAR-INSTALADOR.md` - Passo a passo de uso
- `CORRECAO-BOTAO-CONTINUAR.md` - Correção do bug anterior

---

**Criado em:** 19/10/2025  
**Versão do Instalador:** v1.0.0  
**Status:** CRÍTICO - Resolver antes de usar o sistema
