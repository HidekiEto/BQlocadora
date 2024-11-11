const controller = {};

controller.save = (req,res) => {
    const data = req.body;
        req.getConnection((err, conn) => {
            if (err) return res.status(500).json({erro: "Erro de conexão com o banco de dados"});
                const novoCliente = data;
                    conn.query('INSERT INTO clientes SET ?', novoCliente, (err, result) => {
                        if(err) return res.status(500).json({error: "Erro ao registrar cliente"});
                        res.status(201).redirect('/clientes');
                    });
        }) ;
}; 

module.exports = controller;