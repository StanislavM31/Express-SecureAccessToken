const {createUserDB, getUserByEmailDB} = require("../repository/user.repository");
const bcrypt = require('bcrypt');
const salt = 3;

async function createUser(name, surname, email, pwd){
    const foundUser = await getUserByEmailDB(email);
    if(foundUser.length) throw new Error('Error:Такой пользователь уже есть');
    const hashPwd = await bcrypt.hash(pwd, salt);
    const data = await createUserDB(name, surname, email, hashPwd);

    if(!data.length) throw new Error("User not created");
    return data;
}


module.exports = {createUser}