import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, tryGetUser } from "../../services/axios";
import { act } from "react";
export const getUser = createAsyncThunk("api/user/getUser", async () => {
    const response = await tryGetUser();
    return response.data;
});

export const loginUser = createAsyncThunk(
    "api/user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await login(credentials.username, credentials.password);            
            localStorage.setItem("token", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    infoUser: {},
    isLoading: false,
    isError: false,
    errorMessage: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
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
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                console.log(action.payload);
                
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
