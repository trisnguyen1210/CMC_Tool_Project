import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataDNC } from "../services/axios";

export const getDataDNCThunk = createAsyncThunk("api/VOS/read/dncVos", async (ipVos) => {
    const response = await getDataDNC(ipVos);
    console.log(response);
    return response.data;
});

const initialState = {
    ipVos: "101.99.1.36",
    listDNC: [],
    isError: false,
    isLoading: false,
};

const dncVosSlice = createSlice({
    name: "dncVos",
    initialState,
    reducers: {
        setIpVos: (state, action) => {
            state.ipVos = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDataDNCThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getDataDNCThunk.fulfilled, (state, action) => {
                state.listDNC = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getDataDNCThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { setIpVos } = dncVosSlice.actions;
export default dncVosSlice.reducer;
