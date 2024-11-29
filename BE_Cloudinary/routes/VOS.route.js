import express from "express";
import { deleteMappingGateway, getAccountVos, queryFeeVOS, readFlowDataMappingGW, readGatewayVos, readListNameMappingGW, updateFeeAccountVos, updateMappingGateway, updateVos3000d, warningFeeVos } from "../Controllers/VOS.controller.js";

const vosRouter = express.Router();

vosRouter.get("/feeVos", queryFeeVOS);
vosRouter.get("/read/accountVos", getAccountVos);
vosRouter.get("/read/numberGateway", readGatewayVos);
vosRouter.get("/read/listNameMappingGateway", readListNameMappingGW)
vosRouter.get("/read/dataFlowMappingGateway",readFlowDataMappingGW);
vosRouter.get("/warningFeeVos", warningFeeVos);

vosRouter.post("/update/resetFeeVos", updateFeeAccountVos);
vosRouter.post("/update/vos3000d", updateVos3000d);

vosRouter.put("/update/numberMappingGateway", updateMappingGateway);

vosRouter.delete("/delete/numberMappingGateway", deleteMappingGateway);

export default vosRouter;
