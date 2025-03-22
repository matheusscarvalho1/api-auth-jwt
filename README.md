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
version: "3"

services:
  postgres:
    image: postgres:latest
    container_name: postgres-db
    environment:
      POSTGRES_USER: project-apis-jwt
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    ports:
      - "5432:5432"
    volumes:
      - /var/lib/postgresql/data

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
<hr>

 ## ⚙️ Resultados
 - Usando app router do next, as rotas das APIs são definidas baseada no caminho dos arquivos de definição das regras de negócio:
 
![image](https://github.com/user-attachments/assets/3643b98d-8ddf-4e64-a031-16ce2fc62f7d)
- Rodando o 'npx prisma studio' para visualização das tabelas do banco de dados da aplicação mostra os dados salvos na aplicação:

 ![image](https://github.com/user-attachments/assets/da34d7e1-da18-479f-a5be-18732c2718d6)
- Usando o Postman (API Client) é possível testar as APIs criadas para observar se elas estão com o comportamento correto:
  
![image](https://github.com/user-attachments/assets/6c3490d4-07a8-4a8b-9af1-a6fbdaecdf9e)

<hr>

### Rotas que não precisam de autenticação
- As rotas que não precisam de autenticação estão nomeadas como 'unprotected data' nela é possível realizar o CRUD padrão de dados (Criar, Ler, Atualizar, Deletar)
- Os Métodos/Rotas são: POST - '/api/v1/unprotected/adicionar':

  ![image](https://github.com/user-attachments/assets/3bb7b20d-48da-4192-8ccf-0442fd7040d8)
  ![image](https://github.com/user-attachments/assets/22bda20c-04ef-4934-9998-33a4379efd06)
  ![image](https://github.com/user-attachments/assets/4de2f812-7783-4f5d-ad69-c5a719b82c1a)
  <hr>
- GET - '/api/v1/unprotected/buscar':

 ![image](https://github.com/user-attachments/assets/679a0aaf-76c1-4e7b-8f94-9af70589cde7)

<hr>
- GET - '/api/v1/unprotected/buscar/id/[id]':

 ![image](https://github.com/user-attachments/assets/4a4296ba-dc2c-47a9-8f37-093bdb20b730)
<hr>
- PUT - '/api/v1/unprotected/atualizar/id/[id]':

  ![image](https://github.com/user-attachments/assets/047be076-6872-4abc-874f-fb210d7424ad)
  ![image](https://github.com/user-attachments/assets/01469068-edc0-4145-8f0a-36a3ebbd4468)
<hr>

- DELETE - '/api/v1/unprotected/deketar/id/[id]':

  ![image](https://github.com/user-attachments/assets/3384e1d8-8471-42a8-98b1-323d9860af8b)
  ![image](https://github.com/user-attachments/assets/4b8f42ca-5c1b-44c6-bcec-c86a4dcbdadf)
<hr>

  ### Rotas que precisam de autenticação
- As rotas que precisam de autenticação estão nomeadas como 'protected data' nela é possível realizar o CRUD padrão de dados (Criar, Ler, Atualizar, Deletar)

- Os Métodos/Rotas são:  POST - '/api/v1/protected/adicionar':
![image](https://github.com/user-attachments/assets/6a549095-09ae-4bdc-b421-40b70c157fe2)

<hr>

### Para conseguir acessar as rotas protegidas será necessário criar um usuário para gerar um token com login e senha
- A rota que cria as credenciais é: POST - '/api/v1/usuarios/adicionar':
 ![image](https://github.com/user-attachments/assets/5a842057-dc58-4d96-8ca9-9ed2f0a2f2ae)

<hr>

- Após criadas, é necessário autenticar para conseguir acessar as rotas protegidas, e para autenticar basta mandar o email e senha no corpo da requisição para a rota 'api/v1/autenticar/usuario' ao requisitar a resposta retornará um accessToken e o refreshToken também para revalidá-lo para que possa ser possível realizar a autenticação:

![image](https://github.com/user-attachments/assets/e82b1da3-d223-4b92-bb8b-53fa1fe9c141)

<hr>

- Agora com o token em 'mãos' podemos acessar normalmente as rotas protegidas passando o accessToken no cabeçalho da requisição na key 'Authorization' passando e bassando 'bearer [token]' para que seja aceita a requisição, ou tambem é possível só adicionar o token na aba 'Authorization' caso esteja usando o Postman como API Client, selecione o 'Auth Type' como 'Bearer Token' e depois é só adicionar o token sozinho no campo.
  
- A rota que faz a autenticação é: POST - '/api/v1/procted/adicionar':
  ![image](https://github.com/user-attachments/assets/f9e3c98f-36ef-498e-9a46-6ab1575aa3fc)


- Dados salvos no banco (Prisma studio):
  ![image](https://github.com/user-attachments/assets/a38ea6cb-412e-429d-a6e0-ede2da9cc4b8)

  
## Próximos passos

Seria interessante a implementação de testes nessa API para ficar uma API robusta apesar da simples funcionalidade.

## Autor

<b>Matheus de Souza Carvalho</b>

Linkedin:
https://www.linkedin.com/in/matheusscarvalho/

E-mail:
matheusdocarvalho@gmail.com





