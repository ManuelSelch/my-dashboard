import {createSlice} from "@reduxjs/toolkit";

import userService from "../services/userService";

const initialState = {
    username: "",
    password: "",
    token: null,

    isAdmin: true,
    isEditMode: false
};

const userFeature = createSlice({
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
        },
        toggleEditMode: (state, action) => {
            state.isEditMode = !state.isEditMode;
        }
    }
});

export const thunks = {
    checkLogin: () => {
        return async function run(dispatch, getState) {
            const state = getState().user;
            const result = userService.checkLogin(state.username, state.password);
            dispatch(actions.loginSuccess(result.auth_token))
        }
    }
};

export const actions = userFeature.actions
export default userFeature.reducer;