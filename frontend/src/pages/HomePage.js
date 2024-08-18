import React from "react";
import { useSelector, useDispatch } from 'react-redux';

// feature
import {actions, thunks} from "../features/ProjectsFeature"

// common
import Heading from "../common/Heading";
import ActionButtons, {ActionOption} from "../common/ActionButtons";

const Home = () => {
    const admin = useSelector((state) => state.admin);
    const projects = useSelector((state) => state.projects);
    
    const dispatch = useDispatch();

    return (
        <div>
            <Hero />

            <div className="min-h-screen p-10">
                <Heading>
                    <div className="flex justify-between">
                        <p>Projekte</p>
                        {admin.isEditMode &&
                            <ActionButtons icon="fa-plus" position="block" onClick={() => dispatch(actions.createProject())}/>
                        }
                    </div>
                </Heading>
                

                <div className="columns-1 md:columns-2 xl:columns-3 xl:p-20 md:p-10 pt-10 mx-auto xl:w-[80%]">
                {projects.map(project => (
                    <ProjectCard 
                      key={project.name} 
                      project={project}

                      isEditMode={admin.isEditMode}
                      handleEditProject={() => dispatch(editProject(project))}
                      handleDeleteProject={() => dispatch(deleteProject(project.slug))}
                    />
                ))}
                </div>
            </div>

            

            
        </div>
    );
};

const Hero = () => {
    return (
        <div
            className="hero bg-no-repeat bg-cover"
            style={{ 
            backgroundImage: `url("/banner.jpg")`,
            backgroundPosition: 'center' 
            }}
        >
            <div className="hero-overlay bg-opacity-60"/>
            <h1 className="text-5xl font-bold absolute bottom-10 left-10 text-white">Manuel Selch</h1>
        </div>
    );
}

const ProjectCard = ({project, isEditMode, handleEditProject, handleDeleteProject}) => {
    return (
        <div className='pb-5' >
        <div className="relative overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
            <Link className='pb-5' to={`/project/${project.slug}`} >
                <figure>
                {project.logo_big_url
                ? <img src={project.logo_big_url} className='w-full' alt='Project Logo'/>
                : <div className="h-[120px]"></div>
                }
                </figure>
            </Link>
            <div className="p-6 text-center">
                <Link to={`/project/${project.slug}`} className="text-xl font-medium text-slate-700 text-center">
                    {project.name}
                </Link>
            </div>

            {isEditMode &&
                <ActionButtons icon="fa-pen-to-square" onClick={handleEditProject} position="absolute">
                <ActionOption icon="fa-trash text-red-900" name="Delete" onClick={handleDeleteProject}/>    
                </ActionButtons>
            }
        </div>
        </div>
    );
}
  

export default Home;