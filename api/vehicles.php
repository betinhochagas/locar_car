<?php

/**
 * RV Car Solutions - Vehicles API
 * 
 * API RESTful para gerenciamento de veículos
 * 
 * Endpoints:
 * - GET    /api/vehicles.php           - Lista todos os veículos
 * - GET    /api/vehicles.php?id=X      - Busca veículo específico
 * - POST   /api/vehicles.php           - Adiciona novo veículo
 * - PUT    /api/vehicles.php?id=X      - Atualiza veículo
 * - DELETE /api/vehicles.php?id=X      - Remove veículo
 * - PATCH  /api/vehicles.php?id=X      - Toggle disponibilidade
 */

// ============================================================================
// CORS CONFIGURATION - DEVE SER A PRIMEIRA COISA NO ARQUIVO
// ============================================================================

// Detectar se está em produção ou desenvolvimento
$is_production = !in_array($_SERVER['SERVER_NAME'], ['localhost', '127.0.0.1']);

if ($is_production) {
    // PRODUÇÃO: Permitir apenas o próprio domínio
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $domain = $_SERVER['SERVER_NAME'];

    // Lista de domínios permitidos em produção
    $allowed_origins = [
        $protocol . '://' . $domain,
        'https://' . $domain,
        'http://' . $domain,
    ];

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $origin);
    } else {
        // Mesmo domínio: não precisa CORS
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

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

// Responder a requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

require_once 'config.php';

// Verificar autenticação básica (simples para este projeto)
// Em produção, considere JWT ou OAuth
function checkAuth()
{
    // Por enquanto, apenas verifica se tem o header de autenticação
    // Você pode melhorar isso depois
    $headers = getallheaders();

    // Para operações de escrita, verificar autenticação
    if (in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT', 'DELETE', 'PATCH'])) {
        if (!isset($headers['Authorization']) && !isset($_GET['admin'])) {
            // Permitir sem auth por enquanto, mas logar aviso
            // sendError('Autenticação necessária', 401);
        }
    }
    return true;
}

// Verificar autenticação
checkAuth();

try {
    $pdo = getDBConnection();
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            handleGet($pdo);
            break;

        case 'POST':
            handlePost($pdo);
            break;

        case 'PUT':
            handlePut($pdo);
            break;

        case 'DELETE':
            handleDelete($pdo);
            break;

        case 'PATCH':
            handlePatch($pdo);
            break;

        default:
            sendError('Método não suportado', 405);
    }
} catch (Exception $e) {
    error_log("Erro na API: " . $e->getMessage());
    sendError($e->getMessage(), 500);
}

/**
 * GET - Listar veículos ou buscar específico
 */
function handleGet($pdo)
{
    if (isset($_GET['id'])) {
        // Buscar veículo específico
        $stmt = $pdo->prepare("
            SELECT id, name, price, image, features, available, 
                   created_at, updated_at 
            FROM vehicles 
            WHERE id = ?
        ");
        $stmt->execute([$_GET['id']]);
        $vehicle = $stmt->fetch();

        if (!$vehicle) {
            sendError('Veículo não encontrado', 404);
        }

        // Converter features de JSON para array
        $vehicle['features'] = json_decode($vehicle['features'], true) ?: [];
        $vehicle['available'] = (bool)$vehicle['available'];

        sendResponse($vehicle);
    } else {
        // Listar todos os veículos
        $stmt = $pdo->query("
            SELECT id, name, price, image, features, available, 
                   created_at, updated_at 
            FROM vehicles 
            ORDER BY created_at ASC
        ");
        $vehicles = $stmt->fetchAll();

        // Processar cada veículo
        foreach ($vehicles as &$vehicle) {
            $vehicle['features'] = json_decode($vehicle['features'], true) ?: [];
            $vehicle['available'] = (bool)$vehicle['available'];
        }

        sendResponse($vehicles);
    }
}

/**
 * POST - Adicionar novo veículo
 */
function handlePost($pdo)
{
    $input = json_decode(file_get_contents('php://input'), true);

    // Validar dados obrigatórios
    if (empty($input['name']) || empty($input['price'])) {
        sendError('Nome e preço são obrigatórios', 400);
    }

    // Gerar ID único
    $id = uniqid('veh_', true);

    // Preparar dados
    $name = $input['name'];
    $price = $input['price'];
    $image = $input['image'] ?? '/placeholder.svg';
    $features = json_encode($input['features'] ?? [], JSON_UNESCAPED_UNICODE);
    $available = isset($input['available']) ? (int)$input['available'] : 1;
    $now = date('Y-m-d H:i:s');

    // Inserir no banco
    $stmt = $pdo->prepare("
        INSERT INTO vehicles (id, name, price, image, features, available, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([$id, $name, $price, $image, $features, $available, $now, $now]);

    // Retornar veículo criado
    $vehicle = [
        'id' => $id,
        'name' => $name,
        'price' => $price,
        'image' => $image,
        'features' => json_decode($features, true),
        'available' => (bool)$available,
        'createdAt' => $now,
        'updatedAt' => $now
    ];

    sendResponse($vehicle, 201);
}

/**
 * PUT - Atualizar veículo
 */
function handlePut($pdo)
{
    if (!isset($_GET['id'])) {
        sendError('ID do veículo é obrigatório', 400);
    }

    $id = $_GET['id'];
    $input = json_decode(file_get_contents('php://input'), true);

    // Verificar se veículo existe
    $stmt = $pdo->prepare("SELECT id FROM vehicles WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        sendError('Veículo não encontrado', 404);
    }

    // Preparar dados para atualização
    $updates = [];
    $params = [];

    if (isset($input['name'])) {
        $updates[] = "name = ?";
        $params[] = $input['name'];
    }
    if (isset($input['price'])) {
        $updates[] = "price = ?";
        $params[] = $input['price'];
    }
    if (isset($input['image'])) {
        $updates[] = "image = ?";
        $params[] = $input['image'];
    }
    if (isset($input['features'])) {
        $updates[] = "features = ?";
        $params[] = json_encode($input['features'], JSON_UNESCAPED_UNICODE);
    }
    if (isset($input['available'])) {
        $updates[] = "available = ?";
        $params[] = (int)$input['available'];
    }

    // Adicionar updated_at
    $updates[] = "updated_at = ?";
    $params[] = date('Y-m-d H:i:s');

    // Adicionar ID no final
    $params[] = $id;

    // Executar update
    $sql = "UPDATE vehicles SET " . implode(", ", $updates) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // Buscar e retornar veículo atualizado
    $stmt = $pdo->prepare("
        SELECT id, name, price, image, features, available, created_at, updated_at 
        FROM vehicles 
        WHERE id = ?
    ");
    $stmt->execute([$id]);
    $vehicle = $stmt->fetch();

    $vehicle['features'] = json_decode($vehicle['features'], true) ?: [];
    $vehicle['available'] = (bool)$vehicle['available'];

    sendResponse($vehicle);
}

/**
 * DELETE - Remover veículo
 */
function handleDelete($pdo)
{
    if (!isset($_GET['id'])) {
        sendError('ID do veículo é obrigatório', 400);
    }

    $id = $_GET['id'];

    // Verificar se existe
    $stmt = $pdo->prepare("SELECT id FROM vehicles WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        sendError('Veículo não encontrado', 404);
    }

    // Remover
    $stmt = $pdo->prepare("DELETE FROM vehicles WHERE id = ?");
    $stmt->execute([$id]);

    sendResponse(['success' => true, 'message' => 'Veículo removido com sucesso']);
}

/**
 * PATCH - Toggle disponibilidade
 */
function handlePatch($pdo)
{
    if (!isset($_GET['id'])) {
        sendError('ID do veículo é obrigatório', 400);
    }

    $id = $_GET['id'];

    // Buscar estado atual
    $stmt = $pdo->prepare("SELECT available FROM vehicles WHERE id = ?");
    $stmt->execute([$id]);
    $vehicle = $stmt->fetch();

    if (!$vehicle) {
        sendError('Veículo não encontrado', 404);
    }

    // Toggle disponibilidade
    $newAvailable = $vehicle['available'] ? 0 : 1;

    // Atualizar
    $stmt = $pdo->prepare("
        UPDATE vehicles 
        SET available = ?, updated_at = ? 
        WHERE id = ?
    ");
    $stmt->execute([$newAvailable, date('Y-m-d H:i:s'), $id]);

    // Buscar e retornar veículo atualizado
    $stmt = $pdo->prepare("
        SELECT id, name, price, image, features, available, created_at, updated_at 
        FROM vehicles 
        WHERE id = ?
    ");
    $stmt->execute([$id]);
    $vehicle = $stmt->fetch();

    $vehicle['features'] = json_decode($vehicle['features'], true) ?: [];
    $vehicle['available'] = (bool)$vehicle['available'];

    sendResponse($vehicle);
}
