<?php

/**
 * Upload API (JSON Version)
 * 
 * API para upload de imagens de veículos (SEM dependência do GD)
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

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

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
// PROCESSAR UPLOAD
// ============================================================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método não permitido', 405);
}

// Configurações
$upload_type = isset($_POST['type']) ? $_POST['type'] : 'vehicle'; // 'vehicle', 'logo', 'favicon', 'section'
$base_upload_dir = __DIR__ . '/../uploads/';
$base_public_dir = __DIR__ . '/../public/uploads/';

// Definir diretórios baseado no tipo
if ($upload_type === 'logo' || $upload_type === 'favicon') {
    $upload_dir = $base_upload_dir . 'site/';
    $public_dir = $base_public_dir . 'site/';
    $web_path = '/uploads/site/';
} elseif ($upload_type === 'section') {
    $upload_dir = $base_upload_dir . 'sections/';
    $public_dir = $base_public_dir . 'sections/';
    $web_path = '/uploads/sections/';
} else {
    $upload_dir = $base_upload_dir . 'vehicles/';
    $public_dir = $base_public_dir . 'vehicles/';
    $web_path = '/uploads/vehicles/';
}

$max_size = 5 * 1024 * 1024; // 5MB
$allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
$allowed_extensions = ['jpg', 'jpeg', 'png', 'webp'];

// Criar diretórios se não existirem
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}
if (!is_dir($public_dir)) {
    mkdir($public_dir, 0755, true);
}

// Verificar se arquivo foi enviado
if (!isset($_FILES['image']) || $_FILES['image']['error'] === UPLOAD_ERR_NO_FILE) {
    sendError('Nenhuma imagem foi enviada', 400);
}

$file = $_FILES['image'];

// Verificar erros de upload
if ($file['error'] !== UPLOAD_ERR_OK) {
    $errors = [
        UPLOAD_ERR_INI_SIZE => 'Arquivo muito grande (limite do PHP)',
        UPLOAD_ERR_FORM_SIZE => 'Arquivo muito grande (limite do formulário)',
        UPLOAD_ERR_PARTIAL => 'Upload incompleto',
        UPLOAD_ERR_NO_TMP_DIR => 'Pasta temporária não encontrada',
        UPLOAD_ERR_CANT_WRITE => 'Erro ao escrever arquivo',
        UPLOAD_ERR_EXTENSION => 'Upload bloqueado por extensão PHP'
    ];
    $message = $errors[$file['error']] ?? 'Erro desconhecido no upload';
    sendError($message, 500);
}

// Verificar tipo MIME
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime_type = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime_type, $allowed_types)) {
    sendError('Tipo de arquivo não permitido. Use: JPG, PNG ou WebP', 400);
}

// Verificar extensão do arquivo
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($extension, $allowed_extensions)) {
    sendError('Extensão de arquivo não permitida. Use: JPG, PNG ou WebP', 400);
}

// Verificar tamanho
if ($file['size'] > $max_size) {
    sendError('Imagem muito grande. Máximo: 5MB', 400);
}

// Gerar nome único
$unique_name = uniqid($upload_type . '_', true) . '.' . $extension;
$destination = $upload_dir . $unique_name;
$public_destination = $public_dir . $unique_name;

// Mover arquivo
if (!move_uploaded_file($file['tmp_name'], $destination)) {
    sendError('Erro ao salvar arquivo', 500);
}

// Redimensionar imagem se for logo ou favicon
if ($upload_type === 'logo' || $upload_type === 'favicon') {
    $max_width = $upload_type === 'logo' ? 500 : 64;
    $max_height = $upload_type === 'logo' ? 500 : 64;

    // Verificar se GD está disponível
    if (extension_loaded('gd') && function_exists('gd_info')) {
        try {
            // Carregar imagem baseado no tipo
            switch ($mime_type) {
                case 'image/jpeg':
                case 'image/jpg':
                    $source = imagecreatefromjpeg($destination);
                    break;
                case 'image/png':
                    $source = imagecreatefrompng($destination);
                    break;
                case 'image/webp':
                    $source = imagecreatefromwebp($destination);
                    break;
                default:
                    $source = false;
            }

            if ($source !== false) {
                list($width, $height) = getimagesize($destination);

                // Calcular novas dimensões mantendo proporção
                if ($width > $max_width || $height > $max_height) {
                    $ratio = min($max_width / $width, $max_height / $height);
                    $new_width = round($width * $ratio);
                    $new_height = round($height * $ratio);

                    // Criar nova imagem
                    $resized = imagecreatetruecolor($new_width, $new_height);

                    // Preservar transparência para PNG e WebP
                    if ($mime_type === 'image/png' || $mime_type === 'image/webp') {
                        imagealphablending($resized, false);
                        imagesavealpha($resized, true);
                        $transparent = imagecolorallocatealpha($resized, 255, 255, 255, 127);
                        imagefilledrectangle($resized, 0, 0, $new_width, $new_height, $transparent);
                    }

                    // Redimensionar
                    imagecopyresampled($resized, $source, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

                    // Salvar imagem redimensionada
                    switch ($mime_type) {
                        case 'image/jpeg':
                        case 'image/jpg':
                            imagejpeg($resized, $destination, 90);
                            break;
                        case 'image/png':
                            imagepng($resized, $destination, 9);
                            break;
                        case 'image/webp':
                            imagewebp($resized, $destination, 90);
                            break;
                    }

                    imagedestroy($source);
                    imagedestroy($resized);
                }
            }
        } catch (Exception $e) {
            // Se falhar redimensionamento, continua com imagem original
            error_log('Erro ao redimensionar: ' . $e->getMessage());
        }
    }
}

// Copiar para public (para Vite servir em desenvolvimento)
copy($destination, $public_destination);

// Retornar sucesso
sendResponse([
    'success' => true,
    'message' => 'Imagem enviada com sucesso',
    'url' => $web_path . $unique_name,
    'filename' => $unique_name
], 201);
