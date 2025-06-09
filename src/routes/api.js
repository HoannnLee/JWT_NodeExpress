const express = require('express');
const { createUser , handleLogin , getUser} = require('../controllers/userController');
// const delay = require('../middleware/delay');
const auth = require('../middleware/auth');

const routerAPI = express.Router();

routerAPI.all("*", auth); // Apply delay middleware to all routes

routerAPI.get('/', (req, res) => {
   return res.status(200).json("Welcome to API v1");
})

routerAPI.post('/register', createUser)
routerAPI.post('/login', handleLogin);
routerAPI.get('/user', getUser);



module.exports = routerAPI; //export default