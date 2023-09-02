const UsuarioModel = require('../models/usuarioModel');
const cadastroModel = require('../models/cadatroModel');
const session = require("express-session");
async function usuarioLogin(req, res) {
    const { Email, Senha } = req.body;
   
    try {
        const usuarioEncontrado = await UsuarioModel.verificarCredenciais(Email, Senha);

        if (usuarioEncontrado) {
             req.session.user = {
                id: usuarioEncontrado.idCadastroUsuario, 
                nome: usuarioEncontrado.Nome, 
                email: usuarioEncontrado.Email
            }
            console.log(req.session.user)
            res.redirect('/home');
        } else {
            console.log("usuario Errado");
            res.redirect('/usuario/inserir');
        }
        
    } catch (error) {
        console.error('Erro ao realizar o login:', error);
        res.redirect('/login');
    }
}


function getLogin(req, res){
    res.render("login");
}

function usuarioCadastro (req, res){
    res.render('cadastrar');
}

function cadastroPessoa(req, res){
    res.render("cadastroPessoa");
}

function listarPessoa(req, res){
    res.render("listarPessoas");
}
function home(req, res){
    res.render("home");
}
async function atualiza(req, res){
    try{
        const  pessoas  = await cadastroModel.atualizarPessoa(); 
        console.log(pessoas);
        res.render('atualizar', {pessoas}); 

    } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
        res.redirect('/listar');
    }
    
}

module.exports ={usuarioLogin, usuarioCadastro, cadastroPessoa, getLogin, listarPessoa, home, atualiza};