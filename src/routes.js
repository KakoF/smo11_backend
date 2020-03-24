//Como vamos definir as rotas em outro arquivo, estanciamos o express
//E desacoplamos a função de rotas na constante routes e exportamos

const express = require('express')

const routes = express.Router();

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


/*routes.get('/', (request, response) => {
    return response.json({
        evento: 'Semana Omnistack 11',
        aluno: 'Kako'
    });
})*/

routes.post('/login', SessionController.login)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)


module.exports = routes

/**
    Rota / Recurso:

    GET: Buscar uma informação do back-end
    POST: Criar uma informação no back-end
    PUT: Alterar uma informação no back-end
    DELETE: Deletar uma informação no back-end
*/

/*
    Tipos de parâmetros:

    1 - Query Params: Parâmetros NOMEADOS enviados na rota após ? -> localhost/usuario?name=Marcos&pagina=2
        Servem: para filtros, paginação
    2 - Route Params: Parâmetros para identificar recursos -> localhost/usuario/2
        Servem para setar o identificador do recurso
    3 - Request Body: Corpo da requisição
        Servem para criar ou alterar informações, geralmente em recursos POST e PUT
*/


/*
    Estratégia com bancos:
    
    Driver: Será necessário criar os selects:
        Select * from usuarios;
    Query Builder: Será necessário usar funções javascript para executar as consultas
        table('users).select('*')where()
        Essa estrutura está apta para receber qualquer banco relacional
    
        UTILIZAREMOS O KNEX.JS -> http://knexjs.org/
        npm install knex --save

        E INSTALAR O DRIVER DO BANCO QUE IREMOS UTILIZAR -> sqllite
        npm install sqlite3

        Depois utilizaremos o NPX -> Que executa um pacote ao inves de instalar um pacote
        npx knex init -> vai criar um arquivo com as configurações para o banco
*/

/* Exemplo
app.get('/', (request, response) => {

    //Parametros que vem da url ?
    const queryParams = request.query;

    //app.get('/:id')
    const routeParams = request.params;
    
    //Post com as informações
    const body = request.body;
    //LEMBRAR DE É NECESSÁRIO SETAR NO APP DA ESTANCIA DO EXPRESS QUE VAMOS
    //UTILIZAR JSON NO CORPO DAS REQUISIÇÕES
    //app.use(express.json()) -> linha 9 do index.js

    return response.json({
        evento: 'Semana Omnistack 11',
        aluno: 'Kako'
    });
})*/