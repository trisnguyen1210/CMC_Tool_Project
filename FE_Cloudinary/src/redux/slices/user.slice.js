import { createSlice } from "@reduxjs/toolkit";
import { getUser, loginUser } from "../thunks/user.thunk";

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
