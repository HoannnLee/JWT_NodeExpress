require("dotenv").config(); 
// Nạp biến môi trường từ file .env vào process.env

const jwt = require("jsonwebtoken");
// Import thư viện jsonwebtoken để xử lý JWT

const auth = (req, res, next) => {
// Định nghĩa middleware kiểm tra xác thực JWT cho Express

    const whiteLists = ["/", "/login", "/register"];
    // Danh sách các route không cần xác thực (trắng)

    if (whiteLists.find(item => '/v1/api' + item === req.originalUrl)) {
        // Nếu đường dẫn hiện tại nằm trong danh sách trắng (ví dụ: /v1/api/login)
        next();
        // Bỏ qua kiểm tra, cho phép request đi tiếp
    } else {
        if (req.headers && req.headers.authorization) {
            // Nếu header có trường authorization (thường là Bearer token)
            
            const token = req.headers.authorization.split(" ")[1];
            // Lấy token từ header (bỏ chữ "Bearer")

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                // Giải mã và xác thực token với secret từ .env

                // gán dữ liệu cho req
                req.user = {
                    name: decoded.name,
                    email: decoded.email
                }
                console.log(decoded)
                // In ra payload đã giải mã (thường để debug)
            } catch (error) {
                // Nếu verify thất bại (token sai/hết hạn)
                console.log(">>> Error", error)
                return res.status(401).json({      
                    message: "Bạn chưa truyền token/Token hết hạn",
                });
                // Trả về lỗi 401 Unauthorized
            }

            next();
            // Nếu token hợp lệ, cho phép request đi tiếp
        } else {
            // Nếu không có token trong header
            return res.status(401).json({      
                message: "Bạn chưa truyền token/Token hết hạn",
            });
            // Trả về lỗi 401 Unauthorized
        }
    }
}

module.exports = auth;
