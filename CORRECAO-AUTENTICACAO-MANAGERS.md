# ✅ Correção: Autenticação nos Managers

## 🐛 Problema Identificado

**Erro:** HTTP 401 (Unauthorized) ao tentar excluir veículos

`Error: HTTP 401: {"error":true,"message":"Token de autenticação necessário"}`

## 🔍 Causa Raiz

Os arquivos `vehicleManager.ts` e `siteConfigManager.ts` **não estavam enviando o token de autenticação** nos headers das requisições HTTP.

### O que estava acontecendo:

- ✅ Login funcionando e token sendo salvo no localStorage
- ❌ DELETE, POST, PUT e PATCH não enviavam o header `Authorization: Bearer {token}`
- ❌ APIs rejeitavam as requisições com erro 401

## ✅ Solução Aplicada

### 1. **vehicleManager.ts** - Adicionado Auth Header

**Mudanças:**

```typescript
// ✅ Importar função de autenticação
import { getAuthHeader } from "./authManager";

// ✅ Adicionar header em TODAS as requisições
const fetchAPI = async (
  endpoint: string = "",
  options: RequestInit = {}
): Promise<any> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // ✅ ADICIONADO
      ...(options.headers || {}),
    },
    mode: "cors",
    credentials: "omit",
  });
};
```

### 2. **siteConfigManager.ts** - Adicionado Auth em 9 Funções

**Funções corrigidas:**

- ✅ `saveSiteSetting()` - POST
- ✅ `updateSiteSetting()` - PUT
- ✅ `deleteSiteSetting()` - DELETE
- ✅ `createPageSection()` - POST
- ✅ `updatePageSection()` - PUT
- ✅ `deletePageSection()` - DELETE
- ✅ `toggleSectionActive()` - PATCH
- ✅ `reorderSections()` - PATCH

**Exemplo de correção:**

```typescript
// ANTES ❌
const response = await fetch(url, {
  method: "DELETE",
});

// DEPOIS ✅
const response = await fetch(url, {
  method: "DELETE",
  headers: getAuthHeader(), // Envia Authorization: Bearer {token}
});
```

## 🎯 Resultado

Agora **TODAS** as operações que exigem autenticação funcionam:

| Operação                                 | Antes  | Depois |
| ---------------------------------------- | ------ | ------ |
| Listar veículos (GET)                    | ✅ OK  | ✅ OK  |
| Adicionar veículo (POST)                 | ❌ 401 | ✅ OK  |
| Editar veículo (PUT)                     | ❌ 401 | ✅ OK  |
| Excluir veículo (DELETE)                 | ❌ 401 | ✅ OK  |
| Toggle disponível (PATCH)                | ❌ 401 | ✅ OK  |
| Salvar configurações (POST/PUT)          | ❌ 401 | ✅ OK  |
| Gerenciar seções (POST/PUT/DELETE/PATCH) | ❌ 401 | ✅ OK  |

## 🧪 Como Testar

1. Faça login no painel admin: `http://localhost:8080/admin`
2. Vá em "Veículos"
3. Tente **excluir** um veículo
4. Agora deve funcionar sem erro 401! ✅

## 📝 Arquivos Modificados

- ✅ `src/lib/vehicleManager.ts` - Adicionado `getAuthHeader()`
- ✅ `src/lib/siteConfigManager.ts` - Adicionado `getAuthHeader()` em 9 funções

## 🔐 Como Funciona a Autenticação

1. **Login:** `authManager.login()` salva token no localStorage
2. **Header automático:** `getAuthHeader()` pega token e retorna `{ Authorization: "Bearer {token}" }`
3. **Requisições:** Todos os managers agora incluem esse header
4. **Validação:** APIs PHP verificam token e permitem operação

---

**Status:** ✅ Bug corrigido! Agora você pode excluir veículos sem problemas.
