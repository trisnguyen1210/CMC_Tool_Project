import jwt from "jsonwebtoken";
import { secretkey } from "../key.env.js";

export const checkAuthentication = (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(401)
            .json({ status: "failure", message: "Vui lòng đăng nhập - Không có authorization" });
    }

    const typeAuthen = req.headers.authorization.split(" ")[0];
    const tokenAuthen = req.headers.authorization.split(" ")[1];
    if (tokenAuthen === "null") {
        return res
            .status(401)
            .json({
                status: "error",
                message: "Vui lòng đăng nhập - Không có token",
                data: tokenAuthen,
            });
    }
    if (!typeAuthen === "Bearer") {
        return res
            .status(401)
            .json({
                status: "error",
                message: "Vui lòng đăng nhập - Sai phương thức",
                data: tokenAuthen,
            });
    }

    try {
        const decode = jwt.verify(tokenAuthen, secretkey);
        console.log(decode);
        req.tokenAuthen = decode;
        next();
    } catch (error) { 
        console.log("Token hết hạn");
        return res
            .status(401)
            .json({ status: "error", message: "Lỗi không thể xác thực đăng nhập", error: error });
    }
};
