const UsuarioModel = require('../models/usuarioModel');
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
            res.redirect('/cadastrar');
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

module.exports ={usuarioLogin, usuarioCadastro, cadastroPessoa, getLogin, listarPessoa, home};