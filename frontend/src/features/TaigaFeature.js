import {createSlice} from "@reduxjs/toolkit";
import taigaService from "../services/taigaService";

const initialState = {
    projects: [],
    issues: [], 
    milestones: [],
    userStories: [],
    userStoryStatuses: []
};

const taiga = createSlice({
    name: "taigaProjects",
    initialState: initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setIssues: (state, action) => {
            state.issues = action.payload;
        },
        setMilestones: (state, action) => {
            state.milestones = action.payload
        },
        setUserStories: (state, action) => {
            state.userStories = action.payload;
        },
        setUserStoryStatuses: (state, action) => {
            state.userStoryStatuses = action.payload;
        }
    }
});

export const thunks = {
    fetchProjects: () => {
        return async function run(dispatch, _) {
            const projects = await taigaService.getProjects();
            dispatch(actions.setProjects(projects));
        };
    },

    fetchIssues: () => {
        return async function run(dispatch, _) {
            const issues = await taigaService.getIssues();
            dispatch(actions.setIssues(issues));
        }
    },

    fetchUserStories: () => {
        return async function run(dispatch, _) {
            const userStories = await taigaService.getUserStories()
            dispatch(actions.setUserStories(userStories));
        }
    },

    fetchUserStoryStatuses: () => {
        return async function run(dispatch, _) {
            const userStoryStatuses = await taigaService.getUserStoryStatuses()
            dispatch(actions.setUserStoryStatuses(userStoryStatuses));
        }
    },

    fetchMilestones: () => {
        return async function run(dispatch, _) {
            const milestones = await taigaService.getMilestones()
            dispatch(actions.setMilestones(milestones));
        }
    },
}

export const actions = taiga.actions;
export default taiga.reducer;