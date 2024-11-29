import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { readCurrentCallVos } from "../services/axios"

export const getDataCurrentCall = createAsyncThunk('api/read/currentCallVos', async ({ ipSearch, options }) => {
    const response = await readCurrentCallVos(ipSearch, options);
    return response.data;
})

const initialState = {
    isError: false,
    isLoading: false,
    data: [],
    timeInterval: 30000,
    timeBegin: {
        date: "",
        time: ""
    },
    timeEnd: {
        date: "",
        time: ""
    },
    dataGroupByMappingGW: [],
    socketMessage: "",
    pointer: "",
}

export const callCurrentVosSlice = createSlice({
    name: "callCurrentVos",
    initialState,
    reducers: {
        updateCurrentCall: (state, action) => {
            state.data.push(action.payload);
        },
        updateTimeInterval: (state, action) => {
            state.timeInterval = action.payload;
        },
        updateTimeBegin: (state, action) => {
            state.timeBegin = action.payload;
        },
        updateTimeEnd: (state, action) => {
            state.timeEnd = action.payload;
        },
        updatePointer: (state, action) => {
            state.pointer = action.payload;
        },
        updateDataGroupByMappingGW: (state, action) => {
            state.dataGroupByMappingGW = action.payload;
        },
        resetPointer: (state, action) => {
            state.pointer = initialState.pointer;
        },
        resetData: (state, action) => {
            state.data = initialState.data;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDataCurrentCall.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isError = false;
                state.isLoading = false;
            })
            .addCase(getDataCurrentCall.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getDataCurrentCall.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            })
    }
});

export const { updateCurrentCall, updateTimeInterval, updateTimeBegin, updateTimeEnd, updatePointer, updateDataGroupByMappingGW, resetPointer, resetData } = callCurrentVosSlice.actions;
export default callCurrentVosSlice.reducer;