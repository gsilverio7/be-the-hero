const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require('dotenv').config();

const app = express();

app.use(cors(
    {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000'
    } 
    // Permite acesso apenas do domínio especificado. 
    // Na fase de desenvolvimento, pode ficar vazio, permitindo acesso de
    // qualquer aplicação front-end. 
));

app.use(express.json());

app.use(routes);

app.listen(3333);


/*
Rotas / Recursos
**/

/*
Métodos HTTP:

*GET: Buscar/Listar uma informação no back-end
*POST: Criar uma informação no back-end
*PUT: Alterar uma informação no back-end
*DELETE: Apagar uma informação no back-end
**/

/*
Tipos de Parâmetros
*QUERY PARAMS: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação)
*ROUTE PARAMS: Parâmetros utilizados para identificar recursos
*REQUEST BODY: Corpo da requisição, utilizado para criar ou alterar recursos
**/

/*
*SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
*NoSQL: MongoDB, CouchDB, etc
**/

/*
Driver: SELECT * FROM users
Query Builder: table("users").select(*).where()
**/
