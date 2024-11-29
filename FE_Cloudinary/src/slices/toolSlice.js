import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getToolsList } from '../services/axios';

export const getListTools = createAsyncThunk("/api/tools/getList", async () => {
    const response = await getToolsList();
    return response;
})

const initialState = {
    listTool: [],
    pickTerm: "",
    isLoading: false,
    isError: false,
}

export const toolSlicer = createSlice({
    name: 'tool',
    initialState,
    reducers: {
    },
    extraReducers:
        (builder) => {
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
})

// Action creators are generated for each case reducer function
export const { setListTools } = toolSlicer.actions

export default toolSlicer.reducer