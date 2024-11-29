import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { readFeeVos } from "../services/axios";

export const getFeeVos = createAsyncThunk("api/VOS/fee", async (ipVos) => {
    const response = await readFeeVos(ipVos);
    return response.data;
});

const initialState = {
    serverFeeVos: "101.99.5.68",
    infoFeeVos: [],
    searchTerm: "",
    isLoading: false,
    isError: false,
};

const feeVosSlice = createSlice({
    name: "feeVos",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setServerFeeVos: (state, action) => {
            state.serverFeeVos = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getFeeVos.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getFeeVos.fulfilled, (state, action) => {
                state.infoFeeVos = action.payload;
                state.filterFeeVos = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getFeeVos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { setFeeVos, setSearchTerm ,setServerFeeVos} = feeVosSlice.actions;
export default feeVosSlice.reducer;
