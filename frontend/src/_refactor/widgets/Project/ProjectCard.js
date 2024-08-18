import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({project, isEditMode, handleEditProject, handleDeleteProject}) => {
  
  return (
    <div className='pb-5' >
      <div className="relative overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
          <Link className='pb-5' to={`/project/${project.slug}`} >
            <figure>
              {project.logo_big_url
              ? <img src={project.logo_big_url} className='w-full' alt='Project Logo'/>
              : <div></div>
              }
            </figure>
          </Link>
          <div className="p-6 text-center">
              <h3 className="text-xl font-medium text-slate-700 text-center">
                  {project.name}
              </h3>
          </div>

          {isEditMode &&
            <ActionButtons handleEditProject={handleEditProject} handleDeleteProject={handleDeleteProject}/>
          }
      </div>
    </div>

  );
};

const ActionButtons = ({handleEditProject, handleDeleteProject}) => {
  return (
    <>
      {/*<!-- Component: Left sided fab button with tooltips --> */}
      <div className="absolute bottom-0 z-10 ml-2 mb-2">
        <div className="group flex flex-col-reverse gap-2">
          <button 
            onClick={handleEditProject}
            className="group relative z-50 inline-flex h-12 items-center justify-center gap-2 self-center whitespace-nowrap rounded bg-emerald-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            <span className="relative transition duration-300 only:-mx-6 group-hover:rotate-45">
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
          </button>

          <button
            className="group relative inline-flex h-0 w-0 translate-y-2 items-center justify-center gap-2 self-center justify-self-center overflow-hidden whitespace-nowrap rounded bg-emerald-50 px-6 text-sm font-medium tracking-wide text-emerald-500 opacity-0 transition duration-300 hover:overflow-visible hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none group-hover:h-12 group-hover:w-12 group-hover:translate-y-0 group-hover:opacity-100"
            aria-describedby="tooltip-fab01"
            onClick={handleDeleteProject}
          >
            <span className="relative only:-mx-6">
              <i className="fa-solid fa-trash text-red-900"></i>
            </span>
            <span
              role="tooltip"
              id="tooltip-fab01"
              className="invisible absolute left-full top-1/2 z-10 ml-2 w-24 -translate-y-1/2 rounded bg-slate-700 p-2 text-xs text-white opacity-0 transition-all before:invisible before:absolute before:right-full before:top-1/2 before:z-10 before:-mt-1 before:ml-2 before:border-y-4 before:border-r-4 before:border-y-transparent before:border-r-slate-700 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100"
            >
              Delete
            </span>
          </button>
          
          
          
        </div>
      </div>
      {/*<!-- End Left sided fab button with tooltips --> */}
    </>
  )
}


export default ProjectCard;
