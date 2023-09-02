const autenticar = require('./midlewareController');
const cadastroModel = require("../models/cadatroModel");

async function getlistar(req, res) {
 
    try{
        const  pessoas  = await cadastroModel.getTodasPessoas(); 
        console.log(pessoas);
        res.render('listarPessoas', {pessoas}); 

    } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
        res.redirect('/listar'); 
    }
    
}

module.exports = { getlistar }