import ListToolsModel from "../Models/ListTool.js";

export const getListTool = async (req, res) => {
    try {
        const result = await ListToolsModel.find({});
        return res.status(200).json({ status: "success", message: "Lấy danh sách tool", data: result })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Lỗi tìm kiếm danh sách tool", data: error })
    }
};

export const createNewTool = async (req, res) => {
    try {
        const nameTool = req.body.nameTool;
        const influenceLevel = req.body.influenceLevel;
        const componentEffect = req.body.componentEffect;
        const authorizeUser = req.body.authorizeUser;
        const createdBy = req.body.createdBy;
        const description = req.body.description;
        
        const slug = nameTool.toLowerCase().replace(/ /g, '-').replace(/^w-+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/--+/g, '-').trim();
        const createNewTool = await ListToolsModel.create({ nameTool, slug, influenceLevel, componentEffect, authorizeUser, createdBy, description });
        return res.status(200).json({ status: "success", message: "Thêm vào danh sách tool", data: createNewTool })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Lỗi thêm danh sách tool", data: error })
    }
}