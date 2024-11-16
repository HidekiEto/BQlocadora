const controller = {};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        conn.query('INSERT INTO ordem_de_servico SET ?', [data], (err, rows) => {
            if (err) return res.status(500).json({ error: "Erro ao salvar nova Ordem De Serviço" }); // Fixed typo here
            res.redirect('/ods');
        });
    });
};


controller.list = (req, res) => {
    const odsIndex = parseInt(req.query.odsIndex) || 0;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        conn.query('SELECT * FROM ordem_de_servico', (err, ods) => {
            if (err) return res.status(500).json({ error: "Erro ao encontrar ordem_de_serviço" });
            const ODS = ods[odsIndex] || ods[0];
            conn.query('SELECT funcMatricula, funcNome FROM funcionarios', (err, funcionarios) => {
                if (err) return res.status(500).json({ error: "Erro ao buscar funcionários" });
                conn.query('SELECT clienteCPF, clienteNome FROM clientes', (err, clientes) => {
                    if (err) return res.status(500).json({ error: "Erro ao buscar clientes" });
                    conn.query('SELECT veicPlaca, veicModelo FROM veiculos', (err, veiculos) => {
                        if (err) return res.status(500).json({ error: "Erro ao buscar veículos" });
                        res.render('odsBusca', {
                            odsAtual: ODS,
                            odsIndex: odsIndex,
                            totalOds: ods.length,
                            editar: false,
                            funcionarios,
                            clientes,
                            veiculos,
                        });
                    });
                });
            });
        });
    });
};


controller.next = (req, res) => {
    const odsIndex = parseInt(req.query.odsIndex) + 1; // Incrementa o índice
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json('Erro ao conectar ao banco de dados');

        conn.query('SELECT * FROM ordem_de_servico', (err, ods) => {
            if (err) {
                return res.status(500).send('Erro ao consultar a ordem_de_servico');
            }

            // se o índice for maior que o número total de ods, volta para o primeiro
            if (odsIndex >= ods.length) {
                return res.redirect(`/odsBusca?odsIndex=0&totalOds=${ods.length}`);
            }

            // redireciona para a próxima ods
            res.redirect(`/odsBusca?odsIndex=${odsIndex}&totalOds=${ods.length}`);
        });
    });
};

controller.prev = (req, res) => {
    const odsIndex = parseInt(req.query.odsIndex) - 1; // Decrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM ordem_de_servico', (err, ods) => {
            if (err) return res.status(500).json('Erro ao consultar a ordem_de_serviço');
            const totalOds = ods.length;
            // se o índice for menor que 0, volta para a última ods
            if (odsIndex < 0) {
                return res.redirect(`/odsBusca?odsIndex=${ods.length - 1}&totalOds=${totalOds}`);
            }


            // redireciona para a ods anterior
            res.redirect(`/odsBusca?odsIndex=${odsIndex}&totalOds=${totalOds}`);
        });
    });
};

controller.edit = (req, res) => {
    const { OsNum } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        conn.query('SELECT * FROM ordem_de_servico WHERE OsNum = ?', [OsNum], (err, ods) => {
            if (err) return res.status(500).json({ error: "Erro ao consultar ordem de serviço" });

            conn.query('SELECT funcMatricula, funcNome FROM funcionarios', (err, funcionarios) => {
                if (err) return res.status(500).json({ error: "Erro ao buscar funcionários" });

                conn.query('SELECT clienteCPF, clienteNome FROM clientes', (err, clientes) => {
                    if (err) return res.status(500).json({ error: "Erro ao buscar clientes" });

                    conn.query('SELECT veicPlaca, veicModelo FROM veiculos', (err, veiculos) => {
                        if (err) return res.status(500).json({ error: "Erro ao buscar veículos" });

                        res.render('odsBusca', {
                            odsAtual: ods[0],
                            odsIndex: req.query.odsIndex || 0,
                            totalOds: 1,
                            editar: true,
                            funcionarios,
                            clientes,
                            veiculos,
                        });
                    });
                });
            });
        });

    });
};
controller.delete = (req, res) => {
    const { OsNum } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao concetar ao banco de dados" });
        conn.query('DELETE FROM ordem_de_servico  WHERE OsNum = ?', [OsNum], (err, rows) => {
            if (err) return res.status(500).json({ error: "Erro ao remover ods" });
            res.redirect('/odsBusca');
        });
    });
};


controller.update = (req, res) => {
    const { OsNum } = req.params;
    const novaODS = req.body;
    const odsIndex = req.body.odsIndex || 0; // pega o odsIndex enviado pelo formulário
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao concetar ao banco de dados" });
        conn.query('UPDATE ordem_de_servico set ? WHERE OsNum = ?', [novaODS, OsNum], (err, ods) => {
            if (err) return res.status(500).json({ error: "Erro ao atualizar funcionário" });
            res.redirect(`/odsBusca?odsIndex=${odsIndex}`); // redirecione para a ods atualizado
        });
    });
};

controller.getOdsData = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });

        // consulta os dados de funcionários e clientes
        conn.query('SELECT funcMatricula, funcNome FROM funcionarios', (err, funcionarios) => {
            if (err) return res.status(500).json({ error: "Erro ao buscar funcionários" });

            conn.query('SELECT clienteCPF, clienteNome FROM clientes', (err, clientes) => {
                if (err) return res.status(500).json({ error: "Erro ao buscar clientes" });

                conn.query('SELECT veicPlaca, veicModelo FROM veiculos', (err, veiculos) => {
                    if (err) return res.status(500).json({ error: "Erro ao buscar clientes" });

                    // Renderiza o ods.ejs com os dois conjuntos de dados
                    res.render('ods', { funcionarios, clientes, veiculos });
                });
            });
        });
    });
};
module.exports = controller;



