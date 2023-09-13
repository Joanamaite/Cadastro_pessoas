const express = require('express');
const cadastroController = require ("./controllers/cadastroController");
const usuarioController = require ("./controllers/UsuarioController");
const expressLayout = require("express-ejs-layouts");
const homeController = require ('./controllers/homeController');
const cadastroPessoaController = require ('./controllers/cadastroPessoaController');
const cadastroModel = require('./models/cadatroModel');
const atualizaController= require('./controllers/atualizaController');
const session = require("express-session");
const autenticacao = require ("./controllers/midlewareController");
const deletaController = require ("./controllers/deletarController");
const deslogarController = require ("./controllers/deslogarController");
const app = express();
const path = require('path');
const multer = require('multer');
app.use('public/image/', express.static(__dirname + 'public/image/'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const image = multer({ storage: storage }); 


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

app.get('/home',autenticacao,(req, res) => {
    app.set('layout', "./layout/Default/index");
    usuarioController.home(req, res);
});

app.get('/listar',autenticacao,(req, res) => {
    app.set('layout', "./layout/Default/index");
    homeController.getlistar(req, res);
});


app.get('/cadastro',autenticacao, (req, res)=>{
    app.set('layout', "./layout/Default/login");
    usuarioController.cadastroPessoa(req, res);
  
}); 

app.post('/cadastro',image.single('Foto'),(req, res)=>{    
    cadastroPessoaController.inserePessoa(req, res);
}); 

app.post('/deletarPessoa/:id', async (req, res) => {
    deletaController. DeletaPessoa(req, res);
});
app.get('/edit/:id',autenticacao,(req, res)=>{
    app.set('layout', "./layout/Default/login");
    atualizaController.mostrarFormularioEdicao(req, res);
}) 

app.post('/edit/:id',image.single('Foto'),(req, res)=>{
    atualizaController.editarPessoa(req, res);
} );

app.get('/sair', (req,res)=>{
    deslogarController.DeslogarUsuario(req,res);
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
