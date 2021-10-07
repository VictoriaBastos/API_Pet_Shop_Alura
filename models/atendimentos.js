// moment: biblioteca que cria e formata datas.
const moment = require('moment')
const conexao = require('../infraestrutura/conexao')


class Atendimento {
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        // validações relacionadas as regras de negócio.
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5
        const validacoes = [
            {
                nome:data,
                valido:dataEhValida, //retorna true or false
                mensagem:'Data deve ser maior ou igual a data atual'
            },
            {
                nome:'cliente',
                valido:clienteEhValido, //retorna true or false
                mensagem:'Data deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter((campo) => !campo.valido) //só retorna se for false.
        const existemErros = erros.length // if 0 == false

        // se houverem erros, o banco de dados nem é chamado.
        if(existemErros) {
            res.status(400).json(erros)
        } else {

            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'

        // Não esquecer de responder status para o cliente.
            conexao.query(sql,atendimentoDatado,(erro,resultados) => {
            if(erro){
               res.status(400).json(erro)
            }else{
                res.status(201).json(atendimento)
            }
        })

        }
        
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro,resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id,res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro){
                res.json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data =  moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores,id})
            }
        })
    }

    deleta(id,res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento;