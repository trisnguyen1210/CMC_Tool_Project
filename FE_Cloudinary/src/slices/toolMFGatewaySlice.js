import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { readFlowDataMappingGW, readListNameMappingGW } from "../services/axios";

export const readNameMappingGWRedux = createAsyncThunk("/api/tools/read/nameMappingGateway", async (ipSearch) => {
    const response = await readListNameMappingGW(ipSearch);
    return response.data;
})

export const readFlowDataMappingGWRedux = createAsyncThunk("/api/tools/read/dataFlowMappingGateway", async ({ type, ipSearch, listNameGW, timeString }) => {
    const response = await readFlowDataMappingGW(type, ipSearch, listNameGW, timeString);
    return response.data;
})

const initialState = {
    dataFlowMappingGW: [],
    dataFlowMappingGWByDay: [],
    dataFlowMappingGWByWeek: [],
    dataFlowMappingGWByMonth: [],
    dataFlowMappingGWByQuarter: [],
    dataFlowMappingGWByYear: [],
    useTab: 1,
    listNameGW: [],
    pickNameGW: [],
    tableSearch: "Mapping",
    beginSearchTime: "",
    endSearchTime: "",
    timeSearch: {},
    isLoading: false,
    isError: false,
    resultSearch: "",
}

export const toolMFGatewaySlice = createSlice({
    name: 'toolMFGatewaySlice',
    initialState,
    reducers: {
        setPickNameGW: (state, action) => {
            state.pickNameGW = action.payload;
        },
        setTimeSearch: (state, action) => {
            state.timeSearch.type = action.payload.type;
            state.timeSearch.timeSearch = action.payload.timeSearchString;
        },
        setUseTab: (state, action) => {
            state.useTab = action.payload;
        },
        setResetToolMFGateway: (state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(readNameMappingGWRedux.fulfilled, (state, action) => {
                state.listNameGW = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(readNameMappingGWRedux.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(readNameMappingGWRedux.rejected, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(readFlowDataMappingGWRedux.fulfilled, (state, action) => {
                if (action.payload.type === "date") {
                    state.dataFlowMappingGW = action.payload.result;
                }
                if (action.payload.type === "day") {
                    state.dataFlowMappingGWByDay = action.payload.result.maxData;
                }
                if (action.payload.type === "week") {
                    state.dataFlowMappingGWByWeek = action.payload.result.maxData;
                }
                if (action.payload.type === "month") {
                    state.dataFlowMappingGWByMonth = action.payload.result.maxData;
                }
                if (action.payload.type === "quarter") {
                    state.dataFlowMappingGWByQuarter = action.payload.result.maxData;
                }
                if (action.payload.type === "year") {
                    state.dataFlowMappingGWByYear = action.payload.result.maxData;
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(readFlowDataMappingGWRedux.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(readFlowDataMappingGWRedux.rejected, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
    }
})

export const { setPickNameGW, setTimeSearch, setUseTab, setResetToolMFGateway } = toolMFGatewaySlice.actions;
export default toolMFGatewaySlice.reducer;