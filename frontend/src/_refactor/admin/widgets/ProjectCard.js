import React from "react";
import { Link } from 'react-router-dom';

// common
import ActionButtons, {ActionOption} from "../../../widgets/Common/ActionButtons";

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

export default ProjectCard;