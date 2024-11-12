const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

router.get('/clientes', (req, res) => {
    res.render('clientes');
});

router.post('/save', clientController.save);

router.get('/clientes', (req, res) => {
    res.render('clientes');
});

router.post('/save', clientController.save);

router.get('/clienteBusca', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ erro: "Erro de conexão com o banco de dados" });
        
        conn.query('SELECT * FROM clientes', (err, rows) => {
            if (err) return res.status(500).json({ error: "Erro ao buscar os clientes" });

            res.render('clienteBusca', {
                novoCliente: rows
            });
        });
    });
});

module.exports = router;