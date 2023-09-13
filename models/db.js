const mysql = require('mysql2/promise');
require("dotenv").config();
async function connect() {
    try {
        if (global.connection && global.connection.state !== 'disconnected') {
            return global.connection;
        }
        const connection = await mysql.createConnection({
            url:'mysql://root:u3LYveu4ppFOTa5Ybw9K@containers-us-west-67.railway.app:7260/railway',
            host: 'containers-us-west-67.railway.app',
            user: 'root',
            database: 'railway', 
            password: 'u3LYveu4ppFOTa5Ybw9K',
            port:'7260'
        });

        console.log("Conectou no MySQL!");
        global.connection = connection;
        return connection;
    } catch (error) {
        console.error("Erro ao conectar ao MySQL:", error);
        throw error;
    }
}
module.exports = {connect}
