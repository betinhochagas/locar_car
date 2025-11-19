<?php

/**
 * Sistema de Gestão de Locadora - Instalador Web Completo
 * Versão: 2.0.0
 * 
 * Este instalador configura automaticamente:
 * - Banco de dados MySQL
 * - Tabelas e dados iniciais
 * - Arquivo de configuração
 * - Permissões de arquivos
 * - Testes de conectividade
 */

session_start();

// Configurações do instalador
define('INSTALLER_VERSION', '2.0.0');
define('MIN_PHP_VERSION', '7.4');
define('REQUIRED_EXTENSIONS', ['mysqli', 'json', 'mbstring']);

// Verificar se já foi instalado
$configFile = '../api/config.php';
$lockFile = __DIR__ . '/.installed.lock';

if (file_exists($lockFile) && !isset($_GET['force'])) {
    die('
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Instalação Concluída</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
            .box { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
            .success { color: #22c55e; font-size: 48px; }
            h1 { color: #333; }
            .btn { display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 10px; }
            .btn:hover { background: #2563eb; }
            .warning { background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; color: #92400e; }
        </style>
    </head>
    <body>
        <div class="box">
            <div class="success">✅</div>
            <h1>Instalação já foi concluída!</h1>
            <p>O Sistema de Locadora já está instalado e funcionando.</p>
            <div class="warning">
                <strong>⚠️ Importante:</strong> Por segurança, delete a pasta <code>/install/</code> do servidor!
            </div>
            <a href="../index.html" class="btn">Ir para o Site</a>
            <a href="../api/vehicles.php" class="btn">Testar API</a>
            <a href="?force=1" class="btn" style="background: #ef4444;">Reinstalar (Cuidado!)</a>
        </div>
    </body>
    </html>
    ');
}

// Processar etapa atual
$step = isset($_GET['step']) ? (int)$_GET['step'] : 1;

// Processar formulário
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    switch ($step) {
        case 1:
            // Validar requisitos do sistema
            header('Location: ?step=2');
            exit;

        case 2:
            // Salvar dados do banco
            $_SESSION['db_host'] = $_POST['db_host'] ?? 'localhost';
            $_SESSION['db_name'] = $_POST['db_name'] ?? '';
            $_SESSION['db_user'] = $_POST['db_user'] ?? '';
            $_SESSION['db_pass'] = $_POST['db_pass'] ?? '';
            header('Location: ?step=3');
            exit;

        case 3:
            // Executar instalação
            $result = performInstallation();
            if ($result['success']) {
                header('Location: ?step=4');
            } else {
                $_SESSION['error'] = $result['message'];
                header('Location: ?step=3');
            }
            exit;
    }
}

// Função para verificar requisitos
function checkRequirements()
{
    $checks = [];

    // Versão do PHP
    $checks['php_version'] = [
        'status' => version_compare(PHP_VERSION, MIN_PHP_VERSION, '>='),
        'message' => 'PHP ' . MIN_PHP_VERSION . '+ (Atual: ' . PHP_VERSION . ')',
        'required' => true
    ];

    // Extensões PHP
    foreach (REQUIRED_EXTENSIONS as $ext) {
        $checks['ext_' . $ext] = [
            'status' => extension_loaded($ext),
            'message' => "Extensão PHP: $ext",
            'required' => true
        ];
    }

    // Permissões de escrita
    $checks['writable_api'] = [
        'status' => is_writable('../api') || is_writable('..'),
        'message' => 'Pasta /api/ com permissão de escrita',
        'required' => true
    ];

    return $checks;
}

// Função para criar banco de dados
function performInstallation()
{
    $host = $_SESSION['db_host'] ?? '';
    $dbname = $_SESSION['db_name'] ?? '';
    $user = $_SESSION['db_user'] ?? '';
    $pass = $_SESSION['db_pass'] ?? '';

    try {
        // Conectar ao MySQL
        $conn = new mysqli($host, $user, $pass);

        if ($conn->connect_error) {
            return [
                'success' => false,
                'message' => 'Erro ao conectar: ' . $conn->connect_error
            ];
        }

        // Criar banco de dados se não existir
        $conn->query("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $conn->select_db($dbname);

        // Criar tabela vehicles
        $sql = "CREATE TABLE IF NOT EXISTS `vehicles` (
            `id` VARCHAR(50) PRIMARY KEY,
            `name` VARCHAR(255) NOT NULL,
            `price` VARCHAR(50) NOT NULL,
            `image` TEXT,
            `features` JSON,
            `available` BOOLEAN DEFAULT TRUE NOT NULL,
            `created_at` DATETIME NOT NULL,
            `updated_at` DATETIME NOT NULL,
            INDEX idx_available (available),
            INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        if (!$conn->query($sql)) {
            return [
                'success' => false,
                'message' => 'Erro ao criar tabela vehicles: ' . $conn->error
            ];
        }

        // Criar tabela admins
        $sql = "CREATE TABLE IF NOT EXISTS `admins` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `username` VARCHAR(50) UNIQUE NOT NULL,
            `password` VARCHAR(255) NOT NULL,
            `name` VARCHAR(100) NOT NULL,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
            `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_username (username)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        if (!$conn->query($sql)) {
            return [
                'success' => false,
                'message' => 'Erro ao criar tabela admins: ' . $conn->error
            ];
        }

        // Criar tabela admin_tokens
        $sql = "CREATE TABLE IF NOT EXISTS `admin_tokens` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `admin_id` INT NOT NULL,
            `token` VARCHAR(64) UNIQUE NOT NULL,
            `expires_at` DATETIME NOT NULL,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
            INDEX idx_token (token),
            INDEX idx_expires (expires_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        if (!$conn->query($sql)) {
            return [
                'success' => false,
                'message' => 'Erro ao criar tabela admin_tokens: ' . $conn->error
            ];
        }

        // Criar pasta de uploads
        $uploadsDir = dirname(__DIR__) . '/uploads/vehicles/';
        if (!file_exists($uploadsDir)) {
            if (!mkdir($uploadsDir, 0755, true)) {
                return [
                    'success' => false,
                    'message' => 'Erro ao criar pasta de uploads'
                ];
            }
            // Criar .htaccess na pasta uploads
            file_put_contents(dirname($uploadsDir) . '/.htaccess', "Options -Indexes\n<FilesMatch \"\.(jpg|jpeg|png|gif|webp)$\">\n    Allow from all\n</FilesMatch>");
        }

        // Verificar se já existem admins
        $result = $conn->query("SELECT COUNT(*) as count FROM admins");
        $row = $result->fetch_assoc();

        if ($row['count'] == 0) {
            // Inserir admin padrão (senha: admin123)
            $hashedPassword = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
            $stmt = $conn->prepare("INSERT INTO admins (username, password, name) VALUES (?, ?, ?)");
            $username = 'admin';
            $name = 'Administrador';
            $stmt->bind_param("sss", $username, $hashedPassword, $name);
            $stmt->execute();
            $stmt->close();
        }

        // Verificar se já existem veículos
        $result = $conn->query("SELECT COUNT(*) as count FROM vehicles");
        $row = $result->fetch_assoc();

        if ($row['count'] == 0) {
            // Inserir veículos padrão com novo formato
            $vehicles = [
                ['veh_674e9f1a2b5c8', 'Fiat Mobi', 'R$650', '/placeholder.svg', '["Econômico","Ar Condicionado","Direção Hidráulica","Perfeito para cidade"]'],
                ['veh_674e9f1a2b5c9', 'Renault Kwid', 'R$650', '/placeholder.svg', '["Compacto","Baixo consumo","Moderna tecnologia","Fácil manuseio"]'],
                ['veh_674e9f1a2b5ca', 'Fiat Uno', 'R$650', '/placeholder.svg', '["Confiável","Peças acessíveis","Ótimo custo-benefício","Espaçoso"]'],
                ['veh_674e9f1a2b5cb', 'Chevrolet Onix', 'R$700', '/placeholder.svg', '["Modelo popular","Conforto superior","Tecnologia moderna","Bom desempenho"]'],
                ['veh_674e9f1a2b5cc', 'VW Gol', 'R$700', '/placeholder.svg', '["Líder de vendas","Confiabilidade","Manutenção fácil","Design moderno"]'],
                ['veh_674e9f1a2b5cd', 'VW Voyage', 'R$700', '/placeholder.svg', '["Sedan espaçoso","Porta-malas amplo","Conforto extra","Elegante"]'],
                ['veh_674e9f1a2b5ce', 'Renault Sandero', 'R$700', '/placeholder.svg', '["Versátil","Espaço interno","Design arrojado","Bom desempenho"]'],
                ['veh_674e9f1a2b5cf', 'Nissan Versa', 'R$700', '/placeholder.svg', '["Sedan premium","Espaço superior","Tecnologia avançada","Conforto total"]']
            ];

            $stmt = $conn->prepare("INSERT INTO vehicles (id, name, price, image, features, available, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())");

            foreach ($vehicles as $vehicle) {
                $stmt->bind_param("sssss", $vehicle[0], $vehicle[1], $vehicle[2], $vehicle[3], $vehicle[4]);
                $stmt->execute();
            }

            $stmt->close();
        }

        $conn->close();

        // Criar arquivo config.php
        $configContent = "<?php
/**
 * Sistema de Gestão de Locadora - Configuração do Banco de Dados
 * Gerado automaticamente pelo instalador em: " . date('d/m/Y H:i:s') . "
 */

// Configurações do Banco de Dados
define('DB_HOST', '$host');
define('DB_NAME', '$dbname');
define('DB_USER', '$user');
define('DB_PASS', '$pass');
define('DB_CHARSET', 'utf8mb4');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

/**
 * Função para conectar ao banco de dados usando PDO
 * @return PDO Objeto de conexão PDO
 * @throws Exception Se a conexão falhar
 */
function getDBConnection()
{
    try {
        \$dsn = \"mysql:host=\" . DB_HOST . \";dbname=\" . DB_NAME . \";charset=\" . DB_CHARSET;
        \$options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        \$pdo = new PDO(\$dsn, DB_USER, DB_PASS, \$options);
        return \$pdo;
    } catch (PDOException \$e) {
        error_log(\"Erro de conexão com banco de dados: \" . \$e->getMessage());
        http_response_code(500);
        die(json_encode(['error' => 'Erro ao conectar ao banco de dados']));
    }
}

/**
 * Função para enviar resposta JSON
 * @param mixed \$data Dados a serem enviados
 * @param int \$statusCode Código HTTP de status
 */
function sendResponse(\$data, \$statusCode = 200)
{
    http_response_code(\$statusCode);
    echo json_encode(\$data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

/**
 * Função para enviar erro JSON
 * @param string \$message Mensagem de erro
 * @param int \$statusCode Código HTTP de status
 */
function sendError(\$message, \$statusCode = 400)
{
    http_response_code(\$statusCode);
    echo json_encode([
        'error' => true,
        'message' => \$message
    ], JSON_UNESCAPED_UNICODE);
    exit();
}
";

        $apiDir = dirname(__DIR__) . '/api';
        if (!file_exists($apiDir)) {
            mkdir($apiDir, 0755, true);
        }

        if (!file_put_contents($apiDir . '/config.php', $configContent)) {
            return [
                'success' => false,
                'message' => 'Erro ao criar arquivo de configuração'
            ];
        }

        // Criar arquivo .installed.lock
        file_put_contents(__DIR__ . '/.installed.lock', date('Y-m-d H:i:s'));

        return ['success' => true];
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => 'Erro: ' . $e->getMessage()
        ];
    }
}

// Renderizar interface
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instalador Sistema de Locadora v<?php echo INSTALLER_VERSION; ?></title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 28px;
            margin-bottom: 5px;
        }

        .header p {
            opacity: 0.9;
            font-size: 14px;
        }

        .progress {
            display: flex;
            justify-content: space-between;
            padding: 20px 30px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
        }

        .progress-step {
            flex: 1;
            text-align: center;
            padding: 10px;
            position: relative;
            color: #6c757d;
            font-size: 14px;
        }

        .progress-step.active {
            color: #667eea;
            font-weight: bold;
        }

        .progress-step.completed {
            color: #22c55e;
        }

        .progress-step::before {
            content: attr(data-step);
            display: block;
            width: 40px;
            height: 40px;
            background: #e9ecef;
            color: #6c757d;
            border-radius: 50%;
            line-height: 40px;
            margin: 0 auto 10px;
            font-weight: bold;
        }

        .progress-step.active::before {
            background: #667eea;
            color: white;
        }

        .progress-step.completed::before {
            content: '✓';
            background: #22c55e;
            color: white;
        }

        .content {
            padding: 40px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
            font-size: 14px;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 15px;
            transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: #667eea;
        }

        .form-group small {
            display: block;
            margin-top: 5px;
            color: #6c757d;
            font-size: 13px;
        }

        .check-list {
            list-style: none;
            padding: 0;
        }

        .check-item {
            padding: 15px;
            margin-bottom: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .check-item.success {
            background: #d1fae5;
            border-left: 4px solid #22c55e;
        }

        .check-item.error {
            background: #fee2e2;
            border-left: 4px solid #ef4444;
        }

        .check-icon {
            font-size: 24px;
            margin-right: 15px;
        }

        .btn {
            display: inline-block;
            padding: 14px 30px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            transition: background 0.3s;
        }

        .btn:hover {
            background: #5568d3;
        }

        .btn:disabled {
            background: #cbd5e1;
            cursor: not-allowed;
        }

        .btn-secondary {
            background: #6c757d;
        }

        .btn-secondary:hover {
            background: #5a6268;
        }

        .btn-success {
            background: #22c55e;
        }

        .btn-success:hover {
            background: #16a34a;
        }

        .alert {
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .alert-danger {
            background: #fee2e2;
            color: #991b1b;
            border-left: 4px solid #ef4444;
        }

        .alert-success {
            background: #d1fae5;
            color: #065f46;
            border-left: 4px solid #22c55e;
        }

        .alert-info {
            background: #dbeafe;
            color: #1e40af;
            border-left: 4px solid #3b82f6;
        }

        .footer {
            padding: 20px 40px;
            background: #f8f9fa;
            border-top: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .success-box {
            text-align: center;
            padding: 40px 20px;
        }

        .success-icon {
            font-size: 80px;
            color: #22c55e;
            margin-bottom: 20px;
        }

        .info-box {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #3b82f6;
        }

        .info-box h3 {
            color: #1e40af;
            margin-bottom: 10px;
        }

        .info-box ul {
            margin-left: 20px;
            color: #1e3a8a;
        }

        .code-box {
            background: #1e293b;
            color: #e2e8f0;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            overflow-x: auto;
            margin: 10px 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>🚗 Sistema de Gestão de Locadora</h1>
            <p>Instalador Web - Versão <?php echo INSTALLER_VERSION; ?></p>
        </div>

        <div class="progress">
            <div class="progress-step <?php echo $step >= 1 ? 'completed' : ''; ?> <?php echo $step == 1 ? 'active' : ''; ?>" data-step="1">
                Verificação
            </div>
            <div class="progress-step <?php echo $step >= 3 ? 'completed' : ''; ?> <?php echo $step == 2 ? 'active' : ''; ?>" data-step="2">
                Banco de Dados
            </div>
            <div class="progress-step <?php echo $step >= 4 ? 'completed' : ''; ?> <?php echo $step == 3 ? 'active' : ''; ?>" data-step="3">
                Instalação
            </div>
            <div class="progress-step <?php echo $step == 4 ? 'active completed' : ''; ?>" data-step="4">
                Concluído
            </div>
        </div>

        <div class="content">
            <?php
            switch ($step) {
                case 1:
                    // ETAPA 1: Verificação de requisitos
                    $checks = checkRequirements();
                    $allPassed = true;
                    foreach ($checks as $check) {
                        if ($check['required'] && !$check['status']) {
                            $allPassed = false;
                            break;
                        }
                    }
            ?>
                    <h2>🔍 Verificação do Sistema</h2>
                    <p style="color: #6c757d; margin: 10px 0 30px;">Verificando se o servidor atende aos requisitos mínimos...</p>

                    <ul class="check-list">
                        <?php foreach ($checks as $key => $check): ?>
                            <li class="check-item <?php echo $check['status'] ? 'success' : 'error'; ?>">
                                <div>
                                    <span class="check-icon"><?php echo $check['status'] ? '✅' : '❌'; ?></span>
                                    <strong><?php echo $check['message']; ?></strong>
                                </div>
                                <?php if ($check['required'] && !$check['status']): ?>
                                    <span style="color: #dc2626; font-weight: bold;">OBRIGATÓRIO</span>
                                <?php endif; ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>

                    <?php if (!$allPassed): ?>
                        <div class="alert alert-danger" style="margin-top: 20px;">
                            <strong>⚠️ Atenção!</strong> Alguns requisitos obrigatórios não foram atendidos.
                            Entre em contato com seu provedor de hospedagem para resolver estes problemas.
                        </div>
                    <?php else: ?>
                        <div class="alert alert-success" style="margin-top: 20px;">
                            <strong>✅ Perfeito!</strong> Todos os requisitos foram atendidos. Você pode prosseguir com a instalação.
                        </div>
                    <?php endif; ?>
                <?php
                    break;

                case 2:
                    // ETAPA 2: Configuração do banco de dados
                ?>
                    <h2>🗄️ Configuração do Banco de Dados</h2>
                    <p style="color: #6c757d; margin: 10px 0 30px;">Informe os dados de acesso ao banco de dados MySQL...</p>

                    <div class="info-box">
                        <h3>📋 Onde encontrar essas informações?</h3>
                        <ul>
                            <li><strong>cPanel:</strong> Seção "Bancos de Dados MySQL"</li>
                            <li><strong>Host:</strong> Geralmente é "localhost"</li>
                            <li><strong>Nome do Banco:</strong> Criado no cPanel (ex: usuario_locadora_db)</li>
                            <li><strong>Usuário:</strong> Criado no cPanel (ex: usuario_locadora_user)</li>
                            <li><strong>Senha:</strong> A senha que você definiu ao criar o usuário</li>
                        </ul>
                    </div>

                    <?php if (isset($_SESSION['error'])): ?>
                        <div class="alert alert-danger">
                            <strong>❌ Erro:</strong> <?php echo htmlspecialchars($_SESSION['error']); ?>
                        </div>
                    <?php unset($_SESSION['error']);
                    endif; ?>

                    <form method="POST" id="dbForm">
                        <div class="form-group">
                            <label>Host do Banco de Dados</label>
                            <input type="text" name="db_host" value="localhost" required>
                            <small>Geralmente é "localhost"</small>
                        </div>

                        <div class="form-group">
                            <label>Nome do Banco de Dados</label>
                            <input type="text" name="db_name" placeholder="usuario_locadora_db" required>
                            <small>Nome do banco criado no cPanel</small>
                        </div>

                        <div class="form-group">
                            <label>Usuário do Banco</label>
                            <input type="text" name="db_user" placeholder="usuario_locadora_user" required>
                            <small>Usuário com permissões no banco</small>
                        </div>

                        <div class="form-group">
                            <label>Senha do Banco</label>
                            <input type="password" name="db_pass" placeholder="••••••••" required>
                            <small>Senha do usuário do banco</small>
                        </div>

                        <div class="alert alert-info">
                            <strong>💡 Dica:</strong> Certifique-se de que o usuário tem permissões completas (ALL PRIVILEGES) no banco de dados.
                        </div>
                    </form>
                <?php
                    break;

                case 3:
                    // ETAPA 3: Instalação
                ?>
                    <h2>⚙️ Instalando o Sistema</h2>
                    <p style="color: #6c757d; margin: 10px 0 30px;">Revise as configurações e clique em "Instalar Agora"...</p>

                    <div class="code-box">
                        Host: <?php echo htmlspecialchars($_SESSION['db_host'] ?? 'localhost'); ?><br>
                        Banco: <?php echo htmlspecialchars($_SESSION['db_name'] ?? ''); ?><br>
                        Usuário: <?php echo htmlspecialchars($_SESSION['db_user'] ?? ''); ?><br>
                        Senha: <?php echo str_repeat('•', strlen($_SESSION['db_pass'] ?? '')); ?>
                    </div>

                    <div class="info-box">
                        <h3>📦 O que será instalado?</h3>
                        <ul>
                            <li>✅ Criação do banco de dados (se não existir)</li>
                            <li>✅ Criação da tabela <code>vehicles</code></li>
                            <li>✅ Inserção de 8 veículos padrão</li>
                            <li>✅ Geração do arquivo <code>api/config.php</code></li>
                            <li>✅ Configuração automática de ambiente</li>
                        </ul>
                    </div>

                    <?php if (isset($_SESSION['error'])): ?>
                        <div class="alert alert-danger">
                            <strong>❌ Erro:</strong> <?php echo htmlspecialchars($_SESSION['error']); ?>
                        </div>
                    <?php unset($_SESSION['error']);
                    endif; ?>

                    <form method="POST" id="installForm">
                        <button type="submit" class="btn btn-success" style="width: 100%; font-size: 18px; padding: 18px;">
                            🚀 Instalar Agora
                        </button>
                    </form>

                    <script>
                        document.getElementById('installForm').addEventListener('submit', function(e) {
                            const btn = this.querySelector('button');
                            btn.disabled = true;
                            btn.innerHTML = '⏳ Instalando... Por favor, aguarde...';
                        });
                    </script>
                <?php
                    break;

                case 4:
                    // ETAPA 4: Concluído
                ?>
                    <div class="success-box">
                        <div class="success-icon">🎉</div>
                        <h2 style="color: #22c55e; margin-bottom: 15px;">Instalação Concluída!</h2>
                        <p style="font-size: 16px; color: #6c757d; margin-bottom: 30px;">
                            O Sistema de Locadora foi instalado com sucesso!
                        </p>
                    </div>

                    <div class="alert alert-success">
                        <strong>✅ Sistema Instalado:</strong>
                        <ul style="margin: 10px 0 0 20px;">
                            <li>Banco de dados configurado</li>
                            <li>8 veículos cadastrados</li>
                            <li>API REST funcionando</li>
                            <li>Configuração gerada automaticamente</li>
                        </ul>
                    </div>

                    <div class="info-box">
                        <h3>🔐 Credenciais do Painel Admin</h3>
                        <div class="code-box">
                            URL: <?php echo 'https://' . $_SERVER['HTTP_HOST']; ?>/admin/login<br>
                            Usuário: admin<br>
                            Senha: admin123
                        </div>
                        <p style="margin-top: 10px; color: #dc2626;">
                            <strong>⚠️ IMPORTANTE:</strong> Altere a senha padrão após o primeiro login!
                        </p>
                    </div>

                    <div class="alert alert-danger" style="margin-top: 20px;">
                        <strong>🔒 Segurança:</strong> Por favor, DELETE a pasta <code>/install/</code> do seu servidor imediatamente!
                        Manter o instalador acessível representa um risco de segurança.
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 30px;">
                        <a href="../index.html" class="btn btn-success" style="text-align: center;">
                            🏠 Ir para o Site
                        </a>
                        <a href="../api/vehicles.php" class="btn" style="text-align: center;">
                            🔧 Testar API
                        </a>
                    </div>
            <?php
                    break;
            }
            ?>
        </div>

        <div class="footer">
            <div style="color: #6c757d; font-size: 13px;">
                RV Car Solutions v<?php echo INSTALLER_VERSION; ?> • Instalador Web
            </div>
            <div>
                <?php if ($step > 1 && $step < 4): ?>
                    <a href="?step=<?php echo $step - 1; ?>" class="btn btn-secondary" style="padding: 10px 20px; margin-right: 10px;">
                        ← Voltar
                    </a>
                <?php endif; ?>

                <?php if ($step == 1): ?>
                    <form method="POST" style="display: inline;">
                        <button type="submit" class="btn" style="padding: 10px 20px;" <?php
                                                                                        $checks = checkRequirements();
                                                                                        $allPassed = true;
                                                                                        foreach ($checks as $check) {
                                                                                            if ($check['required'] && !$check['status']) {
                                                                                                $allPassed = false;
                                                                                                break;
                                                                                            }
                                                                                        }
                                                                                        echo !$allPassed ? 'disabled' : '';
                                                                                        ?>>
                            Continuar →
                        </button>
                    </form>
                <?php elseif ($step == 2): ?>
                    <button type="submit" form="dbForm" class="btn" style="padding: 10px 20px;">
                        Continuar →
                    </button>
                <?php endif; ?>
            </div>
        </div>
    </div>
</body>

</html><?php
        // Fechar sessão ao final
        if ($step == 4) {
            session_destroy();
        }
        ?>