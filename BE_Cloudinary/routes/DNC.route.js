import express from "express";
import { getListDNCMSSMS, getListDNCVos, readNumberInDNC, recheckUpdateMemoDNC, updateDNCFromFile, updateDailyDataDNC } from "../Controllers/DNC.controller.js";
import { connectToMySQL5944, executeQuery5944 } from "../services/mySql5944.js";
import { addCacheToCacheDNC, importCacheToDNCVOS } from "../Middlewares/AddCacheDNC.js";
import { readCSVFromBottom, readCSVFromTop } from "../Middlewares/ReadFileCSV.js";

const dncRouter = express.Router();

dncRouter.get("/get/listDNC", getListDNCVos);
dncRouter.get("/read/listDNC/MSSMS", getListDNCMSSMS);
dncRouter.get("/read/listDNC/recheckMemo", recheckUpdateMemoDNC);
dncRouter.post("/update/dailyDataDNC", updateDailyDataDNC);
dncRouter.get("/read/number", readNumberInDNC)

dncRouter.post("/readDNCByFileBK", readCSVFromBottom, (req, res) => {
    return res.status(200).json({ message: 'Đã đọc xong file' });
});

dncRouter.post("/readDNCByFileBK/top", readCSVFromTop, (req, res) => {
    return res.status(200).json({ message: 'Đã đọc xong file' });
});

dncRouter.post("/updateDNCByFile", addCacheToCacheDNC, importCacheToDNCVOS, (req, res) => {
    const status = req.status;
    const process = req.process;
    if (status === "success" && process === "finish") {
        return res.status(200).json({ message: "done" })
    } else {
        return res.status(200).json({ message: "false" })
    }
});

export default dncRouter;
