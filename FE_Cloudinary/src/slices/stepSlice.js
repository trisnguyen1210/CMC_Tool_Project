import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stepTotal: 0,
    stepValue: 0,
    disableStep: false,
    isError: false,
}

export const stepSlice = createSlice({
    name: 'step',
    initialState,
    reducers: {
        setStepTotal: (state, action) => {
            state.stepTotal = action.payload;
        },
        nextStep: (state) => {
            if (state.stepValue < state.stepTotal) {
                state.stepValue += 1;
            }
        },
        backStep: (state) => {
            if (state.stepValue > 0) {
                state.stepValue -= 1;
            }
        },
        setDisableStep: (state, action) => {
            state.disableStep = action.payload;
        },
        resetStep: () => initialState,
    },
})

export const { setStepTotal, setDisableStep, nextStep, backStep, resetStep } = stepSlice.actions;
export default stepSlice.reducer