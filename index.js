// GOAL: Subir o servidor no ar.

const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

// conectando banco de dados 
conexao.connect((erro) => { 
if(erro){
    console.log(erro)
}else{
    console.log('conectado com sucesso');

    Tabelas.init(conexao)

    // Primeiro conecta com o banco de dados e só depois roda o servidor.
    const app = customExpress();

    app.listen(3000, () => { console.log("Servidor rodando na porta 3000")});
}
})




// API Rest: Não importa o cliente o serviço deve funcionar.
// Postman é um client diferente dos navegadores.