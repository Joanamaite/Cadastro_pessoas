const mysql = require('mysql2/promise');
require("dotenv").config();
async function connect() {
    try {
        if (global.connection && global.connection.state !== 'disconnected') {
            return global.connection;
        }
        const connection = await mysql.createConnection({
            url:'mysql://root:6AnLKs7iqvqz98sS86lq@containers-us-west-73.railway.app:7612/railway',
            host: 'containers-us-west-73.railway.app',
            user: 'root',
            database: 'railway', 
            password: '6AnLKs7iqvqz98sS86lq',
            port:'7612'
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
