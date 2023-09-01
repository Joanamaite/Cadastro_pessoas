const usuarioModel = require('../models/usuarioModel');

async function cadastroUsuario(req, res) {
    const { Nome, Email, Senha } = req.body;

    try {
        
        const usuarioExistente = await usuarioModel.verificarEmail(Email);

        if (usuarioExistente) {
            console.log('Email já cadastrado');
            return res.redirect('/');
        }

        const insercaoBemSucedida = await usuarioModel.insereUsuarios(Nome, Email, Senha);

        if (insercaoBemSucedida) {
            console.log('Usuário cadastrado com sucesso');
            return res.redirect('/home');
        } else {
            console.log('Erro ao cadastrar usuário');
            return res.redirect('/usuario/inserir'); 
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.redirect('/usuario/inserir');
    }
}

function home(req, res) {
    res.render("home");
}

module.exports = { cadastro, home };


function cadastro(req, res){
    res.render("cadastrar")
}


function home(req, res) {
    res.render("home");
}

module.exports = {cadastro, home, cadastroUsuario};