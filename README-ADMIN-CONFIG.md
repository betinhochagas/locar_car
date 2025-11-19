# 🎨 Sistema de Configuração do Site - Painel Administrativo

## 🚀 Início Rápido

### 1. Instalar (2 minutos)

```bash
# Execute o SQL
mysql -u root -p rvcar_db < api/site-config.sql

# Acesse o painel
http://localhost/rvcar/admin/login
# Login: admin | Senha: rvcar2024
```

### 2. Usar

- Clique em **"Configurações do Site"** - Configure logo, cores, contatos
- Clique em **"Gerenciar Seções"** - Crie e edite seções da página

---

## 📚 Documentação

| Arquivo                                                                | Descrição               | Para Quem                |
| ---------------------------------------------------------------------- | ----------------------- | ------------------------ |
| [`IMPLEMENTACAO-CONCLUIDA.md`](./IMPLEMENTACAO-CONCLUIDA.md)           | Status da implementação | Gerentes/Desenvolvedores |
| [`INSTALACAO-RAPIDA-ADMIN.md`](./INSTALACAO-RAPIDA-ADMIN.md)           | Guia rápido 2min        | Administradores          |
| [`NOVAS-FUNCIONALIDADES-ADMIN.md`](./NOVAS-FUNCIONALIDADES-ADMIN.md)   | Documentação completa   | Todos                    |
| [`RESUMO-FUNCIONALIDADES-ADMIN.md`](./RESUMO-FUNCIONALIDADES-ADMIN.md) | Resumo executivo        | Gerentes                 |
| [`EXEMPLOS-API-ADMIN.md`](./EXEMPLOS-API-ADMIN.md)                     | Exemplos de código      | Desenvolvedores          |

---

## ✨ Funcionalidades

### 🎨 Configurações do Site

- **Marca**: Logo, favicon, título
- **Cores**: Paleta completa (12 cores)
- **Preview Links**: Open Graph para redes sociais
- **Contato**: Telefone, email, WhatsApp
- **Redes Sociais**: Facebook, Instagram, etc.

### 📄 Gerenciar Seções

- **Criar** novas seções
- **Editar** conteúdo e imagens
- **Excluir** seções não utilizadas
- **Ativar/Desativar** visibilidade
- **Reordenar** ordem de exibição

---

## 🗄️ Banco de Dados

### Script SQL

- **Localização**: `api/site-config.sql`
- **Tabelas criadas**: 4
- **Configurações padrão**: 25+
- **Seções padrão**: 5

### Executar

```bash
mysql -u root -p rvcar_db < api/site-config.sql
```

---

## 🔌 APIs

### Endpoints Disponíveis

**Site Settings**: `/api/site-settings.php`

- GET, POST, PUT, DELETE

**Page Sections**: `/api/page-sections.php`

- GET, POST, PUT, DELETE, PATCH

**Documentação completa**: Ver `EXEMPLOS-API-ADMIN.md`

---

## 📁 Estrutura de Arquivos

```
api/
├── site-config.sql              # Script SQL
├── site-settings.php            # API de configurações
└── page-sections.php            # API de seções

src/
├── types/
│   └── siteConfig.ts           # Tipos TypeScript
├── lib/
│   └── siteConfigManager.ts    # Gerenciador de API
└── pages/
    ├── SiteSettings.tsx         # Página de configurações
    └── PageSections.tsx         # Página de seções
```

---

## 🎯 Casos de Uso

### Para Administradores

1. Alterar logo do site
2. Mudar cores do tema
3. Atualizar informações de contato
4. Criar nova seção na página
5. Editar textos e imagens

### Para Desenvolvedores

1. Integrar com as APIs REST
2. Adicionar novos tipos de seções
3. Customizar editor de conteúdo
4. Implementar upload de imagens
5. Adicionar novas configurações

---

## ✅ Checklist Pós-Instalação

- [ ] SQL executado com sucesso
- [ ] 4 tabelas criadas no banco
- [ ] Login no painel admin funcionando
- [ ] Botões "Configurações" e "Seções" visíveis
- [ ] Consegue salvar uma configuração
- [ ] Consegue criar uma seção

---

## 🐛 Solução de Problemas

| Problema            | Solução                      |
| ------------------- | ---------------------------- |
| Erro ao carregar    | Verifique se executou o SQL  |
| Botões não aparecem | Limpe cache (Ctrl+F5)        |
| Erro 500            | Confira credenciais do banco |
| "Não encontrada"    | Execute o SQL novamente      |

---

## 📊 Tecnologias

- **Backend**: PHP 7.4+, MySQL 5.7+
- **Frontend**: React 18+, TypeScript 5+
- **UI**: Shadcn/UI, Tailwind CSS
- **Comunicação**: REST API, JSON

---

## 🔐 Segurança

- ✅ Prepared statements (SQL Injection)
- ✅ CORS configurado
- ✅ Validação de dados
- ⚠️ Auth básica (melhorar em produção)

---

## 🔮 Próximas Melhorias

1. **Upload de Imagens**

   - Interface de upload
   - Galeria de mídia
   - Redimensionamento automático

2. **Preview ao Vivo**

   - Visualizar antes de publicar
   - Modo de rascunho

3. **Editor Visual**

   - Drag & drop
   - WYSIWYG

4. **Templates**
   - Temas prontos
   - Paletas de cores

---

## 📞 Contato

**Documentação**: Consulte os arquivos `.md` neste diretório  
**APIs**: Ver `EXEMPLOS-API-ADMIN.md`  
**Instalação**: Ver `INSTALACAO-RAPIDA-ADMIN.md`

---

## 📝 Notas

- Sempre faça backup do banco antes de executar SQL
- Em produção, implemente autenticação JWT
- Considere adicionar cache Redis para performance
- Teste em ambiente de desenvolvimento primeiro

---

**Status**: ✅ Implementação Completa  
**Versão**: 2.0.0  
**Data**: 17 de novembro de 2025

---

**Pronto para usar!** 🎉 Comece pelo `INSTALACAO-RAPIDA-ADMIN.md`
