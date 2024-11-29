import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { readInfoNumberGateway } from "../services/axios";
import _ from "lodash";

export const readInfoNumber = createAsyncThunk("/api/tools/getNumber", async ({ ipSearch, inputSearch, tableSearch }) => {
    const response = await readInfoNumberGateway(ipSearch, inputSearch, tableSearch);
    return response.data;
})

const initialState = {
    tableSearch: "Mapping",
    inputSearch: "",
    ipSearch: "",
    effectList: [],
    notEffectList: [],
    deleteList: [],
    resultSearch: [],
    isLoading: false,
    isError: false,
}

export const toolCPNGatewagSlice = createSlice({
    name: 'toolCPNGatewagSlice',
    initialState,
    reducers: {
        setInputSearch: (state, action) => {
            state.inputSearch = action.payload;
        },
        setIpSearch: (state, action) => {
            state.ipSearch = action.payload;
        },
        setTableSearch: (state, action) => {
            state.tableSearch = action.payload;
        },
        setEffectList: (state, action) => {
            state.effectList = action.payload;
        },
        resetToolDeletePhoneNumberGateway: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(readInfoNumber.fulfilled, (state, action) => {
                state.resultSearch = action.payload;
                state.isLoading = false;
                state.isError = false;

                if (action.payload.length > 0) {
                    let effectList = []; 
                    let deleteList = [];
                    const inputSearchArray = state.inputSearch?.length > 0 ? state.inputSearch.split(',') : [];
                    action.payload.map((element) => {
                        const prefixesArray = element.prefixes ? element.prefixes.split(',') : [];
                        const findKeyArray = element.findKey ? element.findKey.split(',') : [];
                        const commonKeys = _.intersection(prefixesArray, findKeyArray);
                        effectList = effectList.concat(commonKeys);
                        effectList.length === commonKeys.length && (deleteList = deleteList.concat(element.name));
                    })
                    state.effectList = effectList;
                    state.deleteList = deleteList;
                    const remainingList = _.difference(inputSearchArray, effectList);
                    state.notEffectList = remainingList;
                }
            })

            .addCase(readInfoNumber.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(readInfoNumber.rejected, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
    }
})

export const { setInputSearch, setIpSearch, setTableSearch, setEffectList, resetToolDeletePhoneNumberGateway } = toolCPNGatewagSlice.actions;
export default toolCPNGatewagSlice.reducer