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

    createProject: (project, file) => {
        return async function run(dispatch, getState) {
            project.slug = project.name.replace(/\s+/g, '-').toLowerCase() 
            if(file) {
                const imgName = project.slug + ".jpg";
                const imgPath = process.env.REACT_APP_BACKEND_URL + "/uploads/" + imgName;
                project.logo_big_url = imgPath;
                uploadImage(imgName, file)
            }
            await projectsService.create(project);
    
            const projects = await projectsService.getAll();
            dispatch(actions.setProjects(projects));
        }
    },

    updateProject: (project) => {
        return async function run(dispatch, getState) {
            await projectsService.update(project);
    
            const projects = await projectsService.getAll();
            dispatch(actions.setProjects(projects));
        }
    },

    uploadSliderImage: (project, file) => {
        return async function run(dispatch, getState) {
            const imgName = project.slug + "-" + project.images.length + ".jpg";
            await uploadImage(imgName, file)
        };
    },

    deleteProject: (slug) => {
        return async function run(dispatch, _) {
            await projectsService.delete(slug)
            const projects = await projectsService.getAll()
            dispatch(actions.setProjects(projects));
        }
    }
}

async function uploadImage(imgName, file) {
    const formData = new FormData();
    formData.append('file', file, imgName);

    try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch(process.env.REACT_APP_BACKEND_URL + '/uploads', {
            method: 'POST',
            body: formData,
        });

        const data = await result.json();

        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

export const actions = projectsFeature.actions;
export default projectsFeature.reducer;