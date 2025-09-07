# Plataforma Cera — Teste Técnico

Este projeto foi desenvolvido como parte de um teste técnico para a empresa Plataforma Cera. O objetivo é demonstrar habilidades na construção de uma API moderna utilizando as melhores práticas do mercado, com foco em qualidade de código e organização.

## Descrição

A aplicação consiste em uma API desenvolvida em Node.js com TypeScript, utilizando o framework Express. O projeto implementa funcionalidades essenciais para um backend robusto, incluindo autenticação, integração com banco de dados MongoDB, testes automatizados e documentação interativa com Swagger.

## Tecnologias Utilizadas

- **Node.js** (v20+)
- **TypeScript**
- **Express**
- **MongoDB** (com Docker Compose)
- **Jest** (testes automatizados)
- **ESLint** (padronização de código)
- **Husky** (hooks de Git)
- **Swagger** (documentação da API)

## Requisitos

- [Node.js](https://nodejs.org/) v20 ou superior
- [Yarn](https://yarnpkg.com/) (opcional, mas recomendado)
- [Docker](https://www.docker.com/) (para facilitar o setup do banco de dados)

## Instalação e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/johnsm1/plataformacera.git
   cd plataformacera
   ```

2. **Instale as dependências:**

   ```bash
   yarn install
   # ou npm install
   ```

3. **Suba o banco de dados MongoDB usando Docker Compose:**

   ```bash
   docker compose up -d
   ```

4. **Popule o banco (Seeder):**

   ```bash
   node seed.mjs
   ```

5. **Inicie a aplicação em modo desenvolvimento:**

   ```bash
   yarn run dev
   # ou npm run dev
   ```

6. **Rodar os testes automatizados:**

   ```bash
   yarn test
   # ou npm test
   ```

## Documentação da API

Após iniciar o projeto, acesse a documentação interativa do Swagger em:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Observações

- O projeto está organizado para facilitar a leitura e manutenção do código.
- Foram aplicadas boas práticas de desenvolvimento, incluindo uso de linters e testes automatizados.
- Em caso de dúvidas ou sugestões, fique à vontade para abrir uma issue ou entrar em contato.

---

Desenvolvido por John Medina para o teste técnico da Plataforma Cera.
