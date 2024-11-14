const express = require('express');
const router = express.Router();

// as duas linha servem para importar o express e cria uma instância de um roteador com express.Router() || O roteador (router) será usado para definir caminhos (URLS) e associar cada caminho a uma função específica no controlador (crud)


// importa o controlador de usuários
const userController = require('../controllers/userController');

router.get('/login', (req, res) => {
    res.render('login'); // renderiza a página login 
});



router.post('/register', userController.register); // rota de cadastro de usuário

router.post('/login', userController.login); // rota de login de usuário

router.get('/', (req, res) => {
    res.redirect('/login'); // redireciona para a página de login ou uma página principal
});

router.get('/register', (req, res) => {
    res.render('register'); // Renderiza a página register.ejs
});

router.get('/clientes', (req, res) => {
    res.render('clientes');
});

module.exports = router;

// exporta o router para que ele possa ser utilizado em outras partes do aplicativo.