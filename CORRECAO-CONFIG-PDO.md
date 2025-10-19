# 🔧 Correção Urgente: config.php usa MySQLi mas API precisa de PDO

## ❌ Problema Identificado

O instalador criou o arquivo `api/config.php` usando **MySQLi**, mas o arquivo `vehicles.php` foi programado para usar **PDO**.

**Erro resultante:**

```
Failed to fetch
TypeError: getDBConnection is not defined
```

**Causa raiz:**

- Config criado pelo instalador: `getConnection()` → MySQLi
- API espera: `getDBConnection()` → PDO

---

## ✅ Solução Rápida (2 minutos)

### Via cPanel File Manager:

1. **Acesse:** https://srv41.hinetworks.com.br:2083

2. **Navegue:** `public_html/api/`

3. **Edite o arquivo:** `config.php`

4. **SUBSTITUA TODO O CONTEÚDO** por este código:

```php
<?php
/**
 * RV Car Solutions - Configuração do Banco de Dados
 * Versão CORRIGIDA para Produção (usa PDO)
 */

// Configurações de Produção
define('DB_HOST', 'localhost');
define('DB_NAME', 'bnutechc_rvcar');
define('DB_USER', 'bnutechc_rvcar');
define('DB_PASS', 'R.chagas1988');
define('DB_CHARSET', 'utf8mb4');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

/**
 * Função para conectar ao banco de dados usando PDO
 */
function getDBConnection()
{
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Erro de conexão: " . $e->getMessage());
        http_response_code(500);
        die(json_encode(['error' => 'Erro ao conectar ao banco de dados']));
    }
}

/**
 * Função para enviar resposta JSON
 */
function sendResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

/**
 * Função para enviar erro JSON
 */
function sendError($message, $statusCode = 400)
{
    http_response_code($statusCode);
    echo json_encode([
        'error' => true,
        'message' => $message
    ], JSON_UNESCAPED_UNICODE);
    exit();
}
?>
```

5. **Salve o arquivo** (Save Changes)

6. **Limpe o cache do navegador:** Ctrl + Shift + R

7. **Teste a API:**
   ```
   https://bnutech.com.br/api/vehicles.php
   ```

---

## 🧪 Como Verificar se Funcionou

### 1. Teste Direto da API

Acesse: `https://bnutech.com.br/api/vehicles.php`

**Resultado esperado:**

```json
[
  {
    "id": "veh_671330a42a6ec9.71626827",
    "name": "Fiat Mobi 2019",
    "price": "44.900",
    "image": "/placeholder.svg",
    "features": ["Ar Condicionado", "Direção Elétrica", "Vidros Elétricos"],
    "available": true,
    "created_at": "2025-10-19 00:11:08",
    "updated_at": "2025-10-19 00:11:08"
  },
  ...outros 7 veículos...
]
```

### 2. Teste o Site

Acesse: `https://bnutech.com.br`

**Resultado esperado:**

- ✅ Site carrega normalmente
- ✅ Seção "Nossos Veículos" aparece
- ✅ 8 veículos são exibidos
- ✅ Não fica em branco

### 3. Teste o Console (F12)

Abra o Console do navegador:

**ANTES (com erro):**

```
Failed to fetch
TypeError: ...
CORS error
```

**DEPOIS (funcionando):**

```
✅ Veículos carregados: 8
✅ Sem erros
```

---

## 📊 Comparação Técnica

### ❌ Código ERRADO (MySQLi - criado pelo instalador)

```php
function getConnection() {
    static $conn = null;

    if ($conn === null) {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        // ...
    }
    return $conn;  // Retorna MySQLi
}
```

### ✅ Código CORRETO (PDO - esperado pela API)

```php
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;  // Retorna PDO
    } catch (PDOException $e) {
        // ...
    }
}
```

---

## 🔍 Por que isso aconteceu?

O instalador foi programado com uma versão do `config.php` usando MySQLi, mas o código da API (`vehicles.php`) evoluiu para usar PDO.

**Diferenças principais:**

| Aspecto                 | MySQLi                     | PDO                             |
| ----------------------- | -------------------------- | ------------------------------- |
| **Bancos suportados**   | Apenas MySQL               | MySQL, PostgreSQL, SQLite, etc. |
| **Sintaxe**             | `$conn->query()`           | `$pdo->prepare()`               |
| **Prepared Statements** | Suporta                    | Suporta (melhor sintaxe)        |
| **Portabilidade**       | ❌ Baixa                   | ✅ Alta                         |
| **Usado no projeto**    | Instalador (desatualizado) | API (atual)                     |

---

## 🛠️ Correção no Instalador (para próxima versão)

O arquivo `install/index.php` precisa ser atualizado na linha ~230 para gerar config.php com PDO:

```php
// CÓDIGO A SER CORRIGIDO NO INSTALADOR:
$configContent = "<?php
// ...
function getDBConnection() {  // ← Corrigir nome da função
    try {
        \$dsn = \"mysql:host=\" . DB_HOST . \";dbname=\" . DB_NAME;
        \$pdo = new PDO(\$dsn, DB_USER, DB_PASS, \$options);
        return \$pdo;  // ← Usar PDO ao invés de MySQLi
    } catch (PDOException \$e) {
        // ...
    }
}
";
```

**Mas por enquanto, use a solução manual acima!**

---

## 📋 Checklist Final

- [ ] Editar `api/config.php` no servidor
- [ ] Substituir todo conteúdo pelo código PDO
- [ ] Verificar que a senha está correta (`R.chagas1988`)
- [ ] Salvar arquivo
- [ ] Limpar cache do navegador (Ctrl+Shift+R)
- [ ] Testar API: `/api/vehicles.php` retorna JSON
- [ ] Testar site: carrega com veículos
- [ ] **DELETAR pasta `/install/`** (segurança!)
- [ ] Acessar admin e trocar senha padrão

---

## 🎯 Arquivos de Referência

Criei o arquivo correto aqui:

- **Local:** `d:\website\rv-car-solutions-main\api\config-producao.php`
- **GitHub:** Será commitado para referência futura

**Use este arquivo como base** para substituir no servidor!

---

## 📞 Se Ainda Não Funcionar

### Cenário 1: Erro de sintaxe PHP

**Solução:** Verifique se copiou o código completo, incluindo `<?php` no início

### Cenário 2: Ainda retorna "Failed to fetch"

**Solução:**

1. Limpe cache do navegador (Ctrl+Shift+F5)
2. Teste API diretamente: `/api/vehicles.php`
3. Verifique Console (F12) para ver erro específico

### Cenário 3: Erro de conexão com banco

**Solução:**

1. Verifique senha: `R.chagas1988` (case-sensitive!)
2. Teste credenciais no phpMyAdmin do cPanel
3. Confirme que o banco `bnutechc_rvcar` existe

---

## 🎉 Resultado Final Esperado

Após a correção:

```
✅ API funcionando: https://bnutech.com.br/api/vehicles.php
✅ Site carregando: https://bnutech.com.br
✅ 8 veículos visíveis
✅ Sem erros no Console
✅ WhatsApp funcionando
✅ Formulário de contato funcionando
✅ Admin acessível: /admin
```

---

**Criado em:** 19/10/2025 00:30  
**Prioridade:** 🔴 CRÍTICA  
**Tempo estimado:** 2 minutos  
**Status:** Aguardando aplicação pelo usuário
