<?php

/**
 * Vehicles API (JSON Version)
 * 
 * API RESTful para gerenciamento de veículos usando JSON
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
        // Se tem origem, validar que é local
        $isLocal = preg_match('/^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/', $origin);

        if ($isLocal) {
            header("Access-Control-Allow-Origin: " . $origin);
            header('Access-Control-Allow-Credentials: true');
        } else {
            // Origem não reconhecida, permitir mesmo assim em dev
            header("Access-Control-Allow-Origin: *");
        }
    } else {
        // Sem origem, permitir todas
        header("Access-Control-Allow-Origin: *");
    }
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
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

$VEHICLES_FILE = __DIR__ . '/../data/vehicles.json';

function readVehicles()
{
    global $VEHICLES_FILE;
    if (!file_exists($VEHICLES_FILE)) {
        return [];
    }
    $content = file_get_contents($VEHICLES_FILE);
    return json_decode($content, true) ?: [];
}

function writeVehicles($vehicles)
{
    global $VEHICLES_FILE;
    $dir = dirname($VEHICLES_FILE);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    $json = json_encode($vehicles, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    file_put_contents($VEHICLES_FILE, $json);
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

function getNextId($vehicles)
{
    if (empty($vehicles)) {
        return 1;
    }
    $maxId = max(array_column($vehicles, 'id'));
    return $maxId + 1;
}

// ============================================================================
// AUTENTICAÇÃO (Simplificada para JSON)
// ============================================================================

function checkAuth()
{
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    // Permitir acesso público para GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        return true;
    }

    // Para POST, PUT, DELETE, PATCH - verificar token
    if (empty($authHeader)) {
        sendError('Token de autenticação necessário', 401);
    }

    $token = str_replace('Bearer ', '', $authHeader);

    // Verificar se token é válido
    $tokensFile = __DIR__ . '/../data/admin-tokens.json';
    if (file_exists($tokensFile)) {
        $tokens = json_decode(file_get_contents($tokensFile), true);
        foreach ($tokens as $t) {
            if ($t['token'] === $token && strtotime($t['expires_at']) > time()) {
                return true;
            }
        }
    }

    sendError('Token inválido ou expirado', 401);
}

// Verificar autenticação
checkAuth();

// ============================================================================
// PROCESSAR REQUISIÇÃO
// ============================================================================

try {
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            handleGet();
            break;

        case 'POST':
            handlePost();
            break;

        case 'PUT':
            handlePut();
            break;

        case 'DELETE':
            handleDelete();
            break;

        case 'PATCH':
            handlePatch();
            break;

        default:
            sendError('Método não suportado', 405);
    }
} catch (Exception $e) {
    error_log("Erro na API: " . $e->getMessage());
    sendError($e->getMessage(), 500);
}

// ============================================================================
// HANDLERS
// ============================================================================

function handleGet()
{
    $vehicles = readVehicles();

    if (isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        $vehicle = null;

        foreach ($vehicles as $v) {
            if ($v['id'] === $id) {
                $vehicle = $v;
                break;
            }
        }

        if (!$vehicle) {
            sendError('Veículo não encontrado', 404);
        }

        sendResponse($vehicle);
    } else {
        // Filtros opcionais
        $availableOnly = isset($_GET['available']) && $_GET['available'] === 'true';

        if ($availableOnly) {
            $vehicles = array_filter($vehicles, function ($v) {
                return $v['available'] === true;
            });
        }

        sendResponse(array_values($vehicles));
    }
}

function handlePost()
{
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['name']) || empty($input['price'])) {
        sendError('Nome e preço são obrigatórios', 400);
    }

    $vehicles = readVehicles();
    $id = getNextId($vehicles);

    $newVehicle = [
        'id' => $id,
        'name' => $input['name'],
        'price' => (float)$input['price'],
        'image' => $input['image'] ?? '',
        'features' => $input['features'] ?? [],
        'available' => $input['available'] ?? true,
        'created_at' => date('Y-m-d\TH:i:s'),
        'updated_at' => date('Y-m-d\TH:i:s')
    ];

    $vehicles[] = $newVehicle;
    writeVehicles($vehicles);

    sendResponse($newVehicle, 201);
}

function handlePut()
{
    if (!isset($_GET['id'])) {
        sendError('ID do veículo é obrigatório', 400);
    }

    $id = (int)$_GET['id'];
    $input = json_decode(file_get_contents('php://input'), true);

    $vehicles = readVehicles();
    $found = false;

    foreach ($vehicles as &$vehicle) {
        if ($vehicle['id'] === $id) {
            $found = true;

            if (isset($input['name'])) {
                $vehicle['name'] = $input['name'];
            }

            if (isset($input['price'])) {
                $vehicle['price'] = (float)$input['price'];
            }

            if (isset($input['image'])) {
                $vehicle['image'] = $input['image'];
            }

            if (isset($input['features'])) {
                $vehicle['features'] = $input['features'];
            }

            if (isset($input['available'])) {
                $vehicle['available'] = (bool)$input['available'];
            }

            $vehicle['updated_at'] = date('Y-m-d\TH:i:s');

            writeVehicles($vehicles);
            sendResponse($vehicle);
        }
    }

    if (!$found) {
        sendError('Veículo não encontrado', 404);
    }
}

function handleDelete()
{
    if (!isset($_GET['id'])) {
        sendError('ID do veículo é obrigatório', 400);
    }

    $id = (int)$_GET['id'];
    $vehicles = readVehicles();

    $newVehicles = array_filter($vehicles, function ($v) use ($id) {
        return $v['id'] !== $id;
    });

    if (count($newVehicles) === count($vehicles)) {
        sendError('Veículo não encontrado', 404);
    }

    writeVehicles(array_values($newVehicles));

    sendResponse(['success' => true, 'message' => 'Veículo removido com sucesso']);
}

function handlePatch()
{
    if (!isset($_GET['id'])) {
        sendError('ID do veículo é obrigatório', 400);
    }

    $id = (int)$_GET['id'];
    $vehicles = readVehicles();
    $found = false;

    foreach ($vehicles as &$vehicle) {
        if ($vehicle['id'] === $id) {
            $found = true;
            $vehicle['available'] = !$vehicle['available'];
            $vehicle['updated_at'] = date('Y-m-d\TH:i:s');

            writeVehicles($vehicles);
            sendResponse($vehicle);
        }
    }

    if (!$found) {
        sendError('Veículo não encontrado', 404);
    }
}
