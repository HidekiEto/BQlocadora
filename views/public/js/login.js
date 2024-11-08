window.onload = function() {
    function login() { //Função de login 
        var formulario = document.getElementById("form"); //Var formulario que puxa as informações do form
        var login = formulario.querySelector('#login').value; //Var login 
        var senha = formulario.querySelector('#senha').value; //Var senha

        if (login === '' || senha === '') { //If que verifica se os campos foram preenchidos
            alert("Erro! preencha as informações corretamente.");
        } else {
            alert("Login realizado com sucesso.");
            window.location.href = "inicial.html"; //Redireciona para a página inicial
        }
    }
    document.querySelector('.divbotao .login').addEventListener('click', login); //se o botão for acionado executa a função login
};

function fechar(){ //Função de fechar a página
    window.close();
}
