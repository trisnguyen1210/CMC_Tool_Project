import express from "express";
import { getDataInsite } from "../Controllers/Inisite.controller.js"
const insiteRouter = express.Router();

insiteRouter.get("/getDataInsite", getDataInsite);

export default insiteRouter;
