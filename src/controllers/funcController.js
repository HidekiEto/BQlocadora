const controller = {};

controller.list = (req, res) => {
    const funcionarioIndex = parseInt(req.query.funcionarioIndex) || 0;
    req.getConnection((err, conn) => {
        if(err) return res.status(500).json({error: "Erro ao conectar ao banco de dados"});
            conn.query('SELECT * FROM funcionarios', (err, funcionarios) => {
                if (err) return res.status(500).json({error: "Erro ao encontrar funcionário"});
                const funcionario = funcionarios[funcionarioIndex];
                res.render('funcBusca', {
                    data: funcionarios,
                    funcionarioAtual: funcionario,
                    funcionarioIndex: funcionarioIndex,
                    totalFuncionarios: funcionarios.length,
                    editar: false
                });
            });
    });
};

// controller.save = (req, res) => {
//     const {funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo} = req.body;
//     req.getConnection((err, conn) => {
//         if (err) return res.status(500).json({error: "Erro ao conectar ao banco de dados"});
//             conn.query('INSERT INTO funcionarios set ?', {funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo}, (err, rows) => {
//                 if (err) return res.status(500).json({error: "Erro ao salvar novo funcionário"});
//                 res.redirect('/funcionarios');
//             });
//     });
// };

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({error: "Erro ao conectar ao banco de dados"});
            conn.query('INSERT INTO funcionarios set ?', [data], (err, rows) => {
                if (err) return res.status(500).json({error: "Erro ao salvar novo funcionário"});
                res.redirect('/funcionarios');
            });
    });
};


controller.next = (req, res) => {
    const funcionarioIndex = parseInt(req.query.funcionarioIndex) + 1; // Incrementa o índice
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json('Erro ao conectar ao banco de dados');

        conn.query('SELECT * FROM funcionarios', (err, funcionarios) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os funcionarios');
            }

            // Se o índice for maior que o número total de funcionarios, volta para o primeiro
            if (funcionarioIndex >= funcionarios.length) {
                return res.redirect(`/funcBusca?funcionarioIndex=0&totalFuncionarios=${funcionarios.length}`);
            }

            // Redireciona para o próximo funcionario
            res.redirect(`/funcBusca?funcionarioIndex=${funcionarioIndex}&totalFuncionarios=${funcionarios.length}`);
        });
    });
};

controller.prev = (req, res) => {
    const funcionarioIndex = parseInt(req.query.funcionarioIndex) - 1; // Decrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM funcionarios', (err, funcionarios) => {
            if (err) return res.status(500).json('Erro ao consultar os funcionarios');
            const totalFuncionarios = funcionarios.length;
            // Se o índice for menor que 0, volta para o último funcionario
            if (funcionarioIndex < 0) {
                return res.redirect(`/funcBusca?funcionarioIndex=${funcionarios.length - 1}&totalFuncionarios=${totalFuncionarios}`);
            }


            // Redireciona para o funcionario anterior
            res.redirect(`/funcBusca?funcionarioIndex=${funcionarioIndex}&totalFuncionarios=${totalFuncionarios}`);
        });
    });
};

controller.edit = (req, res) => {
    const { funcMatricula } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        conn.query('SELECT * FROM funcionarios WHERE funcMatricula = ?', [funcMatricula], (err, funcionario) => {
            if (err) return res.status(500).json({ error: "Erro ao encontrar ao consultar matrícula do funcionario" });
            res.render('funcBusca', {
                funcionarioAtual: funcionario[0],
                funcionarioIndex: req.query.funcionarioIndex || 0,
                totalFuncionarios: 1,
                editar: true
            });
        });
    });
};

controller.delete = (req, res) => {
    const { funcMatricula } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao concetar ao banco de dados" });
        conn.query('DELETE FROM funcionarios WHERE funcMatricula = ?', [funcMatricula], (err, rows) => {
            if (err) return res.status(500).json({ error: "Erro ao remover funcionario" });
            res.redirect('/funcBusca');
        });
    });
};


controller.update = (req, res) => {
    const { funcMatricula } = req.params;
    const novoFuncionario = req.body;
    const funcionarioIndex = req.body.funcionarioIndex || 0; // pega o funcionarioIndex enviado pelo formulário
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao concetar ao banco de dados" });
        conn.query('UPDATE funcionarios set ? WHERE funcMatricula = ?', [novoFuncionario, funcMatricula], (err, funcionario) => {
            if (err) return res.status(500).json({ error: "Erro ao atualizar funcionário" });
            res.redirect(`/funcBusca?funcionarioIndex=${funcionarioIndex}`); // redirecione para o funcionario atualizado
        });
    });
};



module.exports = controller;