# ⚡ Instalação Rápida - Novas Funcionalidades Admin

## 1️⃣ Execute o SQL (1 minuto)

1. Abra o phpMyAdmin### Via phpMyAdmin:

2. Selecione o banco `rvcar_db`
3. Vá em "SQL"

4. Clique em "Executar"4. Cole o conteúdo do arquivo `api/site-config.sql`

### Via Linha de Comando:

mysql -u root -p rvcar_db < api/site-config.sql```bash

```










































































**Leia mais:** Consulte `NOVAS-FUNCIONALIDADES-ADMIN.md` para documentação completa.**Tudo funcionando?** 🎉 Comece a personalizar seu site!---- [ ] Consegue criar uma seção de teste- [ ] Consegue salvar uma configuração de teste- [ ] Botões "Configurações" e "Gerenciar Seções" aparecem- [ ] Login no painel funcionando- [ ] 4 tabelas criadas no banco- [ ] SQL executado com sucesso## ✅ Checklist→ Confira se as tabelas existem no banco→ Verifique os logs do PHP### "Erro 500 na API"→ Limpe o cache do navegador (Ctrl+F5)→ Verifique se adicionou as rotas no `src/App.tsx`### "Página não encontrada"→ Confira as credenciais do banco em `api/config.php`→ Verifique se o SQL foi executado corretamente### "Erro ao carregar configurações"## 🐛 Problemas Comuns- **Verificação**: Após executar, verifique se as tabelas foram criadas- **Permissões**: Usuário do banco precisa ter permissão para CREATE TABLE- **Backup**: Faça backup do banco antes de executar o SQL## ⚠️ Importante- ✅ 5 seções da página (Hero, Recursos, Veículos, Sobre, Contato)- ✅ 25+ configurações de site (cores, contatos, branding)- ✅ 4 Tabelas no banco (site_config, page_sections, site_images, config_history)Ao executar o SQL, já são criadas configurações padrão para:## 📝 Configurações Criadas Automaticamente| **Editar Conteúdo** | Gerenciar Seções > Editar | Alterar textos e imagens || **Criar Seções** | Gerenciar Seções > Nova Seção | Adicionar novas seções || **Redes Sociais** | Configurações > Redes Sociais | Links das redes || **Contato** | Configurações > Contato | Telefone, email, WhatsApp || **Preview de Links** | Configurações > Preview Links | Como aparece nas redes sociais || **Paleta de Cores** | Configurações > Cores | Personalizar todas as cores || **Logo e Marca** | Configurações > Marca | Alterar logo, favicon, título ||---------------|------------|-----------|| Funcionalidade | Localização | O que faz |## 🎯 Funcionalidades Principais✅ Reordene as seções✅ Ative/desative seções✅ Crie, edite e exclua seções da página### Gerenciar Seções✅ Personalize a paleta de cores✅ Configure o preview de links para redes sociais✅ Altere a logo, cores e informações de contato### Configurações do Site## 3️⃣ Teste as Funcionalidades   - **"Gerenciar Seções"**   - **"Configurações do Site"**3. Você verá 2 novos botões:2. Login: `admin` / Senha: `rvcar2024`1. Acesse: `http://localhost/rvcar/admin/login`## 2️⃣ Acesse o Painel Admin
```
