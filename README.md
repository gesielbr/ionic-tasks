enterprise

🇺🇸 EN — Updated Project Documentation
Architecture

Angular Standalone Components

Ionic Angular

Feature-based Lazy Loading

Domain-driven structure

Routing Evolution

Before:

loadComponent(...)

After (enterprise pattern):

loadChildren(...)

Benefits:

Feature encapsulation

Cleaner root routing

True lazy loading

Demon Slayer API Integration

Real response format:

pagination + content[]

Not data[].

Local Proxy Setup

Prefix used:

/ds-api

Rewritten to:

https://www.demonslayer-api.com

Rule:

If request returns HTML → proxy not applied.

Issues Solved

Wrong baseUrl with query params

HTML response instead of JSON

Incorrect model typing

Template using non-existent properties

API uses query params instead of REST path

Future Improvement

Adapter Layer planned:

API → Adapter → UI

Decoupling frontend from external API structure.

Project Goal

Build a scalable Demon Slayer Characters Browser using:

External API consumption

Ionic UI

Standalone Angular architecture

Enterprise-ready patterns

🇧🇷 PT-BR — Documentação Atualizada do Projeto
🧱 Arquitetura escolhida

Este projeto utiliza:

Angular Standalone Components

Ionic Angular

Lazy Loading por Feature

Organização por domínio (features/)

Estrutura principal:

src/app
├── features/
│ └── characters/
│ ├── data/
│ ├── models/
│ ├── pages/
│ └── characters.routes.ts
└── app.routes.ts
🔄 Evolução das Rotas
Antes (forma simples)
loadComponent: () =>
import('./features/characters/pages/characters/characters.page')
.then(m => m.CharactersPage)
Problema

app.routes.ts cresce demais.

Baixa escalabilidade em projetos grandes.

✅ Depois (padrão empresa)
{
path: 'characters',
loadChildren: () =>
import('./features/characters/characters.routes')
.then(m => m.CHARACTERS_ROUTES),
}

Arquivo da feature:

export const CHARACTERS_ROUTES: Routes = [
{ path: '', component: CharactersPage }
];
Benefícios

Encapsulamento por feature

Lazy loading real

Estrutura escalável

🌐 Consumo da Demon Slayer API

API base:

https://www.demonslayer-api.com/api/v1

Endpoint usado:

/characters?page=1&limit=5
⚠️ Importante — Formato REAL da API

A API retorna:

{
pagination: {},
content: []
}

E NÃO:

data: []

Por isso o código usa:

res.content
🔁 Proxy Local (evitar CORS)

Arquivo:

proxy.conf.json

Configuração:

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

Uso no service:

private readonly baseUrl = '/ds-api/api/v1/characters';
💡 Como validar

Abrir no navegador:

http://localhost:8100/ds-api/api/v1/characters?page=1&limit=5

Se retornar JSON → proxy funcionando.

Se retornar HTML → proxy não aplicado.

⚠️ Problemas Encontrados e Soluções
1️⃣ API retornava HTML em vez de JSON

Sintoma:

<!DOCTYPE html>

Causa:

Proxy não ativo

URL inválida

Solução:

Corrigir baseUrl

Garantir ionic serve com proxy

2️⃣ URL duplicada

Erro comum:

/characters?page=1&limit=5/characters&page=1&limit=5

Causa:

Query string dentro da baseUrl.

Regra adotada:

baseUrl SEM query
HttpParams COM query
3️⃣ Estrutura do Model incorreta

Antes:

character.name
favorites
role

Depois (real da API):

name
img
race
quote

Angular acusou:

TS7053 Property does not exist

Solução:

Atualizar interface DemonSlayerCharacter.

4️⃣ Template quebrando (TS7053)

Problema:

c['character']?.name

Correção:

c.name
c.img
5️⃣ Endpoint com ID diferente do padrão REST

A API NÃO usa:

/characters/1

Ela usa:

/characters?id=1

Service ajustado para HttpParams.

🧠 Boas práticas definidas no projeto

✔ Nunca colocar query dentro do baseUrl
✔ Sempre testar endpoint direto no browser
✔ Se veio HTML → rota errada ou proxy falhou
✔ Model deve refletir o JSON real
✔ Service centraliza a lógica da API

🚧 Próxima melhoria planejada

Criar um Adapter Layer:

API → Adapter → App

Objetivo:

Converter content → data

Desacoplar UI do formato externo da API

⚠️ Problema adicional — Angular Cache EPERM (Windows)

Erro:

EPERM: operation not permitted, rmdir .angular/cache

Causa:

Windows Defender / OneDrive

Solução:

rm -Recurse -Force .angular
🌐 HTTP Setup (Standalone)

Uso de:

provideHttpClient()

Substituindo:

HttpClientModule
🎯 Objetivo do Projeto

Construir um navegador de personagens Demon Slayer com:

Consumo de API externa

Estrutura Angular escalável

Lazy loading por feature

Base arquitetural próxima de projetos enterprise
