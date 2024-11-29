import express from "express";
import { checkAuthorization } from "../Middlewares/CheckAuthorization.js";
import { CreateAddReceiverMail, createNewServer, readCurrentCallVos136Schedule, reportCurrentCalVos136, reportLimitFee } from "../Controllers/Monitoring.controller.js";

const monitoringRouter = express.Router();

monitoringRouter.post("/create/newServer", checkAuthorization, createNewServer);

monitoringRouter.get("/read/currentCallSchedule", readCurrentCallVos136Schedule);

monitoringRouter.get("/read/reportCurrentCall", reportCurrentCalVos136);
// monitoringRouter.get("/read/")

monitoringRouter.post("/create/addReceiverMail", CreateAddReceiverMail)
monitoringRouter.post("/send/reportFeeVos", reportLimitFee);

export default monitoringRouter;
