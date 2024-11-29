import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, tryGetUser } from "../services/axios";

export const getUser = createAsyncThunk("api/users/getUser", async () => {
    const response = await tryGetUser();
    return response.data;
});

const initialState = {
    infoUser: {},
    isLoading: false,
    isError: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.infoUser = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
