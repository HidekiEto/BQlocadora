const controller = {};

controller.list = (req, res) => {
    const veiculoIndex = parseInt(req.query.veiculoIndex) || 0;
    req.getConnection((err, conn) => {
        if(err) return res.status(500).json({error: "Erro ao conectar ao banco de dados"});
            conn.query('SELECT * FROM veiculos', (err, veiculos) => {
                if (err) return res.status(500).json(({error: "Erro ao encontrar veiculos"}));
                const veiculo = veiculos[veiculoIndex];
                res.render('veicBusca', {
                    data: veiculos,
                    veiculoAtual: veiculo,
                    veiculoIndex: veiculoIndex,
                    totalVeiculos: veiculos.length,
                    editar: false
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


controller.next = (req, res) => {
    const veiculoIndex = parseInt(req.query.veiculoIndex) + 1; // Incrementa o índice
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json('Erro ao conectar ao banco de dados');

        conn.query('SELECT * FROM veiculos', (err, veiculos) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os veiculos');
            }

            // Se o índice for maior que o número total de veiculos, volta para o primeiro
            if (veiculoIndex >= veiculos.length) {
                return res.redirect(`/veicBusca?veiculoIndex=0&totalVeiculos=${veiculos.length}`);
            }

            // Redireciona para o próximo veiculo
            res.redirect(`/veicBusca?veiculoIndex=${veiculoIndex}&totalVeiculos=${veiculos.length}`);
        });
    });
};

controller.prev = (req, res) => {
    const veiculoIndex = parseInt(req.query.veiculoIndex) - 1; // Decrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM veiculos', (err, veiculos) => {
            if (err) return res.status(500).json('Erro ao consultar os veiculos');
            const totalVeiculos = veiculos.length;
            // Se o índice for menor que 0, volta para o último veiculo
            if (veiculoIndex < 0) {
                return res.redirect(`/veicBusca?veiculoIndex=${veiculos.length - 1}&totalVeiculos=${totalVeiculos}`);
            }


            // Redireciona para o veiculo anterior
            res.redirect(`/veicBusca?veiculoIndex=${veiculoIndex}&totalVeiculos=${totalVeiculos}`);
        });
    });
};

controller.edit = (req, res) => {
    const { veicPlaca } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        conn.query('SELECT * FROM veiculos WHERE veicPlaca = ?', [veicPlaca], (err, veiculo) => {
            if (err) return res.status(500).json({ error: "Erro ao encontrar ao consultar matrícula do veiculo" });
            res.render('veicBusca', {
                veiculoAtual: veiculo[0],
                veiculoIndex: req.query.veiculoIndex || 0,
                totalVeiculos: 1,
                editar: true
            });
        });
    });
};

controller.delete = (req, res) => {
    const { veicPlaca } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao concetar ao banco de dados" });
        conn.query('DELETE FROM veiculos WHERE veicPlaca = ?', [veicPlaca], (err, rows) => {
            if (err) return res.status(500).json({ error: "Erro ao remover veiculo" });
            res.redirect('/veicBusca');
        });
    });
};


controller.update = (req, res) => {
    const { veicPlaca } = req.params;
    const novoVeiculo = req.body;
    const veiculoIndex = req.body.veiculoIndex || 0; // pega o veiculoIndex enviado pelo formulário
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao concetar ao banco de dados" });
        conn.query('UPDATE veiculos set ? WHERE veicPlaca = ?', [novoVeiculo, veicPlaca], (err, veiculo) => {
            if (err) return res.status(500).json({ error: "Erro ao atualizar veicionário" });
            res.redirect(`/veicBusca?veiculoIndex=${veiculoIndex}`); // redirecione para o veiculo atualizado
        });
    });
};

module.exports = controller;