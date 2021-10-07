// GOAL: Controlar todas as rotas.
// Decide o que cada rota vai fazer. 
const Atendimento = require('../models/atendimentos')

module.exports = app => {

      // GET: Usuário recebe dados.
      app.get("/atendimentos", (req,res) => { 
        Atendimento.lista(res)
    })

        app.get("/atendimentos/:id", (req,res) => {
            const id = req.params.id

            Atendimento.buscaPorId(id,res)
        })
    
    // POST: Usuário envia dados. Ex: formulário.
    app.post('/atendimentos', (req, res) => { 
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res)

    })

    app.patch('/atendimentos/:id', (req, res) => { 
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        Atendimento.deleta(id,res)
    })

  


}

// validações de erro não relacionadas a regras de negócios.