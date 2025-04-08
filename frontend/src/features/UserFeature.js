import {createSlice} from "@reduxjs/toolkit";
import userService from "../services/userService";
import { storage } from "../_refactor/hooks/useLocalStorage";

const initialState = {
    isEditMode: false,
    error: null
};


const thunks = {
    checkLogin(username, password) {
        return async (dispatch, getState)  => {
            try {
                const result = await userService.checkLogin(username, password);
                if (result.auth_token) 
                    storage.set("token", result.auth_token);
                else 
                    dispatch(actions.loginError("invalid credentials"));
            } catch (error) {
                dispatch(actions.loginError(error.toString()))
            }
        }
    }
}

const feature = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        loginError: (state, action) => {
            state.error = action.payload;
        },

        toggleEditMode: (state, _) => {
            state.isEditMode = !state.isEditMode;
        }
    }
});

export const actions = {...feature.actions, ...thunks}
export default feature.reducer;