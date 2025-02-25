# APIs básicas de CRUD com rotas protegidas com JWT

Este é um projeto [Next.js](https://nextjs.org) inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
- Esse projeto serve como uma base sólida para um sistema mais robusto, seja para um aplicativo web ou mobile, especialmente em aplicações que exigem autenticação segura.

## 🚀 Tecnologias Utilizadas  

### 📌 **Frameworks e Bibliotecas Principais**  

- **[Next.js](https://nextjs.org) `^15.1.3`**  
  - Framework para React que facilita a criação de aplicações web modernas e otimizadas.  
  - Oferece suporte a renderização no servidor (SSR), geração de páginas estáticas (SSG) e API Routes.  

- **[React](https://react.dev) `^19.0.0`**  
  - Biblioteca JavaScript para construção de interfaces de usuário reativas e eficientes.  
  - Base do Next.js, permitindo a criação de componentes reutilizáveis.  

### 🔍 **Banco de Dados e Validação**  

- **[Prisma ORM](https://www.prisma.io) `^6.1.0`**  
  - ORM (Object-Relational Mapping) moderno para Node.js.  
  - Facilita a comunicação com bancos de dados SQL como PostgreSQL, MySQL e SQLite.  
  - Permite a geração automática de consultas e migração de banco de dados.  

- **[Zod](https://zod.dev) `^3.24.1`**  
  - Biblioteca de validação e tipagem para JavaScript e TypeScript.  
  - Garante que os dados recebidos pela API estejam no formato esperado.  

### 🔐 **Autenticação e Segurança**  

- **[bcryptjs](https://www.npmjs.com/package/bcryptjs) `^2.4.3`**  
  - Biblioteca para hash de senhas.  
  - Usada para criptografar e comparar senhas de usuários de forma segura.  

- **[jose](https://www.npmjs.com/package/jose) `^5.9.6`**  
  - Biblioteca para manipulação de JSON Web Tokens (JWT).  
  - Permite a criação, assinatura e verificação de tokens de autenticação. 

### 🐳 **Ambiente e Containerização**  

- **[Docker](https://www.docker.com)**  
  - Ferramenta para criar ambientes isolados (containers).  
  - Usada para rodar a aplicação e simular um banco de dados localmente, garantindo um ambiente consistente para desenvolvimento.  

## 📦 Instalação

Clone o repositório e instale as dependências:


npm install


## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm run dev`
Inicia o servidor de desenvolvimento com o **Turbopack**.  
Acesse em [http://localhost:3000](http://localhost:3000).

### `npm run build`
Cria a versão de produção do projeto.

### `npm run start`
Inicia o servidor de produção.

### `npm run lint`
Executa o **ESLint** para verificar problemas no código.


### 🔄 Executando com Docker Compose

Para facilitar a execução com um banco de dados, utilize **Docker Compose**.  
Crie um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: postgres-db
    restart: always
    environment:
      POSTGRES_USER: project-matheus
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7
    container_name: redis-cache
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  postgres-data:
    driver: local
  redis-data:
    driver: local
```

### ▶️ Rodando a Aplicação com Docker

1. Construa a imagem:
   ```sh
   docker-compose build
   ```

2. Inicie os containers:
   ```sh
   docker-compose up -d
   ```

3. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## 🔧 Configuração do Prisma

Após instalar as dependências, configure o Prisma:

1. Crie o arquivo `.env` e defina a string de conexão com o banco de dados (utilize as credenciais do arquivo docker-compose.yml:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
   ```

2. Execute a migração do banco:
   ```sh
   npx prisma migrate dev
   ```

## 🛠️ Ferramentas de Desenvolvimento

O projeto utiliza:

- **TypeScript** `^5.7.2` para tipagem estática
- **ESLint** `^9` para análise de código
- **TSX** `^4.19.2` para execução de TypeScript sem compilação manual
