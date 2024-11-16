const controller = {};

controller.save = (req, res) => {
    const { clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc } = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ erro: "Erro de conexão com o banco de dados" });

        conn.query('INSERT INTO clientes SET ?', { clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc }, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao registrar cliente" });
            res.redirect('/clienteBusca');
        });
    });
};


controller.list = (req, res) => {
    const clienteIndex = parseInt(req.query.clienteIndex) || 0;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro de conexão com o banco de dados " });
        conn.query('SELECT * FROM clientes', (err, clientes) => {
            if (err) return res.status(500).json({ error: "Erro ao localizar usuário" });
            const cliente = clientes[clienteIndex];
            res.render('clienteBusca', {
                data: clientes,
                clienteAtual: cliente,
                clienteIndex: clienteIndex,
                totalClientes: clientes.length,
                editar: false
            });
        });
    });
};

controller.next = (req, res) => {
    const clienteIndex = parseInt(req.query.clienteIndex) + 1; // Incrementa o índice
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json('Erro ao conectar ao banco de dados');

        conn.query('SELECT * FROM clientes', (err, clientes) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os clientes');
            }

            // Se o índice for maior que o número total de clientes, volta para o primeiro
            if (clienteIndex >= clientes.length) {
                return res.redirect(`/clienteBusca?clienteIndex=0&totalClientes=${clientes.length}`);
            }

            // Redireciona para o próximo cliente
            res.redirect(`/clienteBusca?clienteIndex=${clienteIndex}&totalClientes=${clientes.length}`);
        });
    });
};

controller.prev = (req, res) => {
    const clienteIndex = parseInt(req.query.clienteIndex) - 1; // Decrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM clientes', (err, clientes) => {
            if (err) return res.status(500).json('Erro ao consultar os clientes');
            const totalClientes = clientes.length;
            // Se o índice for menor que 0, volta para o último cliente
            if (clienteIndex < 0) {
                return res.redirect(`/clienteBusca?clienteIndex=${clientes.length - 1}&totalClientes=${totalClientes}`);
            }


            // Redireciona para o cliente anterior
            res.redirect(`/clienteBusca?clienteIndex=${clienteIndex}&totalClientes=${totalClientes}`);
        });
    });
};

controller.delete = (req, res) => {
    const { clienteCPF } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao concetar ao banco de dados" });
        conn.query('DELETE FROM clientes WHERE clienteCPF = ?', [clienteCPF], (err, rows) => {
            if (err) return res.status(500).json({ error: "Erro ao remover cliente" });
            res.redirect('/clienteBusca');
        });
    });
};

controller.edit = (req, res) => {
    const { clienteCPF } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        conn.query('SELECT * FROM clientes WHERE clienteCPF = ?', [clienteCPF], (err, cliente) => {
            if (err) return res.status(500).json({ error: "Erro ao encontrar o CPF do cliente" });
            res.render('clienteBusca', {
                clienteAtual: cliente[0],
                clienteIndex: req.query.clienteIndex || 0,
                totalClientes: 1,
                editar: true
            });
        });
    });
};

controller.update = (req, res) => {
    const { clienteCPF } = req.params;
    const novoCliente = req.body;
    const clienteIndex = req.body.clienteIndex || 0; // Pegue o clienteIndex enviado pelo formulário
    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro ao concetar ao banco de dados" });
        conn.query('UPDATE clientes set ? WHERE clienteCPF = ?', [novoCliente, clienteCPF], (err, cliente) => {
            if (err) return res.status(500).json({ error: "Erro ao atualizar cliente" });
            res.redirect(`/clienteBusca?clienteIndex=${clienteIndex}`); // Redirecione para o cliente atualizado
        });
    });
};






module.exports = controller;