const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.status(500).json({error: "Erro ao conectar ao banco de dados"});
            conn.query('SELECT * FROM veiculos', (err, veiculos) => {
                if (err) return res.status(500).json(({error: "Erro ao encontrar veiculos"}));
                res.render('veiculos', {
                    data: veiculos
                });
            });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({error: "Erro ao conectar ao banco de dados"});
            conn.query('INSERT INTO veiculos SET ?', [data], (err, rows) => {
                if (err) return res.status(500).json({error: "Erro ao salvar novo veículo"});
                res.redirect('/veiculos');
            });
    });
};

module.exports = controller;