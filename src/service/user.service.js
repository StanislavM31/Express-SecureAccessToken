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

async function authorizationUser(email, pwd){
    const foundUser = await getUserByEmailDB(email);
    if(!foundUser.length) throw new Error("user not exist");

    const isMatch = await bcrypt.compare(pwd, foundUser[0].pwd);
    if(!isMatch) throw new Error("некоректный пароль");

    return `Авторизированный пользователь ${JSON.stringify(foundUser)}`;
}

module.exports = {createUser, authorizationUser}