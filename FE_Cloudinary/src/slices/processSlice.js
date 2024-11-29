import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    processTotal: 0,
    processValue: 0,
    isError: false,
}

export const processSlice = createSlice({
    name: 'process',
    initialState,
    reducers: {
        setProcessTotal: (state, action) => {
            state.processTotal = action.payload;
        },
        nextProcess: (state) => {
            state.processValue += 1;
        },
        errorProcess: (state) => {
            state.isError = true;
        },
        resetProcess: (state) => {
            state.processValue = 0;
            state.isError = false;
        },
    },
})

export const { setProcessTotal, nextProcess, errorProcess, resetProcess } = processSlice.actions;
export default processSlice.reducer