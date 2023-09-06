const cadastroModel = require ("../models/cadatroModel");

async function DeletaPessoa(req, res) {
    const pessoaId = req.params.id;
    console.log(pessoaId);
    try {
        await cadastroModel.deletarPessoa(pessoaId);
        res.redirect('/listar');
    } catch (error) {
        console.error("Erro ao deletar pessoa: ", error);
        res.status(500).send("Erro interno");
    }
}

module.exports = {DeletaPessoa};