import {createSlice} from "@reduxjs/toolkit";
import backendService from "../services/backendService";

const initialState = [];

const projectsFeature = createSlice({
    name: "projects",
    initialState: initialState,
    reducers: {
        setProjects: (state, action) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
});

export function fetchProjects() {
    return async function run(dispatch, getState) {
        const projects = await backendService.get("projects");
        dispatch(setProjects(projects));
    }
}

export function deleteProject(slug) {
    return async function run(dispatch, getState) {
        await backendService.delete("projects/"+slug);
        const projects = await backendService.get("projects");
        dispatch(setProjects(projects));
    }
}

export const {setProjects} = projectsFeature.actions;
export default projectsFeature.reducer;