import UsersModel from "../Models/Users.model.js";

export const checkAuthorization = async (req, res, next) => {
    const idReqUser = req.body.idReqUser;
    try {
        const infoUser = await UsersModel.findById(idReqUser);
        if (infoUser.role < 3) {
            next();
        } else {
            return res
                .status(400)
                .json({ status: "false", message: "Bạn không đủ quyền hành động", data: error });
        }
    } catch (error) {
        console.log(error);
    }
};
