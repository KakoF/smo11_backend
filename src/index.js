const express = require('express');
const cors = require('cors')

// ./ indicar que vamos importar um arquivo e não um pacote, como está no importe do express 
const routes = require('./routes');

app.use(cors())

/*Quando for para produção
app.use(cors({
    origin: 'http://frontend'
}))

//Foi instalado o nodemon no ambiente de desenvolvimento
//npm install nodemon -D
//Uma bibliota que vai ser utilizada apenas no desenvolvimento, para startar o servidor assim que tiver alterações
//Foi criado um script no package.json para executar o nodemon
const app = express();

app.use(express.json());
app.use(routes)


app.listen(3333);*/
