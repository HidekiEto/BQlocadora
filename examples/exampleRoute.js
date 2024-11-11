
router.get('/', crud.list);

// define uma rota GET para a raiz "/" || ao acessar essa rota a função crud.list é chama, o que vai listar os registro

router.post('/add', crud.save);

// define uma rota post para '/add' || quando os dados forem enviados para essa rota, a função crud.save é chamada para fazer um novo registro no bd

router.get('/delete/:id', crud.delete);

// define uma rota GET para '/delete/:id' || o ':id' é um parâmetro de rota, ou seja, a parte variável da URL (por exemplo, /delete/3) || quando essa rota é acessada, a função crud.delete é chamada, recebendo o id do registro que deve ser deletado.

router.get('/update/:id', crud.edit);

// define uma rota get para '/update/:id' || a função ao ser carregada renderiza uma página de edição para permitir que o usuário realize alterações || ela carrega os dados do registro de acordo com o id


router.post('update/:id', crud.update);

// define uma rota POST para '/update/:id' || essa rota é chamada quando o formulário de edição é enviado || a função crud.update é executada, atualizando o registro no banco de dados com os dados recebidos.
