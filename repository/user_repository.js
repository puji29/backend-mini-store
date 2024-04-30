const createDbConnection = require("../config/Database");


const addUser = async(newDataUser)=>{
    const db = await createDbConnection()
    const { username, email, password } = newDataUser

    const user = await db.query("INSERT INTO User (username,email,password) VALUES (?,?,?)",[username, email, password])

    return user
}

const getUsers = async()=>{
    const db = await createDbConnection()
    const user = await db.query("SELECT * FROM User")

    return user
}

module.exports = {
    addUser,
    getUsers
}