import UsersModel from "../Models/Users.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secretkey } from "../key.env.js";

export const logIn = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const userDB = await UsersModel.findOne({ username });
        if (!userDB) {
            return res.status(404).json({ status: "failure", message: "Không tìm thấy user", data: username })
        }
        const isPasswordValid = bcrypt.compare(password, userDB.password);
        if (!isPasswordValid) {
            return res.status(409).json({ status: 'conflict', message: "Sai mật khẩu", data: isPasswordValid })
        }
        const token = jwt.sign({ username }, secretkey, { expiresIn: '1d' })
        return res.status(200).json({ status: "success", message: "Login thành công", data: token })
    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: "error", message: "Đăng nhập lỗi", data: error })
    }
}

export const signUp = async (req, res) => {
    // console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;
    const createdBy = req.body.createdBy;
    const permission = req.body.permission;
    const role = req.body.role;

    try {
        const checkExitsUser = await UsersModel.findOne({ username });
        if (checkExitsUser) {
            return res.status(409).json({ status: "conflict", message: "Tài khoản đã tồn tại", data: checkExitsUser });
        };
        const data = { username, password, createdBy, permission, role };
        const result = await UsersModel.create(data);
        return res.status(200).json({ status: "success", message: "SignUp thành công", data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failure", message: "SignUp thất bại", error: error });
    }
}

export const getUser = async (req, res) => {
    const username = req.tokenAuthen.username;
    try {
        const result = await UsersModel.findOne({ username }, { password: 0, createdBy: 0, createdAt: 0, updatedAt: 0 });
        if (!result) {
            return res.status(200).json({ status: "success", message: "Không kiếm được user trong DB", data: result });
        }
        return res.status(200).json({ status: "success", message: "Lấy data user thành công", data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Lỗi khi lấy data User", error: error })
    }
}