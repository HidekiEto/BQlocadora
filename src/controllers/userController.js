// criação do objeto controller vazio, que armazenará os métodos CRUD e atualizará os registros na tabela 
const controller = {};

// função para registrar um novo usuário
controller.register = (req, res) => {
    const { usuarioLogin, usuarioSenha } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro de conexão com o banco de dados" });

        // insere novo usuário
        const newUser = { usuarioLogin, usuarioSenha };
        
        conn.query('INSERT INTO usuarios SET ?', newUser, (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao registrar usuário" });

           // res.status(201).json({ message: "Usuário registrado com sucesso" });
            res.status(201).redirect('/login');
        });
    });
};

// função para realizar login do usuário
controller.login = (req, res) => {
    const { usuarioLogin, usuarioSenha } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro de conexão com o banco de dados" });

        // verifica se o usuário existe e se a senha está correta
        conn.query('SELECT * FROM usuarios WHERE usuarioLogin = ? AND usuarioSenha = ?', [usuarioLogin, usuarioSenha], (err, rows) => {
            if (err) return res.status(500).json({ error: "Erro ao verificar usuário" });

            if (rows.length === 0) {
                return res.status(401).json({ error: "Credenciais incorretas" });
            }

            res.redirect('/client');
           // res.status(200).json({ message: "Login realizado com sucesso" });
        });
    });
};

module.exports = controller;
