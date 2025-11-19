-- Migração: Adicionar todas as cores do sistema ao banco de dados
-- Execute este script no MySQL para popular as cores padrão

-- Cores Principais
INSERT INTO site_settings (config_key, config_value) VALUES ('color_primary', '#1a56db') ON DUPLICATE KEY UPDATE config_value = '#1a56db';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_primary_hover', '#1e429f') ON DUPLICATE KEY UPDATE config_value = '#1e429f';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_secondary', '#7c3aed') ON DUPLICATE KEY UPDATE config_value = '#7c3aed';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_accent', '#db2777') ON DUPLICATE KEY UPDATE config_value = '#db2777';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_background', '#ffffff') ON DUPLICATE KEY UPDATE config_value = '#ffffff';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_text', '#1f2937') ON DUPLICATE KEY UPDATE config_value = '#1f2937';

-- Cores dos Botões
INSERT INTO site_settings (config_key, config_value) VALUES ('button_primary_bg', '#1a56db') ON DUPLICATE KEY UPDATE config_value = '#1a56db';
INSERT INTO site_settings (config_key, config_value) VALUES ('button_primary_text', '#ffffff') ON DUPLICATE KEY UPDATE config_value = '#ffffff';
INSERT INTO site_settings (config_key, config_value) VALUES ('button_primary_hover', '#1e429f') ON DUPLICATE KEY UPDATE config_value = '#1e429f';
INSERT INTO site_settings (config_key, config_value) VALUES ('button_secondary_bg', '#6b7280') ON DUPLICATE KEY UPDATE config_value = '#6b7280';
INSERT INTO site_settings (config_key, config_value) VALUES ('button_secondary_text', '#ffffff') ON DUPLICATE KEY UPDATE config_value = '#ffffff';
INSERT INTO site_settings (config_key, config_value) VALUES ('button_secondary_hover', '#4b5563') ON DUPLICATE KEY UPDATE config_value = '#4b5563';

-- Cards e Superfícies
INSERT INTO site_settings (config_key, config_value) VALUES ('color_card', '#ffffff') ON DUPLICATE KEY UPDATE config_value = '#ffffff';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_card_foreground', '#1f2937') ON DUPLICATE KEY UPDATE config_value = '#1f2937';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_popover', '#ffffff') ON DUPLICATE KEY UPDATE config_value = '#ffffff';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_popover_foreground', '#1f2937') ON DUPLICATE KEY UPDATE config_value = '#1f2937';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_muted', '#f3f4f6') ON DUPLICATE KEY UPDATE config_value = '#f3f4f6';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_muted_foreground', '#6b7280') ON DUPLICATE KEY UPDATE config_value = '#6b7280';

-- Bordas e Estados
INSERT INTO site_settings (config_key, config_value) VALUES ('color_border', '#e5e7eb') ON DUPLICATE KEY UPDATE config_value = '#e5e7eb';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_input', '#e5e7eb') ON DUPLICATE KEY UPDATE config_value = '#e5e7eb';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_ring', '#1a56db') ON DUPLICATE KEY UPDATE config_value = '#1a56db';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_destructive', '#ef4444') ON DUPLICATE KEY UPDATE config_value = '#ef4444';
INSERT INTO site_settings (config_key, config_value) VALUES ('color_destructive_foreground', '#ffffff') ON DUPLICATE KEY UPDATE config_value = '#ffffff';

-- Verificar quantos registros foram inseridos/atualizados
SELECT COUNT(*) as total_color_settings FROM site_settings WHERE config_key LIKE 'color_%' OR config_key LIKE 'button_%';
