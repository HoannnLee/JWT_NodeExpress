const { createUserService, loginService, getUserService } = require("../services/userService");


const createUser = async (req, res) => {
    console.log(">>> check req.body: ", req.body);
    const {email, name, password} = req.body
    const data = await createUserService(email, name, password)
    return res.status(200).json(data);
}


const handleLogin = async (req, res) => {
    console.log(">>> check req.body: ", req.body);
    const {email, password} = req.body
    const data = await loginService(email, password)
    return res.status(200).json(data);
}

const getUser = async (req, res) => {
    const data = await getUserService()
    return res.status(200).json(data);
}

const getAccount =  (req, res) => {
    
    return res.status(200).json(req.user);
}

module.exports = {
    createUser,
    handleLogin,
    getUser,
    getAccount

}