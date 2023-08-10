const express = require('express');
const loginController = require ("./controllers/loginController");
const cadastroController = require ("./controllers/CadastroController");
const homeController = require ("./controllers/homeController");
const cadastroPessoaController = require ("./controllers/CadastroController");
const expressLayout = require("express-ejs-layouts");

const app = express();

const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(expressLayout);
app.set("layout", "layout/Default/index");
app.get("/", loginController.login);
app.get("/cadastrar", cadastroController.cadastro);
app.get("/home", homeController.home);
app.get("/cadastro", cadastroPessoaController.cadastroPessoa);
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
