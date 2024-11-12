const controller = {};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ erro: "Erro de conexão com o banco de dados" });

        conn.query('INSERT INTO clientes SET ?', data, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao registrar cliente" });

            // Após inserir, buscamos todos os clientes para garantir que novoCliente é um array
            conn.query('SELECT * FROM clientes', (err, rows) => {
                if (err) return res.status(500).json({ error: "Erro ao buscar os clientes" });

                res.render('clienteBusca', {
                    novoCliente: rows // rows é um array com todos os clientes
                });
            });
        });
    });
};




module.exports = controller;