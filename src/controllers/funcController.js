const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.status(500).json({error: "Erro ao conectar ao banco de dados"});
            conn.query('SELECT * FROM funcionarios', (err, funcionarios) => {
                if (err) return res.status(500).json({error: "Erro ao encontrar funcionário"});
                res.render('funcionarios', {
                    data: funcionarios
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




module.exports = controller;