# 📋 Guia do Painel Administrativo - RV Car Solutions

## 🔐 Acesso ao Painel

### Credenciais Padrão

- **URL de Acesso:** `https://seu-dominio.com/admin/login`
- **Usuário:** `admin`
- **Senha:** `rvcar2024`

> ⚠️ **IMPORTANTE:** Altere as credenciais padrão após o primeiro acesso! Edite o arquivo `src/types/admin.ts` e reconstrua o projeto.

## 🚗 Gerenciamento de Veículos

### Dashboard Principal

Ao fazer login, você verá:

- **Total de Veículos:** Contador geral
- **Disponíveis:** Veículos ativos no catálogo
- **Indisponíveis:** Veículos temporariamente desativados

### Adicionar Novo Veículo

1. Clique no botão **"Adicionar Veículo"**
2. Preencha os campos:
   - **Nome do Veículo** (obrigatório): Ex: "Fiat Mobi"
   - **Preço por Semana** (obrigatório): Ex: "R$650"
   - **URL da Imagem** (opcional): Cole o link da imagem do veículo
   - **Características**: Lista separada por vírgulas
     ```
     Econômico, Ar Condicionado, Direção Hidráulica
     ```
   - **Status**: Ative/desative "Veículo Disponível"
3. Clique em **"Adicionar Veículo"**

#### 📷 Dicas para Imagens

- Use URLs de imagens hospedadas (Imgur, Cloudinary, etc.)
- Formato recomendado: JPG ou PNG
- Proporção ideal: 4:3 (ex: 800x600px)
- Deixe em branco para usar imagem padrão

### Editar Veículo Existente

1. Localize o veículo no grid
2. Clique no botão **"Editar"**
3. Modifique os campos desejados
4. Clique em **"Salvar Alterações"**

### Marcar como Disponível/Indisponível

**Método 1 - Toggle Rápido:**

- Use o switch "Disponível/Indisponível" no card do veículo

**Método 2 - Durante Edição:**

- Ao editar, marque/desmarque "Veículo Disponível"

#### 🎨 Efeito Visual

Quando marcado como **indisponível**:

- ✓ Imagem fica em **tons de cinza**
- ✓ Badge **"INDISPONÍVEL"** aparece sobre a imagem
- ✓ Opacidade reduzida (60%)
- ✓ Overlay escuro sobre a foto

### Remover Veículo

1. Clique no botão **"Excluir"** (ícone de lixeira)
2. Confirme a exclusão no diálogo
3. ⚠️ **Atenção:** Esta ação não pode ser desfeita!

## 💾 Armazenamento de Dados

### LocalStorage

Os dados são salvos localmente no navegador:

- **Chave:** `rvcar_vehicles`
- **Persistência:** Permanece entre sessões
- **Limitação:** ~5-10MB por domínio

### Veículos Padrão

O sistema inclui 8 veículos pré-cadastrados:

1. Fiat Mobi - R$650/sem
2. Renault Kwid - R$650/sem
3. Fiat Uno - R$650/sem
4. Chevrolet Onix - R$700/sem
5. VW Gol - R$700/sem
6. VW Voyage - R$700/sem
7. Renault Sandero - R$700/sem
8. Nissan Versa - R$700/sem

### Backup e Restauração

#### Fazer Backup Manual

```javascript
// No console do navegador (F12)
const backup = localStorage.getItem("rvcar_vehicles");
console.log(backup);
// Copie o JSON exibido e salve em arquivo
```

#### Restaurar Backup

```javascript
// No console do navegador (F12)
const backupData = `[{"id":"1",...}]`; // Cole seu backup
localStorage.setItem("rvcar_vehicles", backupData);
location.reload();
```

#### Resetar para Padrão

```javascript
// Remove dados customizados, volta aos veículos padrão
localStorage.removeItem("rvcar_vehicles");
location.reload();
```

## 🔒 Segurança

### Autenticação

- Baseada em localStorage: `rvcar_admin_auth`
- Válida apenas na sessão do navegador
- Fazer logout limpa o token

### Alterando Credenciais

**Arquivo:** `src/types/admin.ts`

```typescript
export const DEFAULT_ADMIN: AdminCredentials = {
  username: "seu_novo_usuario",
  password: "sua_senha_segura_123",
};
```

**Após alterar:**

```bash
npm run build
# Faça deploy da nova versão
```

### Recomendações de Segurança

1. ✅ Altere as credenciais padrão
2. ✅ Use senha forte (8+ caracteres, números e símbolos)
3. ✅ Não compartilhe as credenciais
4. ✅ Faça logout após usar
5. ⚠️ Este sistema é adequado para uso interno básico
6. ⚠️ Para produção crítica, considere backend com API

## 🌐 Sincronização entre Dispositivos

> ⚠️ **Importante:** LocalStorage é específico por navegador/dispositivo

**Cenário:**

- Você adiciona veículos no desktop
- Acessa no celular → **Não verá as mudanças**

**Soluções:**

1. **Backup/Restauração:** Use os comandos acima
2. **Backend Futuro:** Considere implementar API com banco de dados

## 🎯 Fluxo de Trabalho Recomendado

### Adição de Novo Veículo

```
1. Tire foto do veículo em boa qualidade
2. Hospede a imagem (Imgur, Cloudinary)
3. Acesse /admin/login
4. Adicionar Veículo → Preencha dados
5. Salve e verifique no catálogo público
```

### Manutenção Semanal

```
1. Revise status de disponibilidade
2. Atualize preços se necessário
3. Remova veículos vendidos
4. Adicione novos veículos ao estoque
5. Faça backup mensal dos dados
```

### Temporada Alta

```
1. Marque veículos alugados como "Indisponível"
2. Mantenha-os no catálogo (aparecem em cinza)
3. Quando devolvidos, ative novamente
```

## 📱 Uso em Dispositivos Móveis

O dashboard é **totalmente responsivo**:

- ✓ Funciona em smartphones
- ✓ Layout adaptado para tablets
- ✓ Touch-friendly (botões grandes)
- ✓ Formulários otimizados para mobile

## 🆘 Solução de Problemas

### "Não consigo fazer login"

- Verifique se está usando as credenciais corretas
- Limpe cache do navegador: Ctrl+Shift+Del
- Tente modo anônimo/privado

### "Veículos não aparecem no site"

- Verifique se marcou como "Disponível"
- Atualize a página (F5)
- Limpe cache do navegador

### "Perdi todos os veículos"

- Acontece ao limpar dados do navegador
- Restaure do backup (se tiver)
- Ou recadastre manualmente

### "Imagem não carrega"

- Verifique se a URL está correta
- Teste a URL em nova aba
- Use serviço de hospedagem confiável
- Considere usar CDN (Cloudinary, Imgur)

## 🔄 Atualizações Futuras

Recursos planejados:

- [ ] Autenticação com backend seguro
- [ ] Upload direto de imagens
- [ ] Histórico de alterações
- [ ] Relatórios de locações
- [ ] Integração com WhatsApp Business API
- [ ] Multi-usuário com permissões

## 📞 Suporte

Para dúvidas ou problemas:

- Consulte este guia primeiro
- Verifique o arquivo README.md principal
- Contate o desenvolvedor: betinhochagas@github

---

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2024
