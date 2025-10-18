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

-- Verificar dados inseridos
SELECT COUNT(*) as total_veiculos FROM vehicles;
SELECT * FROM vehicles;
