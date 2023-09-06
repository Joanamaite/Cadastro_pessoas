const cadastroModel = require("../models/cadatroModel");

async function inserePessoa(req, res) {
    const {Nome, Data_nascimento,RG, CPF,Email} = req.body;
    const Foto = req.file.filename;
    console.log(Foto);
    const idCadastroUsuario = req.session.user.id;
    try {
        const insercaoBemSucedida = await cadastroModel.cadastraPessoas(Nome, Data_nascimento,RG, CPF,Email,Foto,idCadastroUsuario);
        
        if (insercaoBemSucedida) {
            console.log('Pessoa cadastrada');
            return res.redirect('/listar');
        } else {
            console.log('Erro ao cadastrar pessoa');
            return res.redirect('/home'); 
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.redirect('/edit');
    }
}


module.exports = {inserePessoa};