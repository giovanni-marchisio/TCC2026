# TCC Backend - 2026

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?logo=fastify&logoColor=white)
![Knex](https://img.shields.io/badge/Knex-D26B38)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)

API REST de e-commerce desenvolvida para o Trabalho de Conclusão de Curso (TCC).

---

## Tecnologias utilizadas
- Node.js
- Fastify
- Knex
- MySQL
- JWT
- Swagger

---

## Funcionalidades

- Autenticação com JWT
- Recuperação de senha
- Cadastro de usuários
- Gerenciamento de clientes
- Gerenciamento de endereços
- Gerenciamento de categorias
- Gerenciamento de produtos
- Controle de pedidos
- Controle de pagamentos
- Documentação da API com Swagger

--- 

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/giovanni-marchisio/TCC2026.git
```

### 2. Acesse a pasta do backend
```bash
cd backend
```

### 3. Instale as dependências
```bash
npm install
```

### 4. Configure e preencha as variáveis de ambiente
Crie um arquivo `.env` baseado no `.env.example`.

### 5. Configure o banco de dados

Importe o arquivo localizado em:

```txt
backend/database/schema.sql
```

### 6. Inicie o servidor.
```bash
npm run dev
```

---

## Documentação da API

Com o servidor rodando, acesse:
```txt
http://localhost:3000/docs
```

---

## Variáveis de ambiente necessárias
| Variável | Descrição |
|---|---|
| DB_HOST | Host do banco de dados |
| DB_USER | Usuário do banco |
| DB_PASSWORD | Senha do banco |
| DB_NAME | Nome do banco |
| EMAIL_HOST | Host SMTP |
| EMAIL_PORT | Porta do servidor SMTP |
| EMAIL_USER | Email utilizado no SMTP |
| EMAIL_PASS | Senha/app password do email |
| JWT_SECRET | Chave secreta do JWT |
| FRONTEND_URL | URL do frontend |

---

## Estrutura do projeto

```txt
src/
├── configs/
├── middlewares/
├── modules/
│   ├── address/
│   ├── category/
│   ├── order/
│   ├── password/
│   ├── payment/
│   ├── product/
│   └── user/
├── scripts/
└── utils/
```

---

## Banco de dados

O arquivo `backend/database/schema.sql` contém apenas a estrutura do banco de dados necessária para execução do projeto.

Nenhum dado real ou sensível é disponibilizado no repositório.

---

## Observações

- O Knex foi utilizado como query builder para manipulação do banco de dados.
- Projeto desenvolvido para fins acadêmicos.
