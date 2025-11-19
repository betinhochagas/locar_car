<?php
$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
if (preg_match("/\.(png|jpg|jpeg|gif|webp|css|js|ico|svg)$/i", $uri)) {
    $file = __DIR__ . $uri;
    if (file_exists($file)) {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        $mimes = ["png"=>"image/png","jpg"=>"image/jpeg","jpeg"=>"image/jpeg","gif"=>"image/gif","webp"=>"image/webp"];
        header("Content-Type: " . ($mimes[$ext] ?? "application/octet-stream"));
        readfile($file);
        exit;
    }
    http_response_code(404);
    exit;
}
return false;
?>
