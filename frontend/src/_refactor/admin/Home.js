import React from "react";
import { useSelector, useDispatch } from 'react-redux';

// feature
import {editProject} from "../project/ProjectFeature";
import {deleteProject} from "../projects/ProjectsFeature";
import {createProject} from "../project/ProjectFeature";

// widgets
import Hero from "./widgets/Hero";
import ProjectCard from "./widgets/ProjectCard";

// common
import Heading from "../../widgets/Heading";
import ActionButtons from "../../widgets/Common/ActionButtons";

const Home = () => {
    const home = useSelector((state) => state.home);
    const projects = useSelector((state) => state.projects);
    
    const dispatch = useDispatch();

    return (
        <div>
            <Hero />

            <div className="min-h-screen p-10">
                <Heading>
                    <div className="flex justify-between">
                        <p>Projekte</p>
                        {home.isEditMode &&
                            <ActionButtons icon="fa-plus" position="block" onClick={() => dispatch(createProject())}/>
                        }
                    </div>
                </Heading>
                

                <div className="columns-1 md:columns-2 xl:columns-3 xl:p-20 md:p-10 pt-10 mx-auto xl:w-[80%]">
                {projects.map(project => (
                    <ProjectCard 
                      key={project.name} 
                      project={project}

                      isEditMode={home.isEditMode}
                      handleEditProject={() => dispatch(editProject(project))}
                      handleDeleteProject={() => dispatch(deleteProject(project.slug))}
                    />
                ))}
                </div>
            </div>

            

            
        </div>
    );
};


export default Home;