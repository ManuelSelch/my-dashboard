import {createSlice} from "@reduxjs/toolkit";

// services
import taigaService from "../../services/taigaService";

const initialState = {
    username: "",
    password: "",
    token: null,
    isAdmin: false
};

const login = createSlice({
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

export function checkLogin() {
    return async function run(dispatch, getState) {
        const state = getState().login;
        const result = await taigaService.post(
            "auth",
            {
                username: state.username,
                password: state.password,
                type: "normal"
            }
        );
        dispatch(loginSuccess(result.auth_token))
    };
};

export const {updateUsername, updatePassword, loginSuccess} = login.actions;
export default login.reducer;