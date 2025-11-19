<?php

/**
 * Site Settings API - JSON Version
 */

// CORS
$server_name = $_SERVER["SERVER_NAME"];
$is_production = !in_array($server_name, ["localhost", "127.0.0.1", "0.0.0.0"]) &&
    !preg_match('/^192\.168\./', $server_name) &&
    !preg_match('/^10\./', $server_name);

if ($is_production) {
    $protocol = isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] === "on" ? "https" : "http";
    $domain = $server_name;
    $origin = isset($_SERVER["HTTP_ORIGIN"]) ? $_SERVER["HTTP_ORIGIN"] : "";
    header("Access-Control-Allow-Origin: " . ($origin ?: $protocol . "://" . $domain));
} else {
    // Desenvolvimento: permitir qualquer origem local
    $origin = isset($_SERVER["HTTP_ORIGIN"]) ? $_SERVER["HTTP_ORIGIN"] : "";

    if ($origin) {
        $isLocal = preg_match('/^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/', $origin);

        if ($isLocal) {
            header("Access-Control-Allow-Origin: " . $origin);
            header("Access-Control-Allow-Credentials: true");
        } else {
            header("Access-Control-Allow-Origin: *");
        }
    } else {
        header("Access-Control-Allow-Origin: *");
    }
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit(0);
}

$SETTINGS_FILE = __DIR__ . "/../data/site-settings.json";

function readSettings()
{
    global $SETTINGS_FILE;
    if (!file_exists($SETTINGS_FILE)) return [];
    $data = json_decode(file_get_contents($SETTINGS_FILE), true);
    if (!$data) return [];
    $settings = [];
    foreach ($data as $key => $config) {
        $settings[] = [
            "config_key" => $key,
            "config_value" => $config["value"] ?? "",
            "config_type" => $config["type"] ?? "text",
            "description" => $config["description"] ?? ""
        ];
    }
    return $settings;
}

function writeSettings($settings)
{
    global $SETTINGS_FILE;
    $data = file_exists($SETTINGS_FILE) ? json_decode(file_get_contents($SETTINGS_FILE), true) : [];
    foreach ($settings as $setting) {
        $key = $setting["config_key"];
        $data[$key] = [
            "value" => $setting["config_value"],
            "type" => $setting["config_type"] ?? "text",
            "description" => $setting["description"] ?? ($data[$key]["description"] ?? "")
        ];
    }
    $dir = dirname($SETTINGS_FILE);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    file_put_contents($SETTINGS_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
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
    echo json_encode(["error" => true, "message" => $message], JSON_UNESCAPED_UNICODE);
    exit();
}

function checkAuth()
{
    if ($_SERVER["REQUEST_METHOD"] === "GET") return true;
    $authHeader = $_SERVER["HTTP_AUTHORIZATION"] ?? "";
    if (empty($authHeader)) sendError("Token de autenticacao necessario", 401);
    $token = str_replace("Bearer ", "", $authHeader);
    $tokensFile = __DIR__ . "/../data/admin-tokens.json";
    if (file_exists($tokensFile)) {
        $tokens = json_decode(file_get_contents($tokensFile), true);
        foreach ($tokens as $t) {
            if ($t["token"] === $token && strtotime($t["expires_at"]) > time()) return true;
        }
    }
    sendError("Token invalido ou expirado", 401);
}

checkAuth();

try {
    $method = $_SERVER["REQUEST_METHOD"];

    if ($method === "GET") {
        $settings = readSettings();
        if (isset($_GET["key"])) {
            foreach ($settings as $s) {
                if ($s["config_key"] === $_GET["key"]) sendResponse($s);
            }
            sendError("Configuracao nao encontrada", 404);
        }
        if (isset($_GET["category"])) {
            $category = $_GET["category"];
            $filtered = array_filter($settings, fn($s) => strpos($s["config_key"], $category . "_") === 0);
            sendResponse(array_values($filtered));
        }
        sendResponse($settings);
    }

    if ($method === "POST") {
        $input = json_decode(file_get_contents("php://input"), true);
        if (isset($input[0]) && is_array($input[0])) {
            writeSettings($input);
            sendResponse(["success" => true, "message" => "Configuracoes salvas com sucesso", "data" => $input]);
        } else {
            if (empty($input["config_key"])) sendError("config_key e obrigatorio", 400);
            writeSettings([$input]);
            sendResponse(["success" => true, "message" => "Configuracao salva", "data" => $input]);
        }
    }

    if ($method === "PUT") {
        if (!isset($_GET["key"])) sendError("Chave da configuracao e obrigatoria", 400);
        $input = json_decode(file_get_contents("php://input"), true);
        $setting = [
            "config_key" => $_GET["key"],
            "config_value" => $input["config_value"] ?? $input["value"] ?? "",
            "config_type" => $input["config_type"] ?? $input["type"] ?? "text",
            "description" => $input["description"] ?? ""
        ];
        writeSettings([$setting]);
        sendResponse($setting);
    }

    if ($method === "DELETE") {
        if (!isset($_GET["key"])) sendError("Chave da configuracao e obrigatoria", 400);
        if (!file_exists($SETTINGS_FILE)) sendError("Configuracao nao encontrada", 404);
        $data = json_decode(file_get_contents($SETTINGS_FILE), true);
        if (!isset($data[$_GET["key"]])) sendError("Configuracao nao encontrada", 404);
        unset($data[$_GET["key"]]);
        file_put_contents($SETTINGS_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        sendResponse(["success" => true, "message" => "Configuracao removida com sucesso"]);
    }

    sendError("Metodo nao suportado", 405);
} catch (Exception $e) {
    error_log("Erro na API de configuracoes: " . $e->getMessage());
    sendError($e->getMessage(), 500);
}
