<?php
require_once __DIR__ . '/backend/config/database.php';
header('Content-Type: application/json');

try {
    $pdo = getConnection();
    $colors = array(
        'color_primary' => '#1a56db',
        'color_secondary' => '#7c3aed',
        'color_accent' => '#db2777',
        'color_background' => '#ffffff',
        'color_text' => '#1f2937',
        'color_card' => '#ffffff',
        'color_border' => '#e5e7eb'
    );
    $inserted = 0;
    $stmt = $pdo->prepare("INSERT INTO site_settings (config_key, config_value) VALUES (:key, :value) ON DUPLICATE KEY UPDATE config_value = VALUES(config_value)");
    foreach ($colors as $key => $value) {
        $stmt->execute(array('key' => $key, 'value' => $value));
        if ($stmt->rowCount() > 0) $inserted++;
    }
    echo json_encode(array('success' => true, 'inserted' => $inserted));
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}
