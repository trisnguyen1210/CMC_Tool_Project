import { createAsyncThunk } from "@reduxjs/toolkit";
import { tryGetUser, login } from "../../services/axios";

export const getUser = createAsyncThunk("api/user/getUser", async () => {
    const response = await tryGetUser();
    return response.data;
});

export const loginUser = createAsyncThunk(
    "api/user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await login(
                credentials.username,
                credentials.password
            );
            localStorage.setItem("token", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
