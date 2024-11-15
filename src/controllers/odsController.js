const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.status(500).json({error: "Erro ao conectar ao banco de dados"});
            conn.query('SELECT * FROM ordem_de_servico', (err, ods) => {
                if (err) return res.status(500).json(({error: "Erro ao encontrar ordem_de_serviço"}));
                res.render('ods', {
                    data: ods
                });
            });
    });
};

module.exports = controller;