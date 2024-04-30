const bcrypt = require("bcrypt")
const { addUser } = require("../repository/user_repository")



const registerUser = async(newDataUser)=> {
    const hashedPassword = await bcrypt.hash(newDataUser.password,10)

    newDataUser.password = hashedPassword

    const user = await addUser(newDataUser)
   

    return user
}

module.exports = {
    registerUser
}

