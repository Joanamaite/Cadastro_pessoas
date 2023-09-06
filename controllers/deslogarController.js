async function DeslogarUsuario(req, res) {
    delete req.session.user;
    res.redirect('/');
}

module.exports={DeslogarUsuario};