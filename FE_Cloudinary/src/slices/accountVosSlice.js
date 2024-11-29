import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccountVos } from "../services/axios";

export const getAccVos = createAsyncThunk('api/read/accountVos', async (ipVos) => {
    const response = await getAccountVos(ipVos);
    return response.data;
})

const initialState = {
    listAccount: [],
    pickAccount: [],
    pickServer: "",
    isLoading: false,
    isError: false,
}

export const accountVosSlice = createSlice({
    name: "accountVos",
    initialState,
    reducers: {
        setPickAccount: (state, action) => {
            state.pickAccount = action.payload;
        },
        resetPickAccount: (state) => {
            state.pickAccount = initialState.pickAccount;
        },
        setPickServer: (state, action) => {
            state.pickServer = action.payload;
        },
        resetAccountVos: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccVos.fulfilled, (state, action) => {
                state.listAccount = action.payload;
                state.pickAccount = [];
                state.isError = false;
            })
            .addCase(getAccVos.pending, (state, action) => {
                state.listAccount = [];
                state.pickAccount = [];
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAccVos.rejected, (state, action) => {
                state.listAccount = [];
                state.pickAccount = [];
                state.isError = true;
            })
    }
})

export const { getAccVosSlice, setPickAccount, resetPickAccount, setPickServer, resetAccountVos } = accountVosSlice.actions;
export default accountVosSlice.reducer;
