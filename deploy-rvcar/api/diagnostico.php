<?php

/**
 * RV Car - Script de Diagnóstico e Criação de Admin
 * 
 * Este script:
 * 1. Testa conexão com banco
 * 2. Verifica se tabelas existem
 * 3. Lista usuários existentes
 * 4. Cria usuário admin se não existir
 */

header('Content-Type: text/html; charset=utf-8');

// Incluir config
require_once 'config.php';

echo "<h1>🔍 RV Car - Diagnóstico do Sistema</h1>";
echo "<hr>";

try {
    $pdo = getDBConnection();
    echo "<h2>✅ 1. Conexão com Banco de Dados</h2>";
    echo "<p style='color: green;'>✓ Conectado com sucesso!</p>";
    echo "<p><strong>Host:</strong> " . DB_HOST . "</p>";
    echo "<p><strong>Database:</strong> " . DB_NAME . "</p>";
    echo "<hr>";

    // Verificar tabelas
    echo "<h2>📋 2. Verificação de Tabelas</h2>";

    $tables = ['vehicles', 'admins', 'admin_tokens'];
    $missing_tables = [];

    foreach ($tables as $table) {
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() > 0) {
            echo "<p style='color: green;'>✓ Tabela <strong>$table</strong> existe</p>";
        } else {
            echo "<p style='color: red;'>✗ Tabela <strong>$table</strong> NÃO existe</p>";
            $missing_tables[] = $table;
        }
    }
    echo "<hr>";

    // Se tabelas faltando, parar aqui
    if (!empty($missing_tables)) {
        echo "<h2 style='color: red;'>❌ ERRO: Tabelas faltando!</h2>";
        echo "<p>Você precisa rodar o instalador primeiro:</p>";
        echo "<p><a href='/rvcar/install/' target='_blank'>https://bnutech.com.br/rvcar/install/</a></p>";
        exit;
    }

    // Verificar usuários existentes
    echo "<h2>👥 3. Usuários Cadastrados</h2>";
    $stmt = $pdo->query("SELECT id, username, name, created_at FROM admins");
    $users = $stmt->fetchAll();

    if (empty($users)) {
        echo "<p style='color: orange;'>⚠️ Nenhum usuário encontrado no banco!</p>";
    } else {
        echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
        echo "<tr style='background: #f0f0f0;'>";
        echo "<th>ID</th><th>Username</th><th>Nome</th><th>Data Criação</th>";
        echo "</tr>";
        foreach ($users as $user) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($user['id']) . "</td>";
            echo "<td><strong>" . htmlspecialchars($user['username']) . "</strong></td>";
            echo "<td>" . htmlspecialchars($user['name']) . "</td>";
            echo "<td>" . htmlspecialchars($user['created_at']) . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    }
    echo "<hr>";

    // Criar/atualizar usuário admin
    echo "<h2>🔧 4. Criar/Atualizar Usuário Admin</h2>";

    $admin_username = 'admin';
    $admin_password = 'rvcar2024';
    $admin_name = 'Administrador';

    // Verificar se admin existe
    $stmt = $pdo->prepare("SELECT id FROM admins WHERE username = ?");
    $stmt->execute([$admin_username]);
    $existing = $stmt->fetch();

    if ($existing) {
        // Atualizar senha do admin existente
        $hashed = password_hash($admin_password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("UPDATE admins SET password = ?, updated_at = NOW() WHERE username = ?");
        $stmt->execute([$hashed, $admin_username]);

        echo "<p style='color: blue;'>✓ Usuário <strong>admin</strong> já existia.</p>";
        echo "<p style='color: green;'>✓ Senha foi ATUALIZADA para: <strong>rvcar2024</strong></p>";
    } else {
        // Criar novo admin
        $hashed = password_hash($admin_password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("
            INSERT INTO admins (username, password, name, created_at, updated_at) 
            VALUES (?, ?, ?, NOW(), NOW())
        ");
        $stmt->execute([$admin_username, $hashed, $admin_name]);

        echo "<p style='color: green;'>✓ Usuário <strong>admin</strong> foi CRIADO com sucesso!</p>";
        echo "<p style='color: green;'>✓ Senha definida: <strong>rvcar2024</strong></p>";
    }

    echo "<hr>";

    // Testar login
    echo "<h2>🧪 5. Teste de Autenticação</h2>";

    $stmt = $pdo->prepare("SELECT id, username, password, name FROM admins WHERE username = ?");
    $stmt->execute([$admin_username]);
    $user = $stmt->fetch();

    if ($user) {
        echo "<p style='color: green;'>✓ Usuário encontrado no banco</p>";

        // Testar senha
        if (password_verify($admin_password, $user['password'])) {
            echo "<p style='color: green;'>✓ Senha verificada com sucesso!</p>";
            echo "<p style='color: green;'><strong>✅ LOGIN DEVE FUNCIONAR AGORA!</strong></p>";
        } else {
            echo "<p style='color: red;'>✗ Senha não confere!</p>";
            echo "<p>Hash no banco: " . substr($user['password'], 0, 30) . "...</p>";
        }
    } else {
        echo "<p style='color: red;'>✗ Usuário não encontrado!</p>";
    }

    echo "<hr>";

    // Informações finais
    echo "<h2>📝 6. Credenciais de Acesso</h2>";
    echo "<div style='background: #e8f5e9; padding: 20px; border-left: 4px solid #4caf50;'>";
    echo "<p><strong>URL de Login:</strong> <a href='/rvcar/admin/login' target='_blank'>https://bnutech.com.br/rvcar/admin/login</a></p>";
    echo "<p><strong>Usuário:</strong> <code>admin</code></p>";
    echo "<p><strong>Senha:</strong> <code>rvcar2024</code></p>";
    echo "</div>";

    echo "<hr>";
    echo "<h2>⚠️ IMPORTANTE: DELETAR ESTE ARQUIVO!</h2>";
    echo "<p style='color: red;'>Por segurança, <strong>DELETE</strong> este arquivo após o teste:</p>";
    echo "<p><code>/rvcar/api/diagnostico.php</code></p>";
} catch (Exception $e) {
    echo "<h2 style='color: red;'>❌ ERRO</h2>";
    echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p><strong>Verifique:</strong></p>";
    echo "<ul>";
    echo "<li>Arquivo config.php existe</li>";
    echo "<li>Credenciais do banco estão corretas</li>";
    echo "<li>Banco de dados existe</li>";
    echo "</ul>";
}
?>

<style>
    body {
        font-family: Arial, sans-serif;
        max-width: 900px;
        margin: 50px auto;
        padding: 20px;
        background: #f5f5f5;
    }

    h1 {
        color: #333;
        border-bottom: 3px solid #4caf50;
        padding-bottom: 10px;
    }

    h2 {
        color: #555;
        margin-top: 30px;
    }

    code {
        background: #f0f0f0;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
    }

    table {
        width: 100%;
        background: white;
    }
</style>