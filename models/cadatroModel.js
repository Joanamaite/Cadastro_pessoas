const db = require('./db');

async function cadastraPessoas(Nome, Data_nascimento,RG,CPF,Email,Foto,idCadastroUsuario) {
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
  async function deletarPessoa(pessoaId) {
    const sql = `DELETE FROM Pessoa WHERE idPessoa = ?`;
    const values = [pessoaId]
    try {
        const connection = await db.connect();
        await connection.query(sql, values);
    } catch (error) {
        console.error('Erro ao deletar pessoa:', error);
        throw error;
    }
}

async function atualizarPessoa(idPessoa, Nome, CPF, RG, Email, Data_nascimento, Foto) {
    const sql = `UPDATE Pessoa SET Nome = ?, CPF = ?, RG = ?, Email = ?, Data_nascimento = ?, Foto = ? WHERE idPessoa = ?`;
    const values = [Nome, CPF, RG, Email, Data_nascimento, Foto, idPessoa]; 
    try {
        const connection = await db.connect();
        await connection.query(sql, values);
    } catch (error) {
        console.error('Erro ao atualizar pessoa:', error);
        throw error;
    }
}

  
async function obterPessoaPorId(idPessoa) {
    const sql = 'SELECT * FROM Pessoa WHERE idPessoa = ?';
    const values = [idPessoa];

    try {
        const connection = await db.connect();
        const [rows] = await connection.query(sql, values);

        if (rows.length === 1) {
            // Retorna a pessoa encontrada
            return rows[0];
        } else {
            // Retorna null se a pessoa não for encontrada
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar pessoa por ID:', error);
        throw error;
    }
}

module.exports={cadastraPessoas, getTodasPessoas,deletarPessoa, atualizarPessoa, obterPessoaPorId};