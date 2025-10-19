# 🚨 SOLUÇÃO RÁPIDA: Site em Branco (PDO vs MySQLi)

## 📋 O QUE ACONTECEU

✅ **Banco de dados:** CRIADO  
✅ **Arquivos enviados:** CORRETO  
❌ **API não funciona:** Config.php usa MySQLi, mas API precisa PDO

---

## ⚡ SOLUÇÃO EM 3 PASSOS (2 minutos)

### PASSO 1: Acesse o cPanel
```
URL: https://srv41.hinetworks.com.br:2083
Usuário: seu_usuario
Senha: sua_senha
```

### PASSO 2: Edite o arquivo
1. Vá em **File Manager**
2. Navegue: `public_html/api/`
3. Encontre: `config.php`
4. Clique com botão direito → **Edit**

### PASSO 3: Substitua TODO o conteúdo

**APAGUE TUDO** e cole este código:

```php
<?php
/**
 * RV Car Solutions - Configuração do Banco de Dados
 * Versão CORRIGIDA (PDO)
 */

// Configurações do Banco de Dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'bnutechc_rvcar');
define('DB_USER', 'bnutechc_rvcar');
define('DB_PASS', 'R.chagas1988');
define('DB_CHARSET', 'utf8mb4');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

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

function sendResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

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

**IMPORTANTE:** 
- ✅ Senha já está correta: `R.chagas1988`
- ✅ Nome do banco: `bnutechc_rvcar`
- ✅ Usuário: `bnutechc_rvcar`

4. Clique **Save Changes** (Salvar Alterações)

---

## ✅ TESTE SE FUNCIONOU

### Teste 1: API
Abra no navegador:
```
https://bnutech.com.br/api/vehicles.php
```

**Deve mostrar:**
```json
[
  {
    "id": "veh_671330a42a6ec9.71626827",
    "name": "Fiat Mobi 2019",
    "price": "44.900",
    ...
  },
  ...
]
```

### Teste 2: Site
Abra:
```
https://bnutech.com.br
```

**Deve carregar:**
- ✅ Página inicial
- ✅ Seção "Nossos Veículos"
- ✅ 8 veículos aparecem
- ✅ Não fica em branco

---

## 🔥 SE AINDA NÃO FUNCIONAR

### Opção A: Limpar Cache
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### Opção B: Verificar Console
1. Pressione **F12**
2. Vá em **Console**
3. Recarregue a página
4. Veja se aparece erro
5. **Me envie o erro** se houver

### Opção C: Testar Credenciais
1. Acesse cPanel → **phpMyAdmin**
2. Tente logar com:
   - Usuário: `bnutechc_rvcar`
   - Senha: `R.chagas1988`
3. Se não conseguir, a senha está errada
4. Neste caso, **me avise** para ajustar

---

## 📊 ANTES vs DEPOIS

| ANTES (MySQLi - ERRADO) | DEPOIS (PDO - CORRETO) |
|-------------------------|------------------------|
| `function getConnection()` | `function getDBConnection()` |
| `new mysqli(...)` | `new PDO(...)` |
| Não tem sendResponse() | Tem sendResponse() ✅ |
| Não tem sendError() | Tem sendError() ✅ |
| API retorna erro ❌ | API funciona ✅ |

---

## 🎯 CHECKLIST FINAL

Após editar o config.php:

- [ ] Arquivo salvo
- [ ] Cache limpo (Ctrl+Shift+R)
- [ ] API testada: `/api/vehicles.php` retorna JSON
- [ ] Site testado: carrega normalmente
- [ ] Console sem erros (F12)
- [ ] **DELETAR `/install/`** (segurança!)
- [ ] Acessar `/admin` e trocar senha

---

## 📁 ARQUIVOS DE REFERÊNCIA

Se precisar do código completo novamente:

**Local:**
- `d:\website\rv-car-solutions-main\api\config-producao.php`

**GitHub:**
- `https://github.com/betinhochagas/rvcar/blob/master/api/config-producao.php`

**Documentação:**
- `CORRECAO-CONFIG-PDO.md` (guia técnico completo)

---

## 🔐 SEGURANÇA

### Após corrigir, IMEDIATAMENTE:

1. **Delete a pasta `/install/`**
   ```
   cPanel → File Manager → public_html/install/ → Delete
   ```

2. **Troque a senha do admin**
   ```
   Acesse: https://bnutech.com.br/admin
   Login: admin
   Senha: rvcar2024
   → Vá em Settings → Change Password
   ```

3. **Verifique se `config.php` está protegido**
   ```
   Teste: https://bnutech.com.br/api/config.php
   Deve dar: 403 Forbidden ✅
   ```

---

## 💡 POR QUE ISSO ACONTECEU?

O instalador estava gerando `config.php` com **MySQLi** (extensão antiga), mas o código da API usa **PDO** (extensão moderna).

**Já corrigi:**
- ✅ Instalador atualizado para gerar PDO
- ✅ Novo ZIP gerado com correção
- ✅ Commit enviado para GitHub
- ✅ Próximas instalações vão funcionar

**Para esta instalação:**
- ⚠️ Precisa editar manualmente (só desta vez)
- ⏱️ Leva 2 minutos
- ✅ Depois nunca mais precisa

---

## 📞 ME AVISE QUANDO:

✅ **Funcionar:** "Funcionou! Site carregando!"  
❌ **Erro persistir:** Me envie o erro do Console (F12)  
🔐 **Dúvida na senha:** Vamos verificar juntos  

---

**Criado:** 19/10/2025 00:35  
**Prioridade:** 🔴 URGENTE  
**Tempo:** 2 minutos  
**Dificuldade:** Fácil (copiar e colar)

---

## 🎬 RESUMO VISUAL

```
┌─────────────────────────────────────────┐
│  1. cPanel → File Manager               │
│  2. public_html/api/config.php          │
│  3. Edit → APAGAR TUDO                  │
│  4. COLAR código PDO (acima)            │
│  5. Save Changes                        │
│  6. Testar: /api/vehicles.php           │
│  7. ✅ JSON aparece = FUNCIONOU!        │
└─────────────────────────────────────────┘
```

**É SÓ ISSO! 🚀**
