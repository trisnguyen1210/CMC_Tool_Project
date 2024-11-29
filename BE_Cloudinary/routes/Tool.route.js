import express from "express";
import { createNewTool, getListTool } from "../Controllers/Tool.controller.js";

const toolRouter = express.Router();

toolRouter.get("/getList", getListTool);
toolRouter.post("/create/newTool",createNewTool)


export default toolRouter;
