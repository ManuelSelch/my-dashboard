import {createSlice} from "@reduxjs/toolkit";

// services
import auth from "../services/authService";

const initialState = {
    username: "",
    password: "",
    token: null,
    isAdmin: false
};

const user = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        updateUsername: (state, action) => {
            state.username = action.payload;
        },
        updatePassword: (state, action) => {
            state.password = action.payload;
        },
        loginSuccess: (state, action) => {
            state.isAdmin = true;
            state.token = action.payload;
        }
    }
});



export const actions = user.actions;
export default user.reducer;