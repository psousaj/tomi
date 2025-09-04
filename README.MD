# 🚀 ToMi App - Monorepo

> Um aplicativo de gerenciamento de tarefas e objetivos, construído com modernas tecnologias e organizado em um **monorepo** usando [Turborepo](https://turbo.build/).

---

## 🧠 Escolhas Tecnológicas

Optei por utilizar **NestJS** para o back-end e **Next.js** para o front-end por já possuir familiaridade e experiência profissional com ambas as tecnologias. Tendo trabalhado com elas em projetos anteriores, sinto-me confortável para desenvolver e manter a aplicação de forma produtiva.

## 📈 Pontos de Melhoria para o Futuro

- **Autenticação Robusta**: Implementar um sistema de login completo com JWT (JSON Web Tokens), incluindo refresh tokens e uma estratégia de blacklist para logout e invalidar sessões.
- **Segurança da API**:
    - Validar e sanitizar todos os inputs provenientes do front-end para prevenir ataques como XSS e SQL Injection.
    - Implementar `rate limiting` para proteger a API contra ataques de negação de serviço (DoS) e força bruta.
- **Controle de Acesso**: Antes de permitir a exclusão de uma tarefa, verificar se o usuário autenticado é de fato o proprietário da mesma.
- **Containerização**: Utilizar Docker e Docker Compose para criar um ambiente de desenvolvimento e produção padronizado, facilitando o deploy e a escalabilidade da aplicação.

---

## 🛠️ Tecnologias Principais

- **Monorepo**: [Turborepo](https://turbo.build/repo) com [pnpm](https://pnpm.io)
- **Front-end**: [Next.js 15](https://nextjs.org) (App Router)
- **Back-end**: [Node.js](https://nodejs.org) + [NestJS](https://nestjs.com)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Banco de dados**: PostgreSQL (produção) / SQLite (desenvolvimento)
- **Ferramentas**: [Docker](https://www.docker.com), [Docker Compose](https://docs.docker.com/compose/)

---

## 📁 Estrutura do Projeto

```bash
tomi/
├── apps/
│   ├── web/        # Aplicação Next.js (front-end)
│   └── api/        # API NestJS (back-end)
├── packages/
│   ├── ts-config/  # Configurações de TypeScript compartilhadas
│   └── validation/ # Esquemas de validação (Zod) compartilhados
├── .env            # Variáveis de ambiente (locais)
├── .env.example    # Arquivo de exemplo para variáveis de ambiente
└── README.md
```

---

### Pré-requisitos

Este projeto utiliza `pnpm` como gerenciador de pacotes. Certifique-se de que ele esteja instalado globalmente em sua máquina:

```bash
npm install -g pnpm
```

### 1. Configuração de Ambiente

As variáveis de ambiente são essenciais para a execução do projeto.

1.  Crie uma cópia do arquivo `.env.example` na raiz do projeto e renomeie-a para `.env`.
2.  Abra o arquivo `.env` e preencha as variáveis. Para um ambiente de desenvolvimento, você pode usar a seguinte configuração: (lembrando que isso só é necessário para publicar o app. Em modo desenvolvimento as config default são suficientes)

    ```env
    # .env
    WEBPORT=3000
    APIPORT=3333
    DATABASE_URL="file:./database.db" # Usa o SQLite para desenvolvimento
    JWT_SECRET="your-super-secret-key" # IMPORTANTE: Troque por uma chave segura
    NODE_ENV="development"
    ```

### 2. Instalação de Dependências

Execute o comando abaixo na raiz do projeto. Ele instalará todas as dependências necessárias para todos os workspaces (`apps` e `packages`).

```bash
pnpm install
```

---

## 🚀 Executando em Desenvolvimento

Para iniciar os servidores de desenvolvimento do front-end e do back-end simultaneamente, execute:

```bash
pnpm dev
```

O Turborepo irá iniciar ambos os serviços em modo *watch*.
- **Front-end (Next.js)** estará disponível em `http://localhost:3000`
- **Back-end (NestJS)** estará disponível em `http://localhost:3333`

---

## 📦 Build para Produção

Para gerar as builds otimizadas de todas as aplicações, execute:

```bash
pnpm build
```

Este comando cria os artefatos de produção nos seguintes diretórios:
- `apps/api/dist`
- `apps/web/.next`

Após o build, você pode iniciar as aplicações em modo produção com os seguintes comandos:

```bash
# Para iniciar a API em produção
pnpm --filter api start:prod

# Para iniciar o front-end em produção
pnpm --filter web start
```

---

## 🐳 Docker

O projeto também pode ser executado utilizando Docker e Docker Compose para simplificar a implantação e a consistência entre ambientes.