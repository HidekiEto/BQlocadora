const express = require('express');
const router = express.Router();

// as duas linha servem para importar o express e cria uma instância de um roteador com express.Router() || O roteador (router) será usado para definir caminhos (URLS) e associar cada caminho a uma função específica no controlador (crud)

const crud = require('.../controller/crud');
// importa o módulo crud que representa um controlador (localizado em ../controllers/crud)

router.get('/', crud.list);

// 