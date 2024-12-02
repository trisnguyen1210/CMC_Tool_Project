import { createSlice } from "@reduxjs/toolkit";
import { getListTools } from "../../slices/toolSlice";

const initialState = {
    listTool: [],
    searchText: "",
    pickTerm: "",
    isLoading: false,
    isError: false
};

export const toolSlicer = createSlice({
    name: "tool",
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getListTools.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getListTools.fulfilled, (state, action) => {
                state.listTool = action.payload.data;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getListTools.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});

export const { setSearchText } = toolSlicer.actions;

export default toolSlicer.reducer;
