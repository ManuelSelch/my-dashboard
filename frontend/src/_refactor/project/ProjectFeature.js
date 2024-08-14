import {createSlice} from "@reduxjs/toolkit";
import backendService from "../../services/backendService";

import {setProjects} from "../projects/ProjectsFeature";

const initialState = {
    isShowing: false,
    isChange: false,
    isCreate: false,
    project: null,
};

const project = createSlice({
    name: "project",
    initialState: initialState,
    reducers: {
        createProject: (state) => {
            reset(state);
            state.isShowing = true;
            state.isCreate = true;
            state.project = {
                name: "",
                desciption: "",
                slug: "",
                taigaSlug: null,
                images: []
            }
        },

        editProject: (state, action) => {
            reset(state);
            state.isShowing = true;
            state.project = action.payload;
        },

        viewProject: (state, action) => {
            reset(state);
            state.project = action.payload;
        },

        updateName: (state, action) => {
            state.isChange = true;
            state.project.name = action.payload;
        },

        updateDescription: (state, action) => {
            state.isChange = true;
            state.project.description = action.payload;
        },
        
        imageChanged: (state) => {
            state.isChange = true;
        },

        deleteSliderImage: (state, action) => {
            state.isChange = true;
            state.project.images.splice(action.payload, 1);
        },

        addSliderImage: (state, action) => {
            state.isChange = true;
            state.project.images.push(action.payload)
        },

        close: (state) => {
            state.isShowing = false;
            state.isChange = false;
        }
    }
});

function reset(state) {
    state.isShowing = false;
    state.isChange = false;
    state.isCreate = false;
    state.project = null;
}

export function uploadSliderImage(file) {
    return async function run(dispatch, getState) {
        const project = getState().project.project;
        const imgName = project.slug + "-" + project.images.length + ".jpg";
        const imgPath = process.env.REACT_APP_BACKEND_URL + "/uploads/" + imgName;
        await uploadImage(imgName, file)
        dispatch(addSliderImage(imgPath));
    };
};

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

export function saveProject(file) {
    return async function run(dispatch, getState) {
        dispatch(close());

        const state = getState().project;
        
        var project = {...state.project}
        if(state.isCreate) {
            project.slug = state.project.name.replace(/\s+/g, '-').toLowerCase() 
        }
        if(file) {
            const imgName = project.slug + ".jpg";
            const imgPath = process.env.REACT_APP_BACKEND_URL + "/uploads/" + imgName;
            project.logo_big_url = imgPath;
            uploadImage(imgName, file)
        }
        if(state.isCreate) {
            await backendService.post("projects", project);
        } else {
           await backendService.put("projects/"+project.slug, project);
        }

        const projects = await backendService.get("projects");
        dispatch(setProjects(projects));
    }
}

export const {
    createProject, editProject, viewProject,
    updateName, updateDescription, 
    imageChanged, deleteSliderImage, addSliderImage,
    close
} = project.actions;

export default project.reducer;