-- RV Car Solutions - Database Schema
-- Script para criar a estrutura do banco de dados

-- Criar banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS rvcar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar o banco de dados
USE rvcar_db;

-- Remover tabela se já existir (cuidado em produção!)
DROP TABLE IF EXISTS vehicles;

-- Criar tabela de veículos
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir veículos padrão
INSERT INTO vehicles (id, name, price, image, features, available, created_at, updated_at) VALUES
('1', 'Fiat Mobi', 'R$650', '/assets/mobi.jpg', 
 JSON_ARRAY('Econômico', 'Ar Condicionado', 'Direção Hidráulica', 'Perfeito para cidade'),
 TRUE, NOW(), NOW()),

('2', 'Renault Kwid', 'R$650', '/assets/kwid.jpg',
 JSON_ARRAY('Compacto', 'Baixo consumo', 'Moderna tecnologia', 'Fácil manuseio'),
 TRUE, NOW(), NOW()),

('3', 'Fiat Uno', 'R$650', '/assets/uno.jpg',
 JSON_ARRAY('Confiável', 'Peças acessíveis', 'Ótimo custo-benefício', 'Espaçoso'),
 TRUE, NOW(), NOW()),

('4', 'Chevrolet Onix', 'R$700', '/assets/onix.jpg',
 JSON_ARRAY('Modelo popular', 'Conforto superior', 'Tecnologia moderna', 'Bom desempenho'),
 TRUE, NOW(), NOW()),

('5', 'VW Gol', 'R$700', '/assets/gol.jpg',
 JSON_ARRAY('Líder de vendas', 'Confiabilidade', 'Manutenção fácil', 'Design moderno'),
 TRUE, NOW(), NOW()),

('6', 'VW Voyage', 'R$700', '/assets/voyage.jpg',
 JSON_ARRAY('Sedan espaçoso', 'Porta-malas amplo', 'Conforto extra', 'Elegante'),
 TRUE, NOW(), NOW()),

('7', 'Renault Sandero', 'R$700', '/assets/sandero.jpg',
 JSON_ARRAY('Versátil', 'Espaço interno', 'Design arrojado', 'Bom desempenho'),
 TRUE, NOW(), NOW()),

('8', 'Nissan Versa', 'R$700', '/assets/versa.jpg',
 JSON_ARRAY('Sedan premium', 'Espaço superior', 'Tecnologia avançada', 'Conforto total'),
 TRUE, NOW(), NOW());

-- Criar tabela de administradores
DROP TABLE IF EXISTS admins;

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Criar tabela de tokens de autenticação
DROP TABLE IF EXISTS admin_tokens;

CREATE TABLE admin_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir administrador padrão
-- Usuário: admin
-- Senha: rvcar2024
INSERT INTO admins (username, password, name) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador');

-- Verificar dados inseridos
SELECT COUNT(*) as total_veiculos FROM vehicles;
SELECT COUNT(*) as total_admins FROM admins;
SELECT * FROM vehicles;
SELECT id, username, name, created_at FROM admins;
