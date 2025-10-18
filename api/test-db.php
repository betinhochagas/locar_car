<?php
// Teste de conexão MySQL
try {
    $pdo = new PDO('mysql:host=localhost', 'root', '');
    echo "✅ Conexão com MySQL OK!\n";
    echo "PHP Version: " . phpversion() . "\n";

    // Tentar criar o banco
    $pdo->exec("CREATE DATABASE IF NOT EXISTS rvcar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ Banco de dados 'rvcar_db' criado/verificado!\n";

    // Selecionar banco
    $pdo->exec("USE rvcar_db");
    echo "✅ Banco 'rvcar_db' selecionado!\n";

    echo "\n🎉 Tudo funcionando! Acesse o instalador:\n";
    echo "http://localhost:3000/api/install.php\n";
} catch (PDOException $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n";
    echo "\n💡 Verifique se o MySQL está rodando no XAMPP Control Panel\n";
}
