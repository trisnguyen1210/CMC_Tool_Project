import bcrypt from 'bcrypt';

export const hashPassword = async (req, res, next) => {
    try {
        const password = req.body.password;
        // Kiểm tra xem password có tồn tại không trước khi hash
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        next();
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ status: "failure", message: "lỗi hash password", error: 'Internal Server Error' });
    }
}