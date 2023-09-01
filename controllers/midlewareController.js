
function autenticarUsuario(req, res){
    if(req.session.user){
        res.render("home")
    }else{
        res.redirect("/");
    }
}
module.exports = {autenticarUsuario};