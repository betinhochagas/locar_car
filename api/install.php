<?php

/**
 * RV Car Solutions - Instalador do Banco de Dados
 * 
 * Este script cria o banco de dados e a tabela de veículos automaticamente.
 * Acesse: http://localhost/rvcar-api/install.php
 * 
 * IMPORTANTE: Delete este arquivo após a instalação em produção!
 */

// Configuração temporária para instalação
// Aceita localhost, IPs locais e qualquer porta local
$host_check = $_SERVER['HTTP_HOST'];
$isLocal = (
    in_array($host_check, ['localhost', '127.0.0.1', 'localhost:8080', 'localhost:3000']) ||
    preg_match('/^192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/', $host_check) ||
    preg_match('/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/', $host_check) ||
    preg_match('/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}(:\d+)?$/', $host_check)
);

if ($isLocal) {
    // Local (XAMPP)
    $host = 'localhost';
    $user = 'root';
    $pass = '';
    $dbname = 'rvcar_db';
} else {
    // Produção (cPanel) - ALTERE ESTES VALORES!
    $host = 'localhost';
    $user = 'seu_usuario';
    $pass = 'sua_senha';
    $dbname = 'seu_usuario_rvcar';
}

?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RV Car - Instalador do Banco de Dados</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            max-width: 600px;
            width: 100%;
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }

        .log {
            background: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            max-height: 400px;
            overflow-y: auto;
        }

        .success {
            color: #22c55e;
            font-weight: bold;
        }

        .error {
            color: #ef4444;
            font-weight: bold;
        }

        .info {
            color: #3b82f6;
        }

        .warning {
            color: #f59e0b;
            font-weight: bold;
        }

        .step {
            margin: 10px 0;
            padding-left: 20px;
        }

        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s;
            width: 100%;
            margin-top: 20px;
        }

        button:hover {
            background: #5568d3;
        }

        button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .config-box {
            background: #fef3c7;
            border: 2px solid #fbbf24;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
        }

        .config-box strong {
            color: #92400e;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🚗 RV Car Solutions</h1>
        <p class="subtitle">Instalador do Banco de Dados</p>

        <?php if (!isset($_POST['install'])): ?>

            <div class="config-box">
                <strong>⚙️ Configuração Detectada:</strong><br>
                <div style="margin-top: 10px; font-family: monospace;">
                    Host: <?php echo $host; ?><br>
                    Usuário: <?php echo $user; ?><br>
                    Banco: <?php echo $dbname; ?><br>
                    Ambiente: <?php echo $isLocal ? '🏠 Local (XAMPP)' : '🌐 Produção (cPanel)'; ?>
                </div>
            </div>

            <?php if (!$isLocal): ?>
                <div class="config-box" style="background: #fee2e2; border-color: #ef4444;">
                    <strong style="color: #991b1b;">⚠️ ATENÇÃO:</strong><br>
                    Você está em produção! Verifique se as configurações acima estão corretas.
                    Edite o arquivo <code>install.php</code> se necessário.
                </div>
            <?php endif; ?>

            <form method="POST">
                <button type="submit" name="install">
                    🚀 Instalar Banco de Dados
                </button>
            </form>

            <div class="log" style="margin-top: 20px; background: #eff6ff;">
                <div class="info">📋 O instalador irá:</div>
                <div class="step">1. Conectar ao MySQL</div>
                <div class="step">2. Criar banco de dados "<?php echo $dbname; ?>"</div>
                <div class="step">3. Criar tabela "vehicles"</div>
                <div class="step">4. Inserir 8 veículos padrão</div>
                <div class="step">5. Verificar instalação</div>
            </div>

        <?php else: ?>

            <div class="log">
                <?php
                $success = true;

                try {
                    echo "<div class='info'>🔌 Conectando ao MySQL...</div>";

                    // Conectar sem selecionar banco (para criar o banco)
                    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass);
                    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    echo "<div class='success'>✓ Conectado com sucesso!</div>";

                    // Criar banco de dados
                    echo "<div class='info'>📦 Criando banco de dados '$dbname'...</div>";
                    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                    echo "<div class='success'>✓ Banco de dados criado!</div>";

                    // Selecionar banco
                    $pdo->exec("USE `$dbname`");

                    // Criar tabela
                    echo "<div class='info'>🗂️ Criando tabela 'vehicles'...</div>";
                    $pdo->exec("DROP TABLE IF EXISTS vehicles");
                    $pdo->exec("
                        CREATE TABLE vehicles (
                            id VARCHAR(50) PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            price VARCHAR(50) NOT NULL,
                            image TEXT,
                            features JSON,
                            available BOOLEAN DEFAULT TRUE NOT NULL,
                            created_at DATETIME NOT NULL,
                            updated_at DATETIME NOT NULL,
                            INDEX idx_available (available),
                            INDEX idx_created_at (created_at)
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
                    ");
                    echo "<div class='success'>✓ Tabela criada!</div>";

                    // Inserir veículos padrão
                    echo "<div class='info'>🚗 Inserindo veículos padrão...</div>";

                    $vehicles = [
                        [
                            '1',
                            'Fiat Mobi',
                            'R$650',
                            '/assets/mobi.jpg',
                            '["Econômico", "Ar Condicionado", "Direção Hidráulica", "Perfeito para cidade"]'
                        ],
                        [
                            '2',
                            'Renault Kwid',
                            'R$650',
                            '/assets/kwid.jpg',
                            '["Compacto", "Baixo consumo", "Moderna tecnologia", "Fácil manuseio"]'
                        ],
                        [
                            '3',
                            'Fiat Uno',
                            'R$650',
                            '/assets/uno.jpg',
                            '["Confiável", "Peças acessíveis", "Ótimo custo-benefício", "Espaçoso"]'
                        ],
                        [
                            '4',
                            'Chevrolet Onix',
                            'R$700',
                            '/assets/onix.jpg',
                            '["Modelo popular", "Conforto superior", "Tecnologia moderna", "Bom desempenho"]'
                        ],
                        [
                            '5',
                            'VW Gol',
                            'R$700',
                            '/assets/gol.jpg',
                            '["Líder de vendas", "Confiabilidade", "Manutenção fácil", "Design moderno"]'
                        ],
                        [
                            '6',
                            'VW Voyage',
                            'R$700',
                            '/assets/voyage.jpg',
                            '["Sedan espaçoso", "Porta-malas amplo", "Conforto extra", "Elegante"]'
                        ],
                        [
                            '7',
                            'Renault Sandero',
                            'R$700',
                            '/assets/sandero.jpg',
                            '["Versátil", "Espaço interno", "Design arrojado", "Bom desempenho"]'
                        ],
                        [
                            '8',
                            'Nissan Versa',
                            'R$700',
                            '/assets/versa.jpg',
                            '["Sedan premium", "Espaço superior", "Tecnologia avançada", "Conforto total"]'
                        ]
                    ];

                    $stmt = $pdo->prepare("
                        INSERT INTO vehicles (id, name, price, image, features, available, created_at, updated_at)
                        VALUES (?, ?, ?, ?, ?, TRUE, NOW(), NOW())
                    ");

                    foreach ($vehicles as $vehicle) {
                        $stmt->execute($vehicle);
                        echo "<div class='step'>✓ {$vehicle[1]} - {$vehicle[2]}</div>";
                    }

                    echo "<div class='success'>✓ Todos os veículos inseridos!</div>";

                    // Verificar
                    echo "<div class='info'>🔍 Verificando instalação...</div>";
                    $count = $pdo->query("SELECT COUNT(*) FROM vehicles")->fetchColumn();
                    echo "<div class='success'>✓ Total de veículos no banco: $count</div>";

                    echo "<div class='success' style='margin-top: 20px; padding: 15px; background: #d1fae5; border-radius: 6px;'>";
                    echo "🎉 <strong>Instalação concluída com sucesso!</strong><br><br>";
                    echo "✅ Banco de dados: $dbname<br>";
                    echo "✅ Tabela: vehicles<br>";
                    echo "✅ Veículos: $count cadastrados<br><br>";
                    echo "<strong>Próximos passos:</strong><br>";
                    echo "1. Teste a API: <a href='vehicles.php' target='_blank'>vehicles.php</a><br>";
                    echo "2. Configure o frontend React<br>";
                    echo "3. <span style='color: #dc2626;'>⚠️ DELETE este arquivo (install.php) em produção!</span>";
                    echo "</div>";
                } catch (PDOException $e) {
                    $success = false;
                    echo "<div class='error'>❌ Erro: " . $e->getMessage() . "</div>";
                    echo "<div class='warning'>💡 Verifique suas configurações de banco de dados.</div>";
                }
                ?>
            </div>

            <?php if ($success): ?>
                <a href="vehicles.php" style="display: block; text-align: center; margin-top: 20px; color: #667eea; text-decoration: none; font-weight: bold;">
                    🔗 Testar API →
                </a>
            <?php else: ?>
                <a href="install.php" style="display: block; text-align: center; margin-top: 20px; color: #667eea; text-decoration: none; font-weight: bold;">
                    🔄 Tentar Novamente
                </a>
            <?php endif; ?>

        <?php endif; ?>
    </div>
</body>

</html>