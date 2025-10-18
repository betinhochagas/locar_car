# 🧪 Guia Rápido de Teste - Modal de Consultor

## ✅ Checklist de Testes

### 1️⃣ Teste do Botão Principal

```
📍 Localização: Seção Hero (topo da página)
🎯 Ação: Clicar em "Fale com um Consultor"
✅ Esperado: Modal de seleção abre
```

---

### 2️⃣ Teste do Modal de Seleção

**Visual:**

- [ ] Logo da RV Car aparece no topo
- [ ] Dois cards grandes (Alugar e Investir)
- [ ] Cores corretas (amarelo e azul)
- [ ] Ícones 🚗 e 💰 visíveis
- [ ] Hover effect funciona nos cards
- [ ] Botão X fecha o modal
- [ ] Clicar fora fecha o modal

**Funcional:**

- [ ] Clicar em "Alugar" abre RentalModal
- [ ] Clicar em "Investir" abre InvestmentModal
- [ ] ESC fecha o modal

---

### 3️⃣ Teste do Modal de Aluguel

#### Cabeçalho Fixo

- [ ] Logo aparece
- [ ] Título "Aluguel de Veículos"
- [ ] Descrição legível
- [ ] Background amarelo gradient
- [ ] Ao rolar, cabeçalho fica fixo no topo

#### Formulário

- [ ] Campo "Nome Completo" funciona
- [ ] Campo "Telefone" tem máscara: (00) 00000-0000
- [ ] Campo "E-mail" valida formato
- [ ] Select "Qual carro deseja?" lista veículos disponíveis
- [ ] Todos os campos têm labels visíveis
- [ ] Placeholders estão corretos

#### Validações

- [ ] Enviar vazio mostra erros
- [ ] Email inválido mostra erro (ex: `teste@`)
- [ ] Telefone incompleto mostra erro
- [ ] Nome muito curto (<3 chars) mostra erro
- [ ] Veículo não selecionado mostra erro

#### WhatsApp

- [ ] Preencher tudo e clicar em "Falar com um Consultor"
- [ ] WhatsApp abre em nova aba
- [ ] Número correto: +5547984485492
- [ ] Mensagem formatada corretamente:

  ```
  🚗 *Solicitação de Aluguel - RV Car*

  👤 *Nome:* [seu nome]
  📱 *Telefone:* [seu telefone]
  📧 *E-mail:* [seu email]
  🚘 *Veículo desejado:* [veículo]

  Gostaria de mais informações sobre o aluguel deste veículo.
  ```

---

### 4️⃣ Teste do Modal de Investimento

#### Cabeçalho Fixo

- [ ] Logo aparece
- [ ] Título "Investimento em Veículos"
- [ ] Descrição legível
- [ ] Background azul gradient
- [ ] Ao rolar, cabeçalho fica fixo no topo

#### Formulário

- [ ] Campo "Nome Completo" funciona
- [ ] Campo "Telefone" tem máscara: (00) 00000-0000
- [ ] Campo "E-mail" valida formato
- [ ] Campo "Marca do Veículo" funciona
- [ ] Campo "Modelo do Veículo" funciona
- [ ] Campo "Ano do Veículo" aceita 4 dígitos
- [ ] Todos os campos têm labels visíveis

#### Validações

- [ ] Enviar vazio mostra erros
- [ ] Email inválido mostra erro
- [ ] Telefone incompleto mostra erro
- [ ] Nome muito curto mostra erro
- [ ] Marca muito curta mostra erro
- [ ] Modelo muito curto mostra erro
- [ ] Ano < 1900 mostra erro
- [ ] Ano > 2025 mostra erro

#### WhatsApp

- [ ] Preencher tudo e clicar em "Falar com um Consultor"
- [ ] WhatsApp abre em nova aba
- [ ] Número correto: +5547984485492
- [ ] Mensagem formatada corretamente:

  ```
  💰 *Proposta de Investimento - RV Car*

  👤 *Nome:* [seu nome]
  📱 *Telefone:* [seu telefone]
  📧 *E-mail:* [seu email]

  🚘 *Veículo para investimento:*
     • Marca: [marca]
     • Modelo: [modelo]
     • Ano: [ano]

  Tenho interesse em investir meu veículo na frota de locação.
  ```

---

### 5️⃣ Teste de Responsividade

#### Desktop (>1024px)

- [ ] Modais centralizados
- [ ] Largura adequada
- [ ] Texto legível
- [ ] Espaçamentos corretos
- [ ] Grid de 2 colunas nos cards de seleção

#### Tablet (768px - 1024px)

- [ ] Layout adapta
- [ ] Formulários empilham
- [ ] Botões em tamanho adequado
- [ ] Scroll funciona

#### Mobile (<768px)

- [ ] Modal ocupa largura total (com margem)
- [ ] Campos empilham verticalmente
- [ ] Botões em largura total
- [ ] Cabeçalho fixo não obstrui conteúdo
- [ ] Scroll suave
- [ ] Teclado virtual não quebra layout

---

### 6️⃣ Teste de Navegação

#### Fluxo Completo - Aluguel

1. [ ] Hero → "Fale com um Consultor"
2. [ ] Modal Seleção → "Alugar um Veículo"
3. [ ] RentalModal → Preencher formulário
4. [ ] RentalModal → "Falar com um Consultor"
5. [ ] WhatsApp abre com dados corretos
6. [ ] Fechar modais funciona

#### Fluxo Completo - Investimento

1. [ ] Hero → "Fale com um Consultor"
2. [ ] Modal Seleção → "Investir em Veículos"
3. [ ] InvestmentModal → Preencher formulário
4. [ ] InvestmentModal → "Falar com um Consultor"
5. [ ] WhatsApp abre com dados corretos
6. [ ] Fechar modais funciona

#### Voltar e Trocar

1. [ ] Abrir RentalModal
2. [ ] Fechar e abrir InvestmentModal
3. [ ] Dados não vazam entre modais
4. [ ] Estados independentes funcionam

---

### 7️⃣ Teste de Performance

- [ ] Modal abre instantaneamente (<100ms)
- [ ] Animações suaves (sem lag)
- [ ] Scroll do modal é fluido
- [ ] Não há freeze ao abrir
- [ ] Fechar é instantâneo

---

### 8️⃣ Teste de Acessibilidade

- [ ] Tab navega pelos campos
- [ ] Enter envia formulário
- [ ] ESC fecha modal
- [ ] Labels associados aos inputs
- [ ] Placeholders descritivos
- [ ] Mensagens de erro visíveis
- [ ] Cores com contraste adequado

---

### 9️⃣ Teste de Browsers

#### Desktop

- [ ] Google Chrome (último)
- [ ] Mozilla Firefox (último)
- [ ] Microsoft Edge (último)
- [ ] Safari (Mac, se disponível)

#### Mobile

- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet (Android)

---

### 🔟 Teste de Edge Cases

#### Dados Extremos

- [ ] Nome com 100+ caracteres
- [ ] Email muito longo
- [ ] Marca/Modelo com caracteres especiais
- [ ] Ano com letras (deve bloquear)

#### Ações Rápidas

- [ ] Clicar múltiplas vezes no botão
- [ ] Abrir e fechar rapidamente
- [ ] Preencher e limpar campos
- [ ] Alternar entre modais rapidamente

#### Conexão

- [ ] Testar sem internet (deve tentar abrir WhatsApp)
- [ ] Testar com internet lenta
- [ ] Testar em rede móvel

---

## 🐛 Problemas Comuns e Soluções

### Modal não abre

**Problema:** Clico no botão e nada acontece  
**Solução:**

1. Abra o console (F12)
2. Veja se há erros JavaScript
3. Verifique se `ConsultantModal` foi importado

### Veículos não aparecem no select

**Problema:** Select está vazio  
**Solução:**

1. Verifique se há veículos com `available: true` no banco
2. Veja o console para erros de API
3. Teste: `http://localhost:3000/api/vehicles.php`

### WhatsApp não abre

**Problema:** Clico em "Falar com um Consultor" e nada acontece  
**Solução:**

1. Verifique se pop-ups estão bloqueados no navegador
2. Teste o número: `https://wa.me/5547984485492`
3. Veja o console para erros

### Máscara do telefone não funciona

**Problema:** Telefone não formata (00) 00000-0000  
**Solução:**

1. Verifique a função `formatPhoneNumber`
2. Digite apenas números (não coloque parênteses manualmente)
3. Recarregue a página

### Cabeçalho não fica fixo

**Problema:** Cabeçalho rola junto com o conteúdo  
**Solução:**

1. Verifique se tem `className="sticky top-0"`
2. Confirme que o modal tem scroll ativo
3. Teste com mais conteúdo no modal

---

## 📊 Resultado Esperado

Após completar todos os testes:

✅ **100% dos itens marcados** = Pronto para produção!  
⚠️ **95-99% dos itens marcados** = Revisar itens faltantes  
❌ **<95% dos itens marcados** = Revisar implementação

---

## 🚀 Teste Agora!

1. Abra: `http://localhost:8080`
2. Use este checklist
3. Marque cada item testado
4. Reporte qualquer problema encontrado

---

**Tempo estimado de teste completo:** 15-20 minutos  
**Data do teste:** **\*\***\_**\*\***  
**Testador:** **\*\***\_**\*\***  
**Resultado:** ✅ APROVADO | ⚠️ REVISAR | ❌ REPROVADO
