import {createSlice} from "@reduxjs/toolkit"

// features
import {fetchProjects} from "../projects/ProjectsFeature";


const initialState = {
    isInit: false,
    isEditMode: false
}

const homeFeature = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {
        toggleEditMode: (state) => {
            state.isEditMode = !state.isEditMode
        },
        initializedApp: (state) => {
            state.isInit = true;
        }
    }
});

export function initApp() {
    return function run(dispatch, getState) {
        const state = getState();
        if(state.home.isInit)
            return;

        dispatch(initializedApp());
        dispatch(fetchProjects());
    };
};

export const {toggleEditMode, initializedApp } = homeFeature.actions;

export default homeFeature.reducer;