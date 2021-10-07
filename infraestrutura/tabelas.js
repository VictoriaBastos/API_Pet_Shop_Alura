// Criação da tabela do banco de dados. Evita erros ("humanos") que poderiam acontecer se criassemos uma nova tabela no sql

class Tabelas {
    init(conexao){
        this.conexao = conexao

        this.criarAtendimentos()
    }

    criarAtendimentos(){
        // id nao nulo e é criado automaticamente
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        // executa a tabela
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos criada com sucesso.')
            }
        })
    }
}

module.exports = new Tabelas;