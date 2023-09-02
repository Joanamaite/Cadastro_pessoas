const db = require('./db');
const md5 = require('md5');

async function verificarCredenciais(Email, Senha) {
    const hashedSenha = md5(Senha);

    const sql = `SELECT * FROM CadastroUsuario WHERE Email = ? AND Senha = ?`;
    const values = [Email,hashedSenha];

    try {
        const connection = await db.connect();
        const [rows] = await connection.query(sql, values);

        if (rows.length > 0) {
            return rows[0];
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Erro ao verificar credenciais:', error);
        throw error;
    }
}

async function insereUsuarios(Nome, Email, Senha) {
    const hashedPassword = md5(Senha);
    const sql = `INSERT INTO CadastroUsuario (Nome, Email, Senha) VALUES (?, ?, ?)`;
    const values = [Nome, Email, hashedPassword];

    try {
        const connection = await db.connect();
        const [result] = await connection.query(sql, values);

        if (result.affectedRows > 0) {
            console.log("Usuário inserido com sucesso!");
            return true;
        } else {
            console.log("Erro ao inserir usuário.");
            return false;
        }
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        throw error;
    }
}

async function verificarEmail(Email) {
    const sql = 'SELECT * FROM CadastroUsuario WHERE Email = ?';
    const values = [Email];

    try {
        const connection = await db.connect();
        const [result] = await connection.query(sql, values);

        if (result.length > 0) {
            console.log("Email já cadastrado");
            return true;
        } else {
            console.log("Email não cadastrado");
            return false;
        }
    } catch (error) {
        console.error('Erro ao verificar email:', error);
        throw error;
    }
}

module.exports = {
    verificarCredenciais,
    insereUsuarios,
    verificarEmail
};




