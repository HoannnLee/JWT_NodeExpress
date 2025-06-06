require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
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


//  1 .lấy ra user theo email và password
//  2. kiểm tra xem có tồn tại user hay không
//  3. nếu có thì bắt đầu so sánh password
//  4. neu so sánh đúng thì tạo access token
//  5. nếu sai thì trả về lỗi
//  2.1 trường hợp else trả về lỗi

const loginService = async (inputEmail, password) => {
    try {

        const user = await User.findOne({email : inputEmail});
        if (user){
            const isMatchPasword = await bcrypt.compare(password, user.password);
            if(!isMatchPasword){
                return {
                    EC:2,
                    EM:"Email/Mật khẩu không hợp"
                }
            }else{
                const payload = {
                    email: user.email,
                    name: user.name,
                }

                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                );
                return  {
                    access_token ,
                    email: user.email,
                    name: user.name,
                }
            }
        }
        else{
            return{
                EC:1,
                EM:" Người dung không tồn tại"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}



module.exports = {
    createUserService,
    loginService
}