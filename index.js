const express = require('express');
const cadastroController = require ("./src/controllers/cadastroController");
const usuarioController = require ("./src/controllers/UsuarioController");
const expressLayout = require("express-ejs-layouts");
const homeController = require ('./src/controllers/homeController');
const cadastroPessoaController = require ('./src/controllers/cadastroPessoaController');
const cadastroModel = require('./src/models/cadatroModel');
const atualizaController= require('./src/controllers/atualizaController');
const session = require("express-session");
const autenticacao = require ("./src/controllers/midlewareController")
const app = express();
const path = require('path');

const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(expressLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true
}));

app.post('/', (req, res)=>{
    usuarioController.usuarioLogin(req, res);
});

app.get('/', (req, res)=>{
    app.set('layout', "./layout/Default/login");
    usuarioController.getLogin(req, res);
 
})
app.post('/usuario/inserir', (req, res)=>{
 cadastroController.cadastroUsuario(req, res);
});

app.get('/usuario/inserir', (req, res)=>{
    app.set('layout', "./layout/Default/login");
    usuarioController.usuarioCadastro(req, res);
});

app.get('/home',(req, res) => {
    app.set('layout', "./layout/Default/index");
    usuarioController.home(req, res);
});

app.get('/listar', (req, res) => {
    app.set('layout', "./layout/Default/index");
    homeController.getlistar(req, res);
});


app.get('/cadastro', (req, res)=>{
    app.set('layout', "./layout/Default/login");
    usuarioController.cadastroPessoa(req, res);
}); 

app.post('/cadastro',(req, res)=>{
    
    cadastroPessoaController.inserePessoa(req, res);
}); 

app.post('/deletarPessoa/:id', async (req, res) => {
    const pessoaId = req.params.id;
    console.log(pessoaId);
    try {
        await cadastroModel.deletarPessoa(pessoaId);
        res.redirect('/listar');
    } catch (error) {
        console.error("Erro ao deletar pessoa: ", error);
        res.status(500).send("Erro interno");
    }
});
app.get('/edit/:id',(req, res)=>{
    app.set('layout', "./layout/Default/login");
    atualizaController.mostrarFormularioEdicao(req, res);
}) 

app.post('/edit/:id', (req, res)=>{
    app.set('layout', "./layout/Default/index");
    atualizaController.editarPessoa(req, res);
} );

app.get('/sair', (req,res)=>{
    delete req.session.user;
    res.redirect('/');
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
