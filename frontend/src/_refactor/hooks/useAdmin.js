import { useEffect, useState } from 'react';
import backendService from '../services/backendService';

import useLocalStorage from './useLocalStorage';

const useAdmin = () => {
    const [isEditMode, setIsEditMode] = useLocalStorage("editMode")

    const [home, setHome] = useLocalStorage("home");
    const [projects, setProjects] = useLocalStorage("projects");

    const fetchProjects = async () => {
        const result = await backendService.get("projects");
        setProjects(result);
    };

    const createProject = async (project) => {
        await backendService.post("projects", project);
        await fetchProjects();
    };

    const updateProject = async (project) => {
        await backendService.put("projects/"+project.slug, project);
    }

    const deleteProject = async (slug) => {
        await backendService.delete("projects/"+slug);
    }


    

    const fetchHome = async () => {
        const result = await backendService.get("home");
        setHome(result);
    };
    
    useEffect(() => {
        fetchHome();
        fetchProjects();
    }, []);  

    return {
        isEditMode, setIsEditMode,
        home, 
        projects, 
        fetchProjects, createProject, updateProject, deleteProject
    };
};

export default useAdmin;
