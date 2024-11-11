// importa os módulos express, morgan, mysql, express-myconnection e path

const express = require("express"); // express é o framework para criar o servidor
const morgan = require("morgan"); // morgan é um middleware que faz o logging de requisições HTTP no console
const mysql = require("mysql"); // módulo para trabalhar com o banco de dados MySQL
const myConnection = require("express-myconnection");  // facilita a criação de conexões entre o Express e o MySQL
const path = require('path'); //ajuda a trabalhar com diretórios e caminhos de arquivos
const app = express(); //  é a instância do servidor Express
require('dotenv').config(); // carrega variáveis de ambiente de um arquivo .env, usado aqui para gerenciar configurações sensíveis.


const PASS = process.env.DATABASE_PASSWORD;
// extrai o valor de DATABASE_PASSWORD do arquivo .env e armazena em PASS || isso ajuda a proteger dados sensíveis como senhas



app.set('port', process.env.PORT || 3000); // configura a porta para o servidor || process.env.PORT permite definir uma porta através de uma variável de ambiente; caso contrário, usará a porta 3000.
app.set('view engine', 'ejs'); // define ejs como o motor de visualização para renderizar páginas dinâmicas.
app.set('views', path.join(__dirname, 'views')); // define a pasta views, onde estão armazenadas as páginas ejs, usando o caminho relativo views a partir do diretório atual.


app.use(myConnection(mysql, { // configura uma conexão com o banco de dados MySQL utilizando o express-myconnection
    host: 'localhost',  // endereço do banco de dados
    user: 'root',   // nome do user para o banco    
    password: PASS,   // senha 
    port: '3306', //porta onde o mysql está rodando
    database: 'bqlocadora' // nome do banco de dados
}, 'single')); // cria uma conexão única com cada requisição

app.use(express.urlencoded({extended: false})); 
// usa o middleware express.urlencoded para analisar dados do corpo da requisição (formulários HTML), permitindo o acesso a req.body || extended: false limita o tipo de dados que pode ser enviado (aceita apenas strings e arrays)




app.use(morgan('dev')); // usa morgan no modo dev para logar as requisições no console

// // utiliza   o módulo de rotas rotas para tratar todas as requisições na URL raiz (/). Essas rotas são definidas no arquivo ./routers/cliente

const rotas = require('./routers/userRoutes');
// importa o arquivo de rotas cliente, que contém as definições de rotas para as operações CRUD.

const clientRoutes = require('./routers/clientRoutes'); // Corrija o caminho se necessário
app.use('/', clientRoutes);

app.use('/', rotas);
const userRouter = require('./routers/userRoutes');
app.use('/', userRouter);

app.use(express.static(path.join(__dirname, 'public')));

// define o diretório public como o local de arquivos estáticos (CSS, JS, imagens, etc.). Esses arquivos podem ser acessados diretamente no navegador

app.listen(app.get('port'), () => { // inicia o servidor na porta definida anteriormente
    console.log('Server on port 3000'); // imprime uma mensagem no console indicando que o servidor está ativo e na porta escolhida.
})