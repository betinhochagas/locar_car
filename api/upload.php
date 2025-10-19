<?php
/**
 * RV Car Solutions - Upload de Imagens
 * 
 * API para upload de imagens de veículos
 */

// ============================================================================
// CORS CONFIGURATION
// ============================================================================
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

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// ============================================================================
// CONFIGURAÇÕES DE UPLOAD
// ============================================================================
$upload_dir = __DIR__ . '/../uploads/vehicles/';
$web_path = '/rvcar/uploads/vehicles/'; // Ajustar conforme seu domínio
$max_size = 5 * 1024 * 1024; // 5MB
$allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
$allowed_extensions = ['jpg', 'jpeg', 'png', 'webp'];

// Criar diretório se não existir
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================
function sendResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function sendError($message, $code = 400) {
    sendResponse(['error' => $message], $code);
}

// ============================================================================
// PROCESSAR UPLOAD
// ============================================================================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método não permitido', 405);
}

// Verificar se arquivo foi enviado
if (!isset($_FILES['image']) || $_FILES['image']['error'] === UPLOAD_ERR_NO_FILE) {
    sendError('Nenhuma imagem foi enviada', 400);
}

$file = $_FILES['image'];

// Verificar erros de upload
if ($file['error'] !== UPLOAD_ERR_OK) {
    $errors = [
        UPLOAD_ERR_INI_SIZE => 'Arquivo muito grande (limite do servidor)',
        UPLOAD_ERR_FORM_SIZE => 'Arquivo muito grande (limite do formulário)',
        UPLOAD_ERR_PARTIAL => 'Upload incompleto',
        UPLOAD_ERR_NO_TMP_DIR => 'Pasta temporária não encontrada',
        UPLOAD_ERR_CANT_WRITE => 'Erro ao escrever arquivo',
        UPLOAD_ERR_EXTENSION => 'Upload bloqueado por extensão',
    ];
    $error_message = $errors[$file['error']] ?? 'Erro desconhecido no upload';
    sendError($error_message, 500);
}

// Verificar tamanho
if ($file['size'] > $max_size) {
    sendError('Imagem muito grande. Máximo: 5MB', 400);
}

// Verificar tipo MIME
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime_type = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime_type, $allowed_types)) {
    sendError('Tipo de arquivo não permitido. Use: JPG, PNG ou WebP', 400);
}

// Verificar extensão
$file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($file_ext, $allowed_extensions)) {
    sendError('Extensão não permitida. Use: jpg, png ou webp', 400);
}

// Gerar nome único
$new_filename = uniqid('vehicle_', true) . '.' . $file_ext;
$destination = $upload_dir . $new_filename;
$web_url = $web_path . $new_filename;

// Mover arquivo
if (!move_uploaded_file($file['tmp_name'], $destination)) {
    sendError('Erro ao salvar imagem no servidor', 500);
}

// Otimizar imagem (redimensionar se necessário)
try {
    optimizeImage($destination, $mime_type);
} catch (Exception $e) {
    // Se falhar, continuar mesmo assim
    error_log("Erro ao otimizar imagem: " . $e->getMessage());
}

// Retornar sucesso com URL
sendResponse([
    'success' => true,
    'url' => $web_url,
    'filename' => $new_filename,
    'size' => filesize($destination),
    'type' => $mime_type
], 201);

/**
 * Otimizar e redimensionar imagem
 */
function optimizeImage($path, $mime_type) {
    $max_width = 1200;
    $max_height = 900;
    $quality = 85;

    // Criar imagem baseado no tipo
    switch ($mime_type) {
        case 'image/jpeg':
        case 'image/jpg':
            $image = imagecreatefromjpeg($path);
            break;
        case 'image/png':
            $image = imagecreatefrompng($path);
            break;
        case 'image/webp':
            $image = imagecreatefromwebp($path);
            break;
        default:
            return;
    }

    if (!$image) {
        return;
    }

    // Obter dimensões originais
    $width = imagesx($image);
    $height = imagesy($image);

    // Calcular novas dimensões mantendo proporção
    if ($width > $max_width || $height > $max_height) {
        $ratio = min($max_width / $width, $max_height / $height);
        $new_width = intval($width * $ratio);
        $new_height = intval($height * $ratio);

        // Criar nova imagem redimensionada
        $new_image = imagecreatetruecolor($new_width, $new_height);
        
        // Preservar transparência para PNG
        if ($mime_type === 'image/png') {
            imagealphablending($new_image, false);
            imagesavealpha($new_image, true);
            $transparent = imagecolorallocatealpha($new_image, 255, 255, 255, 127);
            imagefilledrectangle($new_image, 0, 0, $new_width, $new_height, $transparent);
        }

        // Redimensionar
        imagecopyresampled(
            $new_image, $image,
            0, 0, 0, 0,
            $new_width, $new_height,
            $width, $height
        );

        // Salvar imagem otimizada
        switch ($mime_type) {
            case 'image/jpeg':
            case 'image/jpg':
                imagejpeg($new_image, $path, $quality);
                break;
            case 'image/png':
                imagepng($new_image, $path, 9);
                break;
            case 'image/webp':
                imagewebp($new_image, $path, $quality);
                break;
        }

        imagedestroy($new_image);
    }

    imagedestroy($image);
}
