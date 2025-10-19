<?php

/**
 * RV Car Solutions - Configuração do Banco de Dados
 * 
 * INSTRUÇÕES:
 * 1. Renomeie este arquivo para config.php
 * 2. Preencha as credenciais do seu banco de dados
 * 3. Mantenha este arquivo SEGURO (nunca commit no Git)
 */

// Configurações do Banco de Dados
define('DB_HOST', 'localhost');           // Host do banco (geralmente localhost)
define('DB_NAME', 'bnutechc_rvcar');      // Nome do banco de dados
define('DB_USER', 'bnutechc_rvcar');      // Usuário do banco
define('DB_PASS', 'SUA_SENHA_AQUI');      // Senha do banco
define('DB_CHARSET', 'utf8mb4');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Função de conexão PDO
function getDBConnection()
{
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
function setCorsHeaders()
{
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
