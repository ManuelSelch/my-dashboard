import {createSlice} from "@reduxjs/toolkit";
import projectsService from "../services/projectsService";

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

export const thunks = {
    fetchProjects: () => {
        return async function run(dispatch, _) {
            const projects = await projectsService.getAll()
            dispatch(actions.setProjects(projects));
        }
    },

    deleteProject: (slug) => {
        return async function run(dispatch, _) {
            await projectsService.delete(slug)
            const projects = await projectsService.getAll()
            dispatch(actions.setProjects(projects));
        }
    }
}

export const actions = projectsFeature.actions;
export default projectsFeature.reducer;