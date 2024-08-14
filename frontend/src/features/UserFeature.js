import {createSlice} from "@reduxjs/toolkit";

import authService from "../services/authService";

const initialState = {
    username: "",
    password: "",
    token: null,
    isAdmin: false
};

const user = createSlice({
    name: "user",
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

function checkLogin() {
    return async function run(dispatch, getState) {
        const state = getState().user;
        const result = authService.checkLogin(state.username, state.password);
        dispatch(actions.loginSuccess(result.auth_token))
    };
};


export const actions = user.actions
export const thunks = { checkLogin }

export default user.reducer;