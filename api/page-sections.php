<?php

/**
 * RV Car Solutions - Page Sections API (JSON Version)
 * 
 * API RESTful para gerenciamento de seções da página usando JSON
 */

// ============================================================================
// CORS CONFIGURATION
// ============================================================================

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

$SECTIONS_FILE = __DIR__ . '/../data/page-sections.json';

function readSections()
{
    global $SECTIONS_FILE;
    if (!file_exists($SECTIONS_FILE)) {
        return [];
    }
    $content = file_get_contents($SECTIONS_FILE);
    return json_decode($content, true) ?: [];
}

function writeSections($sections)
{
    global $SECTIONS_FILE;
    $dir = dirname($SECTIONS_FILE);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    $json = json_encode($sections, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    file_put_contents($SECTIONS_FILE, $json);
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

function getNextId($sections)
{
    if (empty($sections)) {
        return 1;
    }
    $maxId = max(array_column($sections, 'id'));
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
    $sections = readSections();

    if (isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        $section = null;

        foreach ($sections as $s) {
            if ($s['id'] === $id) {
                $section = $s;
                break;
            }
        }

        if (!$section) {
            sendError('Seção não encontrada', 404);
        }

        sendResponse($section);
    } elseif (isset($_GET['key'])) {
        $key = $_GET['key'];
        $section = null;

        foreach ($sections as $s) {
            if ($s['section_key'] === $key) {
                $section = $s;
                break;
            }
        }

        if (!$section) {
            sendError('Seção não encontrada', 404);
        }

        sendResponse($section);
    } else {
        // Filtros opcionais
        $activeOnly = isset($_GET['active']) && $_GET['active'] === 'true';

        if ($activeOnly) {
            $sections = array_filter($sections, function ($s) {
                return $s['is_active'] === true;
            });
        }

        // Ordenar por display_order
        usort($sections, function ($a, $b) {
            return $a['display_order'] - $b['display_order'];
        });

        sendResponse(array_values($sections));
    }
}

function handlePost()
{
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['section_key']) || empty($input['section_name'])) {
        sendError('section_key e section_name são obrigatórios', 400);
    }

    $sections = readSections();

    // Verificar se já existe
    foreach ($sections as $s) {
        if ($s['section_key'] === $input['section_key']) {
            sendError('Uma seção com esta chave já existe', 400);
        }
    }

    $id = getNextId($sections);
    $order = $input['display_order'] ?? 0;

    if ($order === 0) {
        $maxOrder = empty($sections) ? 0 : max(array_column($sections, 'display_order'));
        $order = $maxOrder + 1;
    }

    $newSection = [
        'id' => $id,
        'section_key' => $input['section_key'],
        'section_name' => $input['section_name'],
        'section_type' => $input['section_type'] ?? 'custom',
        'content' => $input['content'] ?? [],
        'display_order' => $order,
        'is_active' => $input['is_active'] ?? true,
        'created_at' => date('Y-m-d\TH:i:s'),
        'updated_at' => date('Y-m-d\TH:i:s')
    ];

    $sections[] = $newSection;
    writeSections($sections);

    sendResponse($newSection, 201);
}

function handlePut()
{
    if (!isset($_GET['id'])) {
        sendError('ID da seção é obrigatório', 400);
    }

    $id = (int)$_GET['id'];
    $input = json_decode(file_get_contents('php://input'), true);

    $sections = readSections();
    $found = false;

    foreach ($sections as &$section) {
        if ($section['id'] === $id) {
            $found = true;

            if (isset($input['section_name'])) {
                $section['section_name'] = $input['section_name'];
            }

            if (isset($input['section_type'])) {
                $section['section_type'] = $input['section_type'];
            }

            if (isset($input['content'])) {
                $section['content'] = $input['content'];
            }

            if (isset($input['display_order'])) {
                $section['display_order'] = (int)$input['display_order'];
            }

            if (isset($input['is_active'])) {
                $section['is_active'] = (bool)$input['is_active'];
            }

            $section['updated_at'] = date('Y-m-d\TH:i:s');

            writeSections($sections);
            sendResponse($section);
        }
    }

    if (!$found) {
        sendError('Seção não encontrada', 404);
    }
}

function handleDelete()
{
    if (!isset($_GET['id'])) {
        sendError('ID da seção é obrigatório', 400);
    }

    $id = (int)$_GET['id'];
    $sections = readSections();

    $newSections = array_filter($sections, function ($s) use ($id) {
        return $s['id'] !== $id;
    });

    if (count($newSections) === count($sections)) {
        sendError('Seção não encontrada', 404);
    }

    writeSections(array_values($newSections));

    sendResponse(['success' => true, 'message' => 'Seção removida com sucesso']);
}

function handlePatch()
{
    $action = $_GET['action'] ?? 'toggle';

    if ($action === 'reorder') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!isset($input['sections']) || !is_array($input['sections'])) {
            sendError('Array de seções é obrigatório', 400);
        }

        $sections = readSections();

        foreach ($input['sections'] as $item) {
            if (!isset($item['id']) || !isset($item['display_order'])) {
                sendError('Cada item deve ter id e display_order', 400);
            }

            foreach ($sections as &$section) {
                if ($section['id'] === $item['id']) {
                    $section['display_order'] = $item['display_order'];
                    $section['updated_at'] = date('Y-m-d\TH:i:s');
                }
            }
        }

        writeSections($sections);
        sendResponse(['success' => true, 'message' => 'Seções reordenadas com sucesso']);
    } else {
        if (!isset($_GET['id'])) {
            sendError('ID da seção é obrigatório', 400);
        }

        $id = (int)$_GET['id'];
        $sections = readSections();
        $found = false;

        foreach ($sections as &$section) {
            if ($section['id'] === $id) {
                $found = true;
                $section['is_active'] = !$section['is_active'];
                $section['updated_at'] = date('Y-m-d\TH:i:s');

                writeSections($sections);
                sendResponse($section);
            }
        }

        if (!$found) {
            sendError('Seção não encontrada', 404);
        }
    }
}
