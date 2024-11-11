// função list no objeto controller, que recebe o req e o res
controller.list = (req, res) => {
    // chama o metodo getConnection através do objeto req para conseguir uma conexão com o banco de dados (O callback recebe err(erros) e conn(conexão ativa))
    req.getConnection((err,conn) => {
        // consulta em SQL para selecionar todos os registros de uma tabela (O callback recebe err e cliente)
        conn.query('SELECT * FROM clientes', (err,cliente) => {
            //validação para ver se há erros, se ss, envia o erro como resposta JSON 
            if (err) {
                req.json(err);
            }

            // renderiza uma visualização chamada clientes e envia cliente como dados para serem exibidos ná página (cliente contém os registros retornados pela consultas sql feita anteriormente)
            res.render('login', {
                data: cliente
            });
        });
    });
};
// método  para salvar 
controller.save = (req, res) => {
    const data = req.body;
    //atribui o req.body (dado enviados no corpo da requiição) à váriavel data
    req.getConnection((err, connn) => {
        // adicionar registro na tabela || utiliza os dados do corpo da requisção (data)
        conn.query('INSERT INTO clientes set ?', [data], (err, cliente) => {
            if (err){
                res.json(err);
            }

            res.redirect('/'); // redireciona o usuário para '/' se tiver sido salvo com sucesso
        });
    });
}

controller.delete = (req, res) => {
    const { id } = req.params; // deleta || extrai o id dos parâmetros da URL
        req.getConnection((err, conn) => {
            conn.query('DELETE FROM clientes WHERE id = ?', [id], (err, rows) => { // deleta um registro de acordo com o id
                if (err) {
                    res.json(err);
                }

                res.redirect('/');
            
            });
        });
}

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        // execulta uma consulta na tabela clientes de acordo com o ID
        conn.query('SELECT * FROM clientes WHERE id = ?', [id], (err, cliente) => {
            if (err) {
                res.json(err);
            }

            //renderiza a visualização clientes_id e passa o primeiro elemento de cliente (o registro que foi encontrado) como data para edição
            res.render('clientes_edit', {
                data: cliente[0]
            });

        });
    });
}

// atualiza registro
controller.update = (req, res) => {
    const {id} = req.params;
    const newCustomer = req.body; // atribui o req.body a newCustome, que vai conter os novo dados
        req.getConnection((err,conn) => {
            // atualiza o registero de clientes com o Id fornecido, ao utilizar o dados do de newCustomer para 
            conn.query('UPDATE cliente set ? WHERE id = ?', [newCustomer, id], (err, rows) => {
                if (err) {
                    res.json(err);
                }

                res.redirect('/');
            });
        });
}

// importa o response da biblioteca express, possibilitando manipular reposta HHTP 
const res = require("express/lib/response");

// criação do objeto controller vazio, que armazenará os métodos CRUD e att os registros na tabela 
const controller = {};


// função para registrar um novo usuário
controller.register = (req, res) => {
    const { username, password } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.json({ error: "Erro de conexão com o banco de dados" });

        // verifica se o usuário já existe
        conn.query('SELECT * FROM usuarios WHERE usuarioLogin = ?', [username], (err, rows) => {
            if (rows.length > 0) {
               return res.status(400).json({ error: "Usuário já registrado" });
           }

            // insere novo usuário
            const newUser = { username, password };
            conn.query('INSERT INTO usuarios SET ?', newUser, (err, result) => {
                if (err) return res.status(500).json({ error: "Erro ao registrar usuário" });

                res.status(201).json({ message: "Usuário registrado com sucesso" });
                res.redirect('/login');
            });
        });
    });
};

// função para realizar login do usuário
controller.login = (req, res) => {
    const { username, password } = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).json({ error: "Erro de conexão com o banco de dados" });

        // verifica se o usuário existe e se a senha está correta
        conn.query('SELECT * FROM usuarios WHERE usarioLogin = ? AND usuarioSenha = ?', [username, password], (err, rows) => {
            if (err) return res.status(500).json({ error: "Erro ao verificar usuário" });

           if (rows.length === 0) {
            return res.status(401).json({ error: "Usuário ou senha incorretos" });
           }

           
            res.status(200).json({ message: "Login realizado com sucesso" });
        });
    });
};

module.exports = controller;
// exporta o objeto controller para que possa sert utilizado em outros arquivois do projeto
