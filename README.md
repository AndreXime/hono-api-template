# API Template

Um template de API focado em segurança, escalabilidade e experiência do desenvolvedor (DX).

Construído utilizando **Bun** e **Hono**, com **PostgreSQL** como banco de dados principal e **Redis** para cache e controle de taxa (Rate Limiting). O projeto utiliza **Prisma ORM** e segue uma arquitetura modular.

---

## Arquitetura e Middlewares

O processamento das requisições segue um fluxo estrito de middlewares para garantir segurança, validação e observabilidade antes de atingir a lógica de negócio.

**[Clique aqui para ver o Diagrama de Fluxo de Middlewares](MIDDLEWARES.md)**

O diagrama acima detalha como a aplicação lida com:

* Logger e tratamento de erros globais.
* Injeção de dependência do banco de dados.
* Rate Limiting (Global e Específico por rota).
* Autenticação via JWT e Blocklist no Redis.

---

## Tecnologias

* **Runtime:** Bun
* **Framework:** Hono
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Cache & Queue:** Redis (ioredis)
* **Storage:** AWS S3 (Simulado via LocalStack em desenvolvimento)
* **Validação:** Zod & Hono Zod Validator
* **Documentação:** Scalar (OpenAPI 3.0)
* **Linter/Formatter:** Biome

---

## Documentação da API

Quando o servidor está rodando em modo DEV, a documentação interativa (Scalar) e o JSON do OpenAPI estão disponíveis:

- Interface Visual (Scalar): http://localhost:8080/ui
- OpenAPI JSON: http://localhost:8080/doc

Principais Funcionalidades Implementadas no Template:

- Auth: Login, Registro, Refresh Token (rotação de tokens), Logout.
- User: Perfil do usuário logado (/me).
- Segurança:
    - CSRF Protection.
    - CORS configurado para Frontend e S3.
    - Rate Limiter (100 req/15min global, 10 req/15min para Auth).

---

## Estrutura de Pastas

```
ecommerce-backend/
├── src/
│   ├── @types/          # Definições de tipos globais
│   ├── database/        # Cliente Prisma e Seeds
│   ├── lib/             # Configurações de libs (S3, Redis, Env)
│   ├── middlewares/     # Middlewares (Auth, Logs, Errors, Validation)
│   ├── modules/         # Lógica de negócio (Controllers, Services, Schemas)
│   │   ├── auth/        # Funcionalidades de Autenticação
│   │   ├── user/        # Funcionalidades de Usuário
│   │   └── shared/      # Schemas e utilitários compartilhados
│   └── index.ts         # Ponto de entrada (Entrypoint)
├── prisma/              # Schema do banco e migrações
├── docker-compose.yml   # Infraestrutura local
└── MIDDLEWARES.md       # Documentação de fluxo

```