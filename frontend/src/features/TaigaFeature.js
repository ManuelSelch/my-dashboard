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
            const projects = taigaService.getProjects();
            dispatch(actions.setProjects(projects));
        };
    },

    fetchIssues: (project) => {
        return async function run(dispatch, _) {
            const issues = await taigaService.getIssues(project);
            dispatch(actions.setIssues(issues));
        }
    },

    fetchUserStories: (project) => {
        return async function run(dispatch, _) {
            const userStories = await taigaService.getUserStories(project)
            dispatch(actions.setUserStories(userStories));
        }
    },

    fetchUserStoryStatuses: (project) => {
        return async function run(dispatch, _) {
            const userStoryStatuses = await taigaService.getUserStoryStatuses(project)
            dispatch(actions.setUserStoryStatuses(userStoryStatuses));
        }
    }
}

export const actions = taiga.actions;
export default taiga.reducer;