# 🗡️ Demon Slayer Characters Browser

> Enterprise Angular + Ionic — Scalable frontend architecture with real-world API integration patterns.

![Angular](https://img.shields.io/badge/Angular-Standalone-DD0031?style=flat-square&logo=angular)
![Ionic](https://img.shields.io/badge/Ionic-UI-3880FF?style=flat-square&logo=ionic)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript)
![Architecture](https://img.shields.io/badge/Architecture-Feature--based-green?style=flat-square)

---

## 📌 Overview

A scalable **Demon Slayer Characters Browser** demonstrating real-world frontend patterns:

- External API consumption with CORS-safe local proxy
- Ionic UI with infinite scroll pagination
- Enterprise Angular standalone architecture
- Lazy-loaded feature modules with domain-driven structure

---

## 🧱 Architecture

Feature-based, domain-driven folder structure:

```
src/app
├── features/
│   └── characters/
│       ├── data/
│       ├── models/
│       ├── pages/
│       └── characters.routes.ts
└── app.routes.ts
```

### Routing — Enterprise Pattern

```typescript
// ✅ After (enterprise lazy loading)
{
  path: 'characters',
  loadChildren: () =>
    import('./features/characters/characters.routes')
      .then(m => m.CHARACTERS_ROUTES),
}
```

**Benefits:** feature encapsulation · cleaner root routing · true lazy loading · better scalability

---

## 🌐 API Integration

**Base URL:** `https://www.demonslayer-api.com/api/v1`

**Endpoint used:** `/characters?page=1&limit=6`

### ⚠️ Real API Response Format

```json
{
  "pagination": {},
  "content": []
}
```

> The API returns `content`, **not** `data`. The service reads `res.content` accordingly.

---

## 🔁 Infinite Scroll

Implemented with `ion-infinite-scroll`, splitting state into:

| State            | Purpose               |
| ---------------- | --------------------- |
| `initialLoading` | First page load       |
| `loadingMore`    | Subsequent pagination |

Stops automatically when the API returns fewer items than the configured `limit`. No DOM teardown, no scroll reset.

---

## 🔁 Local Proxy Setup

Configured to avoid CORS issues during local development.

**`proxy.conf.json`**

```json
{
  "/ds-api": {
    "target": "https://www.demonslayer-api.com",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/ds-api": ""
    }
  }
}
```

**Service baseUrl:**

```typescript
private readonly baseUrl = '/ds-api/api/v1/characters';
```

**Validate the proxy is working:**

```
http://localhost:8100/ds-api/api/v1/characters?page=1&limit=5
```

- ✅ Returns JSON → Proxy working
- ❌ Returns HTML → Proxy not applied

---

## ⚠️ Issues Solved During Development

### 1. HTML response instead of JSON

**Cause:** proxy disabled or wrong URL  
**Fix:** correct `baseUrl` + run Ionic with proxy enabled

### 2. Wrong `baseUrl` with query params

```typescript
// ❌ Bad
`${baseUrl}?page=1`;

// ✅ Correct
baseUrl + HttpParams;
```

### 3. Incorrect model typing

| Old (wrong)      | Real API        |
| ---------------- | --------------- |
| `character.name` | `name`          |
| `favorites`      | `img`           |
| `role`           | `race`, `quote` |

Interfaces updated to reflect the actual API response.

### 4. Template errors (`TS7053`)

```typescript
// ❌ Before
c["character"]?.name;

// ✅ After
c.name;
```

### 5. Non-REST ID pattern

```
// ❌ REST assumption
/characters/1

// ✅ Actual API pattern
/characters?id=1
```

Service adapted using `HttpParams`.

---

## 🧠 Enterprise Practices

- ✅ No query strings hardcoded inside `baseUrl`
- ✅ Models reflect real API JSON structure
- ✅ Feature routing encapsulation via `loadChildren`
- ✅ Service layer abstraction for all API calls
- ✅ Infinite scroll without DOM teardown
- ✅ Standalone HTTP setup via `provideHttpClient()`

---

## 🌐 HTTP Setup (Standalone)

```typescript
// ✅ Used
provideHttpClient();

// ❌ Not used
HttpClientModule;
```

---

## 🚧 Planned — Adapter Layer

```
API Response → Adapter → Internal Contract → UI
```

**Goals:**

- Decouple UI from external API format
- Define stable internal contracts
- Improve long-term scalability and testability

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run with proxy
ionic serve --proxy-config proxy.conf.json
```

---

## 🎯 Project Goals

Build a production-ready character browser demonstrating:

- External API consumption with typed models
- Ionic UI components (`ion-infinite-scroll`, etc.)
- Enterprise Angular standalone architecture
- Feature-based lazy loading
- Real-world development patterns and solutions

# 🗡️ Demon Slayer Characters Browser

> Enterprise Angular + Ionic — Arquitetura frontend escalável com padrões reais de integração com API.

![Angular](https://img.shields.io/badge/Angular-Standalone-DD0031?style=flat-square&logo=angular)
![Ionic](https://img.shields.io/badge/Ionic-UI-3880FF?style=flat-square&logo=ionic)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript)
![Architecture](https://img.shields.io/badge/Arquitetura-Feature--based-green?style=flat-square)

---

## 📌 Visão Geral

Um **Demon Slayer Characters Browser** escalável, demonstrando padrões reais de desenvolvimento frontend:

- Consumo de API externa com proxy local seguro (CORS)
- Ionic UI com paginação por infinite scroll
- Arquitetura Angular standalone enterprise
- Feature modules com lazy loading e estrutura orientada a domínio

---

## 🧱 Arquitetura

Estrutura de pastas orientada a domínio e features:

```
src/app
├── features/
│   └── characters/
│       ├── data/
│       ├── models/
│       ├── pages/
│       └── characters.routes.ts
└── app.routes.ts
```

### Rotas — Padrão Enterprise

```typescript
// ✅ Depois (lazy loading enterprise)
{
  path: 'characters',
  loadChildren: () =>
    import('./features/characters/characters.routes')
      .then(m => m.CHARACTERS_ROUTES),
}
```

**Benefícios:** encapsulamento de feature · rota raiz mais limpa · lazy loading real · melhor escalabilidade

---

## 🌐 Integração com a API

**Base URL:** `https://www.demonslayer-api.com/api/v1`

**Endpoint utilizado:** `/characters?page=1&limit=6`

### ⚠️ Formato Real da Resposta

```json
{
  "pagination": {},
  "content": []
}
```

> A API retorna `content`, **não** `data`. O service lê `res.content` corretamente.

---

## 🔁 Infinite Scroll

Implementado com `ion-infinite-scroll`, separando os estados em:

| Estado           | Finalidade            |
| ---------------- | --------------------- |
| `initialLoading` | Primeiro carregamento |
| `loadingMore`    | Paginações seguintes  |

Para automaticamente quando a API retorna menos itens do que o `limit` configurado. Sem teardown de DOM, sem reset de scroll.

---

## 🔁 Proxy Local

Configurado para evitar problemas de CORS durante o desenvolvimento local.

**`proxy.conf.json`**

```json
{
  "/ds-api": {
    "target": "https://www.demonslayer-api.com",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/ds-api": ""
    }
  }
}
```

**`baseUrl` no service:**

```typescript
private readonly baseUrl = '/ds-api/api/v1/characters';
```

**Validar se o proxy está funcionando:**

```
http://localhost:8100/ds-api/api/v1/characters?page=1&limit=5
```

- ✅ Retorna JSON → Proxy funcionando
- ❌ Retorna HTML → Proxy não aplicado

---

## ⚠️ Problemas Resolvidos Durante o Desenvolvimento

### 1. Resposta HTML ao invés de JSON

**Causa:** proxy desabilitado ou URL incorreta  
**Solução:** corrigir o `baseUrl` + rodar o Ionic com proxy ativado

### 2. `baseUrl` com query params concatenados

```typescript
// ❌ Errado
`${baseUrl}?page=1`;

// ✅ Correto
baseUrl + HttpParams;
```

### 3. Tipagem do model incorreta

| Antigo (errado)  | API real        |
| ---------------- | --------------- |
| `character.name` | `name`          |
| `favorites`      | `img`           |
| `role`           | `race`, `quote` |

Interfaces atualizadas para refletir o JSON real da API.

### 4. Erros de template (`TS7053`)

```typescript
// ❌ Antes
c["character"]?.name;

// ✅ Depois
c.name;
```

### 5. Padrão de ID não-REST

```
// ❌ Suposição REST
/characters/1

// ✅ Padrão real da API
/characters?id=1
```

Service adaptado usando `HttpParams`.

---

## 🧠 Boas Práticas Enterprise

- ✅ Sem query strings hardcoded dentro do `baseUrl`
- ✅ Models refletem a estrutura real do JSON da API
- ✅ Encapsulamento de rotas por feature via `loadChildren`
- ✅ Abstração de chamadas em camada de service
- ✅ Infinite scroll sem teardown de DOM
- ✅ HTTP standalone via `provideHttpClient()`

---

## 🌐 HTTP Setup (Standalone)

```typescript
// ✅ Utilizado
provideHttpClient();

// ❌ Não utilizado
HttpClientModule;
```

---

## 🚧 Próxima Evolução — Adapter Layer

```
Resposta da API → Adapter → Contrato Interno → UI
```

**Objetivos:**

- Desacoplar a UI do formato externo da API
- Definir contratos internos estáveis
- Melhorar escalabilidade e testabilidade a longo prazo

---

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar com proxy
ionic serve --proxy-config proxy.conf.json
```

---

## 🎯 Objetivos do Projeto

Construir um browser de personagens pronto para produção, demonstrando:

- Consumo de API externa com models tipados
- Componentes Ionic UI (`ion-infinite-scroll`, etc.)
- Arquitetura Angular standalone enterprise
- Lazy loading orientado a features
- Padrões e soluções reais de desenvolvimento
