const db = require('./db');

async function cadastraPessoas(Nome, Data_nascimento,RG,CPF,Email,Foto,idCadastroUsuario ) {
    const sql = `INSERT INTO Pessoa (Nome, Data_nascimento,RG, CPF,Email,Foto,CadastroUsuario_idCadastroUsuario) VALUES (?, ?, ?, ?, ?,?,?)`;
    const values = [Nome, Data_nascimento,RG,CPF,Email,Foto, idCadastroUsuario];
    console.log(sql)
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

async function getTodasPessoas() {
    const sql = 'SELECT * FROM Pessoa';
    try {
      const connection = await db.connect();
      const [rows] = await connection.query(sql);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
      throw error;
    }
  }
module.exports={cadastraPessoas, getTodasPessoas};