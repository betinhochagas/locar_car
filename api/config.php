<?php

/**
 * RV Car Solutions - Database Configuration
 * 
 * Este arquivo contém as configurações de conexão com o banco de dados.
 * Modifique os valores de acordo com seu ambiente (local ou produção).
 */

// Detectar ambiente (local ou produção)
// Aceita localhost, IPs locais e qualquer porta local
$host = $_SERVER['HTTP_HOST'];
$isLocal = (
    in_array($host, ['localhost', '127.0.0.1', 'localhost:8080', 'localhost:3000']) ||
    preg_match('/^192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/', $host) ||
    preg_match('/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/', $host) ||
    preg_match('/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}(:\d+)?$/', $host)
);

if ($isLocal) {
    // Configurações LOCAIS (XAMPP)
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'rvcar_db');
    define('DB_USER', 'root');
    define('DB_PASS', '');  // XAMPP usa senha vazia por padrão
    define('DB_CHARSET', 'utf8mb4');
} else {
    // Configurações de PRODUÇÃO (cPanel)
    // IMPORTANTE: Altere estes valores após criar o banco no cPanel
    define('DB_HOST', 'localhost');  // Geralmente é localhost no cPanel
    define('DB_NAME', 'seu_usuario_rvcar');  // Formato: usuario_nomedatabase
    define('DB_USER', 'seu_usuario_rvcar');  // Usuário do banco
    define('DB_PASS', 'sua_senha_aqui');     // Senha do banco
    define('DB_CHARSET', 'utf8mb4');
}

// Não adicionar headers aqui - será adicionado no vehicles.php

/**
 * Função para conectar ao banco de dados
 * @return PDO Objeto de conexão PDO
 * @throws Exception Se a conexão falhar
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
        error_log("Erro de conexão com banco de dados: " . $e->getMessage());
        throw new Exception("Erro ao conectar com o banco de dados");
    }
}

/**
 * Função para enviar resposta JSON
 * @param mixed $data Dados a serem enviados
 * @param int $statusCode Código HTTP de status
 */
function sendResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

/**
 * Função para enviar erro JSON
 * @param string $message Mensagem de erro
 * @param int $statusCode Código HTTP de status
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
