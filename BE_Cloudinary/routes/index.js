import express from "express";
import usersRouter from "./Users.route.js";
import monitoringRouter from "./Monitoring.route.js";
import vosRouter from "./VOS.route.js";
import toolRouter from "./Tool.route.js";
import insiteRouter from "./insite.route.js";
import dncRouter from "./DNC.route.js";

const router = express.Router();
router.use("/users", usersRouter);
router.use("/monitoring", monitoringRouter);
router.use("/tools", toolRouter)
router.use("/VOS", vosRouter);
router.use("/insite", insiteRouter);
router.use("/DNC", dncRouter);

export default router;
