<?php

/**
 * RV Car Solutions - Configuração do Banco de Dados
 * Versão CORRIGIDA para Produção (usa PDO)
 * Gerado em: 19/10/2025
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
        http_response_code(500);
        die(json_encode(['error' => 'Erro ao conectar ao banco de dados']));
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
