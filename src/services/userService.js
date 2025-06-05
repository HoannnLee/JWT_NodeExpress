const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;


const createUserService = async (email, name, password) => {
    try {

        const hashPassword = await bcrypt.hash(password,saltRounds);

        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: '1' // 1:admin , 0: user
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}



module.exports = {
    createUserService
}