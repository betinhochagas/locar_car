<?php

/**
 * RV Car Solutions - Sistema de Autenticação
 * 
 * API para autenticação de administradores
 */

// ============================================================================
// CORS CONFIGURATION
// ============================================================================

// Detectar se está em produção ou desenvolvimento
$is_production = !in_array($_SERVER['SERVER_NAME'], ['localhost', '127.0.0.1']);

if ($is_production) {
    // PRODUÇÃO: Permitir apenas o próprio domínio
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $domain = $_SERVER['SERVER_NAME'];

    $allowed_origins = [
        $protocol . '://' . $domain,
        'https://' . $domain,
        'http://' . $domain,
    ];

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $origin);
    } else {
        header("Access-Control-Allow-Origin: " . $protocol . '://' . $domain);
    }
} else {
    // DESENVOLVIMENTO: Permitir origens de teste
    $allowed_origins = [
        'http://localhost:8080',
        'http://localhost:5173',
        'http://127.0.0.1:8080',
        'http://127.0.0.1:5173',
    ];

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $origin);
        header('Access-Control-Allow-Credentials: true');
    } else {
        header("Access-Control-Allow-Origin: *");
    }
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

require_once 'config.php';

// ============================================================================
// PROCESSAR REQUISIÇÃO
// ============================================================================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método não permitido', 405);
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    sendError('Dados inválidos', 400);
}

$action = $input['action'] ?? '';

try {
    $pdo = getDBConnection();

    switch ($action) {
        case 'login':
            handleLogin($pdo, $input);
            break;

        case 'change_password':
            handleChangePassword($pdo, $input);
            break;

        case 'verify_token':
            handleVerifyToken($pdo, $input);
            break;

        default:
            sendError('Ação inválida', 400);
    }
} catch (Exception $e) {
    error_log("Erro na autenticação: " . $e->getMessage());
    sendError('Erro no servidor', 500);
}

/**
 * LOGIN
 */
function handleLogin($pdo, $input)
{
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($username) || empty($password)) {
        sendError('Usuário e senha são obrigatórios', 400);
    }

    // Buscar usuário
    $stmt = $pdo->prepare("SELECT id, username, password, name FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user) {
        sendError('Usuário ou senha incorretos', 401);
    }

    // Verificar senha
    if (!password_verify($password, $user['password'])) {
        sendError('Usuário ou senha incorretos', 401);
    }

    // Gerar token
    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+7 days'));

    // Salvar token
    $stmt = $pdo->prepare("
        INSERT INTO admin_tokens (admin_id, token, expires_at) 
        VALUES (?, ?, ?)
    ");
    $stmt->execute([$user['id'], $token, $expires]);

    // Retornar dados do usuário e token
    sendResponse([
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'name' => $user['name']
        ],
        'expires_at' => $expires
    ]);
}

/**
 * VERIFICAR TOKEN
 */
function handleVerifyToken($pdo, $input)
{
    $token = $input['token'] ?? '';

    if (empty($token)) {
        sendError('Token não fornecido', 400);
    }

    // Buscar token válido
    $stmt = $pdo->prepare("
        SELECT t.admin_id, t.expires_at, a.username, a.name
        FROM admin_tokens t
        JOIN admins a ON a.id = t.admin_id
        WHERE t.token = ? AND t.expires_at > NOW()
        LIMIT 1
    ");
    $stmt->execute([$token]);
    $result = $stmt->fetch();

    if (!$result) {
        sendError('Token inválido ou expirado', 401);
    }

    sendResponse([
        'valid' => true,
        'user' => [
            'id' => $result['admin_id'],
            'username' => $result['username'],
            'name' => $result['name']
        ],
        'expires_at' => $result['expires_at']
    ]);
}

/**
 * ALTERAR SENHA
 */
function handleChangePassword($pdo, $input)
{
    $token = $input['token'] ?? '';
    $current_password = $input['current_password'] ?? '';
    $new_password = $input['new_password'] ?? '';

    if (empty($token) || empty($current_password) || empty($new_password)) {
        sendError('Dados incompletos', 400);
    }

    // Validar senha nova
    if (strlen($new_password) < 6) {
        sendError('Nova senha deve ter no mínimo 6 caracteres', 400);
    }

    // Buscar usuário pelo token
    $stmt = $pdo->prepare("
        SELECT a.id, a.password
        FROM admin_tokens t
        JOIN admins a ON a.id = t.admin_id
        WHERE t.token = ? AND t.expires_at > NOW()
        LIMIT 1
    ");
    $stmt->execute([$token]);
    $user = $stmt->fetch();

    if (!$user) {
        sendError('Token inválido ou expirado', 401);
    }

    // Verificar senha atual
    if (!password_verify($current_password, $user['password'])) {
        sendError('Senha atual incorreta', 401);
    }

    // Atualizar senha
    $hashed = password_hash($new_password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("UPDATE admins SET password = ?, updated_at = NOW() WHERE id = ?");
    $stmt->execute([$hashed, $user['id']]);

    // Invalidar todos os tokens antigos
    $stmt = $pdo->prepare("DELETE FROM admin_tokens WHERE admin_id = ?");
    $stmt->execute([$user['id']]);

    // Gerar novo token
    $new_token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+7 days'));

    $stmt = $pdo->prepare("
        INSERT INTO admin_tokens (admin_id, token, expires_at) 
        VALUES (?, ?, ?)
    ");
    $stmt->execute([$user['id'], $new_token, $expires]);

    sendResponse([
        'success' => true,
        'message' => 'Senha alterada com sucesso',
        'token' => $new_token,
        'expires_at' => $expires
    ]);
}
