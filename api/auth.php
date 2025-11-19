<?php

/**
 * RV Car Solutions - Sistema de Autenticação (JSON Version)
 * 
 * API para autenticação de administradores usando JSON
 */

// ============================================================================
// CORS CONFIGURATION
// ============================================================================

// Detectar se está em produção (não é localhost nem IP local)
$server_name = $_SERVER['SERVER_NAME'];
$is_production = !in_array($server_name, ['localhost', '127.0.0.1', '0.0.0.0']) &&
    !preg_match('/^192\.168\./', $server_name) &&
    !preg_match('/^10\./', $server_name);

if ($is_production) {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $domain = $server_name;
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
    // Desenvolvimento: permitir qualquer origem local
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if ($origin) {
        $isLocal = preg_match('/^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/', $origin);

        if ($isLocal) {
            header("Access-Control-Allow-Origin: " . $origin);
            header('Access-Control-Allow-Credentials: true');
        } else {
            header("Access-Control-Allow-Origin: *");
        }
    } else {
        header("Access-Control-Allow-Origin: *");
    }
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// ============================================================================
// JSON FILE MANAGEMENT
// ============================================================================

$USERS_FILE = __DIR__ . '/../data/admin-users.json';
$TOKENS_FILE = __DIR__ . '/../data/admin-tokens.json';

function readUsers()
{
    global $USERS_FILE;
    if (!file_exists($USERS_FILE)) {
        // Criar usuário padrão
        $defaultUser = [
            [
                'id' => 1,
                'username' => 'admin',
                'password' => password_hash('admin123', PASSWORD_DEFAULT),
                'name' => 'Administrador',
                'created_at' => date('Y-m-d\TH:i:s')
            ]
        ];
        writeUsers($defaultUser);
        return $defaultUser;
    }
    $content = file_get_contents($USERS_FILE);
    return json_decode($content, true) ?: [];
}

function writeUsers($users)
{
    global $USERS_FILE;
    $dir = dirname($USERS_FILE);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    $json = json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    file_put_contents($USERS_FILE, $json);
}

function readTokens()
{
    global $TOKENS_FILE;
    if (!file_exists($TOKENS_FILE)) {
        return [];
    }
    $content = file_get_contents($TOKENS_FILE);
    return json_decode($content, true) ?: [];
}

function writeTokens($tokens)
{
    global $TOKENS_FILE;
    $dir = dirname($TOKENS_FILE);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    $json = json_encode($tokens, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    file_put_contents($TOKENS_FILE, $json);
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
    switch ($action) {
        case 'login':
            handleLogin($input);
            break;

        case 'change_password':
            handleChangePassword($input);
            break;

        case 'verify_token':
            handleVerifyToken($input);
            break;

        default:
            sendError('Ação inválida', 400);
    }
} catch (Exception $e) {
    error_log("Erro na autenticação: " . $e->getMessage());
    sendError('Erro no servidor: ' . $e->getMessage(), 500);
}

// ============================================================================
// HANDLERS
// ============================================================================

function handleLogin($input)
{
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($username) || empty($password)) {
        sendError('Usuário e senha são obrigatórios', 400);
    }

    $users = readUsers();
    $user = null;

    // Buscar usuário
    foreach ($users as $u) {
        if ($u['username'] === $username) {
            $user = $u;
            break;
        }
    }

    if (!$user) {
        sendError('Usuário ou senha incorretos', 401);
    }

    // Verificar senha
    if (!password_verify($password, $user['password'])) {
        sendError('Usuário ou senha incorretos', 401);
    }

    // Gerar token
    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d\TH:i:s', strtotime('+7 days'));

    // Salvar token
    $tokens = readTokens();
    $tokens[] = [
        'admin_id' => $user['id'],
        'token' => $token,
        'expires_at' => $expires,
        'created_at' => date('Y-m-d\TH:i:s')
    ];
    writeTokens($tokens);

    // Limpar tokens expirados
    cleanExpiredTokens();

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

function handleVerifyToken($input)
{
    $token = $input['token'] ?? '';

    if (empty($token)) {
        sendError('Token é obrigatório', 400);
    }

    $tokens = readTokens();
    $validToken = null;

    foreach ($tokens as $t) {
        if ($t['token'] === $token) {
            $validToken = $t;
            break;
        }
    }

    if (!$validToken) {
        sendError('Token inválido', 401);
    }

    // Verificar se expirou
    if (strtotime($validToken['expires_at']) < time()) {
        sendError('Token expirado', 401);
    }

    // Buscar dados do usuário
    $users = readUsers();
    $user = null;

    foreach ($users as $u) {
        if ($u['id'] === $validToken['admin_id']) {
            $user = $u;
            break;
        }
    }

    if (!$user) {
        sendError('Usuário não encontrado', 404);
    }

    sendResponse([
        'valid' => true,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'name' => $user['name']
        ],
        'expires_at' => $validToken['expires_at']
    ]);
}

function handleChangePassword($input)
{
    $token = $input['token'] ?? '';
    $currentPassword = $input['current_password'] ?? '';
    $newPassword = $input['new_password'] ?? '';

    if (empty($token) || empty($currentPassword) || empty($newPassword)) {
        sendError('Token, senha atual e nova senha são obrigatórios', 400);
    }

    // Validar senha
    if (strlen($newPassword) < 6) {
        sendError('A nova senha deve ter pelo menos 6 caracteres', 400);
    }

    // Verificar token
    $tokens = readTokens();
    $validToken = null;

    foreach ($tokens as $t) {
        if ($t['token'] === $token) {
            $validToken = $t;
            break;
        }
    }

    if (!$validToken || strtotime($validToken['expires_at']) < time()) {
        sendError('Token inválido ou expirado', 401);
    }

    // Buscar usuário
    $users = readUsers();
    $userIndex = null;

    foreach ($users as $index => $u) {
        if ($u['id'] === $validToken['admin_id']) {
            $userIndex = $index;
            break;
        }
    }

    if ($userIndex === null) {
        sendError('Usuário não encontrado', 404);
    }

    // Verificar senha atual
    if (!password_verify($currentPassword, $users[$userIndex]['password'])) {
        sendError('Senha atual incorreta', 401);
    }

    // Atualizar senha
    $users[$userIndex]['password'] = password_hash($newPassword, PASSWORD_DEFAULT);
    $users[$userIndex]['updated_at'] = date('Y-m-d\TH:i:s');
    writeUsers($users);

    // Gerar novo token
    $newToken = bin2hex(random_bytes(32));
    $expires = date('Y-m-d\TH:i:s', strtotime('+7 days'));

    $tokens[] = [
        'admin_id' => $users[$userIndex]['id'],
        'token' => $newToken,
        'expires_at' => $expires,
        'created_at' => date('Y-m-d\TH:i:s')
    ];
    writeTokens($tokens);

    sendResponse([
        'success' => true,
        'message' => 'Senha alterada com sucesso',
        'token' => $newToken,
        'expires_at' => $expires
    ]);
}

function cleanExpiredTokens()
{
    $tokens = readTokens();
    $now = time();

    $validTokens = array_filter($tokens, function ($t) use ($now) {
        return strtotime($t['expires_at']) > $now;
    });

    if (count($validTokens) < count($tokens)) {
        writeTokens(array_values($validTokens));
    }
}
