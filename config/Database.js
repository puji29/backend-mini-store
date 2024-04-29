const mysql = require("mysql2/promise")
async function  createDbConnection() {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    return db
}


module.exports = createDbConnection