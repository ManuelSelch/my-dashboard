import {createSlice} from "@reduxjs/toolkit";
import taigaService from "../../services/taigaService";

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

export function fetchProjects() {
    return async function run(dispatch, getState) {
        const projects = taigaService.get("projects");
        dispatch(setProjects(projects));
    };
};

export function fetchIssues(project) {
    return async function run(dispatch, getState) {
        const statusList = await taigaService.get("issue-statuses?project="+project);
        const typeList = await taigaService.get("issue-types");
        const priorityList = await taigaService.get("priorities");
        const issues = await taigaService.get("issues?project="+project);

        const updatedIssues = issues.map(issue => {
            const status = statusList.find(s => s.id === issue.status);
            const type = typeList.find(s => s.id === issue.type);
            const priority = priorityList.find(s => s.id === issue.priority);
            return {
                ...issue,
                status: status ? status.name : 'unknown',
                type: type ? type.name : 'unknown',
                priority: priority ? priority.name : 'unknown'
            };
        });

        dispatch(setIssues(updatedIssues));
    }
}

export function fetchMilestones(project) {
    return async function run(dispatch, getState) {
        const milestones = await taigaService.get("milestones?project="+project);
        dispatch(setMilestones(milestones));
    };
};

export function fetchUserStories(project) {
    return async function run(dispatch, getState) {
        const userStories = await taigaService.get("userstories?project="+project);
        dispatch(setUserStories(userStories));
    }
}

export function fetchUserStoryStatuses(project) {
    return async function run(dispatch, getState) {
        const userStoryStatuses = await taigaService.get("userstory-statuses?project="+project);
        dispatch(setUserStoryStatuses(userStoryStatuses));
    }
}

export const {setProjects, setIssues, setMilestones, setUserStories, setUserStoryStatuses} = taiga.actions;
export default taiga.reducer;