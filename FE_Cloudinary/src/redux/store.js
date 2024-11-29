import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import feeVosReducer from "../slices/feeVosSlice";
import toolReducer from "../slices/toolSlice";
import stepReducer from "../slices/stepSlice";
import accountVosReducer from "../slices/accountVosSlice";
import processReducer from "../slices/processSlice";
import toolCPNGatewayReducer from "../slices/toolCPNGatewaySlice";
import callCurrentVosReducer from "../slices/callCurrentVosSlice";
import dncVosReducer from "../slices/dncVosSlice";
import toolMFGatewayReducer from "../slices/toolMFGatewaySlice";
export const store = configureStore({
    reducer: {
        tool: toolReducer,
        user: userReducer,

        feeVos: feeVosReducer,
        callCurrentVos: callCurrentVosReducer,

        step: stepReducer,
        accountVos: accountVosReducer,
        process: processReducer,

        toolCPNGateway: toolCPNGatewayReducer,
        toolMFGateway: toolMFGatewayReducer,
        dataDNC: dncVosReducer,
    },
});
