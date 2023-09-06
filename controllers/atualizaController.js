
const cadastroModel = require('../models/cadatroModel');

async function mostrarFormularioEdicao(req, res) {
    const idPessoa = req.params.id;


    try {
        const pessoa = await cadastroModel.obterPessoaPorId(idPessoa);

        if (!pessoa) {
            res.redirect('/listar'); 
        } else {
            res.render('atualizar', { pessoa }); 
        }
    } catch (error) {
        console.error('Erro ao buscar pessoa:', error);
        res.status(500).send('Erro interno');
    }
}


async function editarPessoa(req, res) {
    const idPessoa = req.params.id;
    const Nome = req.body.Nome;
    const Email = req.body.Email;
    const CPF = req.body.CPF;
    const RG = req.body.RG;
    const Data_nascimento= req.body.Data_nascimento;
    const Foto = req.file.filename;
    console.log(Foto);
    console.log(req.body); 
    try {
        await cadastroModel.atualizarPessoa(idPessoa,Nome, CPF, RG, Email, Data_nascimento, Foto);
        res.redirect('/listar');
    } catch (error) {
        console.error('Erro ao atualizar pessoa:', error);
        res.status(500).send('Erro interno');
    }
}

module.exports = {
    mostrarFormularioEdicao,
    editarPessoa,
};






