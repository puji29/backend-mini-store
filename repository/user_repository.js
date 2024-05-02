const createDbConnection = require("../config/Database");


const addUser = async(newDataUser)=>{
    const db = await createDbConnection();
    const { username, email, password } = newDataUser;

    // Insert user data into the database
    await db.query("INSERT INTO User (username,email,password) VALUES (?,?,?)", [username, email, password]);

    // Retrieve the inserted data
    const insertedData = await db.query("SELECT * FROM User WHERE username = ? AND email = ?", [username, email]);

    return insertedData;
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