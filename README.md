# Back-end do E-commerce com MongoDB

Este é o repositório do projeto do Back-end para um e-commerce, uma API desenvolvida utilizando MongoDB como banco de dados.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- **src/middlewares**: Contém os middlewares utilizados na aplicação, como o middleware de autenticação de administrador (`authAdm.js`) e o arquivo de conexão com o banco de dados MongoDB (`connectDB.js`).

- **src/models**: Contém os modelos de dados da aplicação, incluindo os modelos para administrador (`adm.js`), cliente (`client.js`), detalhes do pedido (`orderDetails.js`), status do pedido (`orderStatus.js`), produtos (`products.js`), entre outros.

- **src/routes**: Contém as rotas da API, organizadas por entidades da aplicação, como administrador (`adm.js`), cliente (`client.js`), pedidos (`orders.js`), produtos (`products.js`), entre outros.

- **src/swagger**: Contém o arquivo de definição do Swagger (`swagger_output.json`) e o script para gerar a documentação automaticamente (`autoGenDoc.js`).

## Funcionalidades

A API fornece as seguintes funcionalidades:

- Autenticação de administrador e cliente utilizando Bcrypt e JsonWebToken.
- Cadastro, listagem, atualização e exclusão de administradores, clientes, produtos e pedidos.
- Gerenciamento de detalhes do pedido, status do pedido, formas de pagamento, entre outros.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB
- Bcrypt
- JsonWebToken

## Como Executar Localmente

Para executar este projeto localmente, siga estas etapas:

1. Clone este repositório:

git clone https://github.com/Cassio-Ares/back_end_ecommerc.git


2. Navegue até o diretório do projeto:

cd back_end_ecommerc


3. Instale as dependências do projeto:

npm install


4. Certifique-se de ter o MongoDB instalado e em execução em sua máquina.

5. Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias, utilizando o arquivo `exemplo.env` como exemplo.

6. Inicie o servidor:

npm start


7. A API estará disponível em `http://localhost:4000`.

## Documentação da API

A documentação da API está disponível em `http://localhost:4000/docs`.

