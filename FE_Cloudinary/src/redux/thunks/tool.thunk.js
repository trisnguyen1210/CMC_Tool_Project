import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToolsList } from "../../services/axios";

export const getListTools = createAsyncThunk("/api/tools/getList", async () => {
    const response = await getToolsList();
    return response;
});
