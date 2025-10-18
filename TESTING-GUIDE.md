# 🧪 Guia de Testes - Painel Administrativo

## 🌐 Acesso Local

O servidor de desenvolvimento está rodando em:

- **Local:** http://localhost:8080/
- **Rede:** http://192.168.15.163:8080/

## 🔑 Credenciais de Acesso

```
URL: http://localhost:8080/admin/login
Usuário: admin
Senha: rvcar2024
```

---

## ✅ Checklist de Testes

### 1️⃣ Login e Autenticação

- [ ] Acesse `http://localhost:8080/admin/login`
- [ ] Insira as credenciais: `admin` / `rvcar2024`
- [ ] Clique em "Entrar"
- [ ] Verifique se foi redirecionado para `/admin/dashboard`
- [ ] Clique em "Sair" e confirme logout
- [ ] Tente acessar `/admin/dashboard` sem login (deve redirecionar)

### 2️⃣ Dashboard - Estatísticas

- [ ] Faça login novamente
- [ ] Verifique os 3 cards de estatísticas:
  - Total de Veículos: **8**
  - Disponíveis: **8** (ou menos se modificou)
  - Indisponíveis: **0** (ou mais se modificou)

### 3️⃣ Visualização dos Veículos

- [ ] Verifique se todos os 8 veículos aparecem no grid
- [ ] Confirme que as imagens carregam corretamente
- [ ] Verifique se os preços estão corretos
- [ ] Teste o switch "Disponível/Indisponível" em um veículo
- [ ] Confirme que o contador de estatísticas atualiza

### 4️⃣ Adicionar Novo Veículo

#### Teste 1: Veículo Completo

- [ ] Clique em "Adicionar Veículo"
- [ ] Preencha todos os campos:
  ```
  Nome: Fiat Argo
  Preço: R$750
  URL Imagem: https://example.com/argo.jpg (ou deixe vazio)
  Características: Moderno, Multimídia, Sensor de ré
  Disponível: ✓ (marcado)
  ```
- [ ] Clique em "Adicionar Veículo"
- [ ] Verifique se aparece toast de sucesso
- [ ] Confirme que o veículo aparece no grid
- [ ] Verifique se o contador "Total" incrementou

#### Teste 2: Veículo Sem Imagem

- [ ] Adicione outro veículo sem URL de imagem
- [ ] Confirme que usa imagem placeholder

#### Teste 3: Validação de Campos

- [ ] Tente adicionar veículo sem nome
- [ ] Tente adicionar veículo sem preço
- [ ] Confirme que mostra erro de validação

### 5️⃣ Editar Veículo Existente

- [ ] Localize o "Fiat Mobi" no grid
- [ ] Clique no botão "Editar"
- [ ] Modifique o preço para `R$680`
- [ ] Adicione uma característica: `GPS incluído`
- [ ] Clique em "Salvar Alterações"
- [ ] Confirme toast de sucesso
- [ ] Verifique se as alterações aparecem no card

### 6️⃣ Controle de Disponibilidade

#### Método 1: Switch no Card

- [ ] Localize qualquer veículo disponível
- [ ] Clique no switch para desativar
- [ ] Confirme toast: "Veículo marcado como indisponível"
- [ ] Verifique efeitos visuais:
  - [ ] Imagem em tons de cinza
  - [ ] Badge "INDISPONÍVEL" sobre a imagem
  - [ ] Opacidade reduzida
  - [ ] Overlay escuro
- [ ] Contador "Indisponíveis" incrementou
- [ ] Contador "Disponíveis" decrementou
- [ ] Clique novamente no switch para reativar
- [ ] Confirme que voltou ao normal

#### Método 2: Durante Edição

- [ ] Clique em "Editar" em outro veículo
- [ ] Desmarque "Veículo Disponível"
- [ ] Salve as alterações
- [ ] Confirme efeito grayscale aplicado

### 7️⃣ Excluir Veículo

- [ ] Localize um veículo qualquer
- [ ] Clique no botão "Excluir" (ícone de lixeira)
- [ ] Confirme que abre diálogo de confirmação
- [ ] Clique em "Cancelar" → nada deve acontecer
- [ ] Clique em "Excluir" novamente
- [ ] Desta vez clique em "Excluir" na confirmação
- [ ] Confirme toast de sucesso
- [ ] Verifique que o veículo sumiu do grid
- [ ] Contador "Total" decrementou

### 8️⃣ Visualização no Site Público

- [ ] No dashboard, clique no botão "Site" no header
- [ ] Verifique se redireciona para a homepage
- [ ] Role até a seção "Nossos Veículos"
- [ ] Confirme que os veículos do admin aparecem aqui
- [ ] Localize um veículo **indisponível** que você marcou
- [ ] Verifique os efeitos visuais:
  - [ ] Imagem em grayscale (tons de cinza)
  - [ ] Badge "INDISPONÍVEL" vermelho
  - [ ] Opacidade reduzida
  - [ ] Overlay escuro
- [ ] Confirme que veículos disponíveis aparecem normais

### 9️⃣ Persistência de Dados

- [ ] Faça logout
- [ ] Feche o navegador completamente
- [ ] Abra novamente
- [ ] Faça login
- [ ] Confirme que todas as alterações foram mantidas
- [ ] Veículos adicionados estão lá
- [ ] Veículos editados mantém mudanças
- [ ] Veículos excluídos continuam excluídos
- [ ] Status de disponibilidade mantido

### 🔟 Responsividade Mobile

#### Desktop (1920px+)

- [ ] Redimensione o navegador para tela cheia
- [ ] Grid deve mostrar 4 veículos por linha
- [ ] Formulário com campos lado a lado

#### Tablet (768px - 1919px)

- [ ] Redimensione para ~1024px
- [ ] Grid deve mostrar 2-3 veículos por linha
- [ ] Interface adaptada

#### Mobile (< 768px)

- [ ] Abra DevTools (F12) → Toggle device toolbar
- [ ] Selecione iPhone ou Android
- [ ] Teste em modo retrato (portrait)
  - [ ] Menu funciona
  - [ ] Grid 1 veículo por linha
  - [ ] Botões grandes e clicáveis
  - [ ] Formulário em coluna única
- [ ] Teste em modo paisagem (landscape)
  - [ ] Interface se adapta

---

## 🎯 Cenários de Uso Real

### Cenário 1: Veículo Alugado

```
Situação: Cliente alugou o "Fiat Mobi"
Ação:
1. Login no admin
2. Localizar "Fiat Mobi"
3. Clicar no switch para "Indisponível"
4. Verificar no site público → aparece em cinza

Resultado Esperado:
✓ Clientes veem que está indisponível
✓ Veículo continua no catálogo
✓ Fácil de reativar quando devolvido
```

### Cenário 2: Novo Veículo na Frota

```
Situação: Comprou um VW Polo 2024
Ação:
1. Tirar foto do veículo
2. Hospedar no Imgur/Cloudinary
3. Login no admin
4. "Adicionar Veículo"
5. Preencher dados do Polo
6. Salvar

Resultado Esperado:
✓ Polo aparece imediatamente no site
✓ Clientes podem ver e solicitar orçamento
✓ Sem necessidade de deploy
```

### Cenário 3: Mudança de Preço

```
Situação: Reduzir preço do Kwid para promoção
Ação:
1. Login no admin
2. Editar "Renault Kwid"
3. Mudar de R$650 para R$599
4. Salvar

Resultado Esperado:
✓ Preço atualiza no catálogo
✓ Mudança instantânea
```

### Cenário 4: Veículo Vendido

```
Situação: Vendeu o "Nissan Versa"
Ação:
1. Login no admin
2. Localizar "Nissan Versa"
3. Clicar em "Excluir"
4. Confirmar exclusão

Resultado Esperado:
✓ Versa some do catálogo
✓ Contador atualiza
✓ Site público não mostra mais
```

---

## 🐛 Testes de Bugs Comuns

### Teste 1: Campos Vazios

- [ ] Tente adicionar veículo sem preencher nada
- [ ] Deve mostrar erro de validação

### Teste 2: Múltiplos Logins

- [ ] Abra 2 abas do navegador
- [ ] Faça login nas duas
- [ ] Adicione veículo na aba 1
- [ ] Recarregue aba 2 (F5)
- [ ] Confirme que vê o novo veículo

### Teste 3: LocalStorage Cheio

- [ ] Adicione 50+ veículos rapidamente
- [ ] Verifique se continua funcionando
- [ ] (LocalStorage limite: ~5-10MB)

### Teste 4: Logout Durante Edição

- [ ] Abra formulário de edição
- [ ] Em outra aba, faça logout
- [ ] Volte para a aba com formulário
- [ ] Tente salvar → deve redirecionar para login

### Teste 5: URLs de Imagem Inválidas

- [ ] Adicione veículo com URL quebrada
- [ ] Confirme que mostra placeholder/erro gracioso

---

## 📊 Backup Manual (Teste)

### Fazer Backup

1. Pressione `F12` para abrir DevTools
2. Vá para Console
3. Cole e execute:

```javascript
const backup = localStorage.getItem("rvcar_vehicles");
console.log(backup);
```

4. Copie o JSON exibido
5. Salve em arquivo `backup.json`

### Restaurar Backup

1. Pressione `F12` → Console
2. Cole e execute (substitua `...` pelo JSON):

```javascript
const backupData = '[{"id":"1",...}]';
localStorage.setItem("rvcar_vehicles", backupData);
location.reload();
```

### Resetar para Padrão

```javascript
localStorage.removeItem("rvcar_vehicles");
location.reload();
```

---

## ✅ Checklist Final

Antes de considerar os testes completos:

- [ ] Todos os 10 testes principais passaram
- [ ] Testado em desktop (Chrome/Firefox/Edge)
- [ ] Testado em mobile (DevTools ou dispositivo real)
- [ ] Testado em tablet (se disponível)
- [ ] Login/logout funcionando
- [ ] CRUD completo testado
- [ ] Efeito grayscale funcionando
- [ ] Persistência confirmada
- [ ] Site público atualiza corretamente
- [ ] Nenhum erro no console (F12)

---

## 🚀 Após Testes

### Se tudo funcionou:

1. ✅ Commit das mudanças
2. ✅ Push para GitHub
3. ✅ Deploy no Vercel/Netlify
4. ✅ Testar no ambiente de produção

### Se encontrou bugs:

1. 🐛 Anotar o problema
2. 🐛 Descrever passos para reproduzir
3. 🐛 Reportar para correção

---

## 📞 Suporte

**Em caso de dúvidas durante os testes:**

- Consulte [ADMIN-GUIDE.md](./ADMIN-GUIDE.md)
- Verifique [ADMIN-IMPLEMENTATION.md](./ADMIN-IMPLEMENTATION.md)
- Abra issue no GitHub

**Console útil (F12):**

```javascript
// Ver veículos atuais
console.log(JSON.parse(localStorage.getItem("rvcar_vehicles")));

// Ver status de auth
console.log(localStorage.getItem("rvcar_admin_auth"));

// Limpar tudo
localStorage.clear();
```

---

**Bons testes! 🧪✨**
