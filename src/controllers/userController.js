const { createUserService } = require("../services/userService");


const createUser = async (req, res) => {
    console.log(">>> check req.body: ", req.body);
    const {email, name, password} = req.body
    const data = await createUserService(email, name, password)
    return res.status(200).json(data);
}

module.exports = {
    createUser,

}