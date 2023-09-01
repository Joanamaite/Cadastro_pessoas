const express = require('express');
const cadastroController = require ("./controllers/cadastroController");
const usuarioController = require ("./controllers/UsuarioController");
const expressLayout = require("express-ejs-layouts");
const homeController = require ('./controllers/homeController');
const cadastroPessoaController = require ('./controllers/cadastroPessoaController');
const session = require("express-session");
const app = express();

const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(expressLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.post('/cadastrar', (req, res)=>{
 cadastroController.cadastroUsuario(req, res);
});

app.get('/cadastrar', (req, res)=>{
    app.set('layout', "./layout/Default/login");
    usuarioController.usuarioCadastro(req, res);
});

app.get('/home', (req, res) => {
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

app.post('/cadastro', (req, res)=>{
    cadastroPessoaController.inserePessoa(req, res);
}); 

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
