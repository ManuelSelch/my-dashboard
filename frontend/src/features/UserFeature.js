import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import userService from "../services/userService";

const initialState = {
    username: "",
    password: "",
    token: null,

    isAdmin: false,
    isEditMode: false,
    error: null
};

const thunks = {
    checkLogin(username, password) {
        return async (dispatch, getState)  => {
            try {
                const result = await userService.checkLogin(username, password);
                if (result.auth_token) 
                    dispatch(actions.loginSuccess(result.auth_token));
                else 
                    dispatch(actions.loginError("invalid credentials"));
            } catch (error) {
                dispatch(actions.loginError(error))
            }
        }
    }
}

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
        loginError: (state, action) => {
            state.error = action.payload;
        },

        toggleEditMode: (state, action) => {
            state.isEditMode = !state.isEditMode;
        }
    }
});

export const actions = {...userFeature.actions, ...thunks}
export default userFeature.reducer;