import React from 'react';

import useAdmin from '../hooks/useAdmin';
import useLogin from '../hooks/useLogin';
import Heading from '../widgets/Heading';
import ProjectCard from '../widgets/Project/ProjectCard';


const Home = () => {
  const {projects, isEditMode, setIsEditMode} = useAdmin();
  const projectPopup = ProjectPopupData();

  const {token} = useLogin();

  function handleEditMode() {
   setIsEditMode(!isEditMode);
  }

  function handleCreateProject() {
    projectPopup.reset();
    projectPopup.setIsCreate(true);
    projectPopup.setIsShowing(true);
  };

 
  function handleEditProject(project) {
    projectPopup.reset();

    projectPopup.setProject(project);

    projectPopup.setIsCreate(false);
    projectPopup.setIsShowing(true);
  }

  return (
    <div>
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

      <div className="min-h-screen p-10">
        <Heading>Projekte</Heading>

        {token &&
          <ActionButtons 
            handleCreateProject={handleCreateProject} 
            handleEditMode={handleEditMode}
          />
        }

        <ProjectPopup  
          popupData={projectPopup}
        />
        
        
        <div className="columns-1 md:columns-2 xl:columns-3 xl:p-20 md:p-10 pt-10 mx-auto xl:w-[80%]">
          {projects && projects.map(project => (
            <ProjectCard 
              key={project.slug} 
              project={project}

              isEditMode={isEditMode}
              handleEditProject={() => {handleEditProject(project)}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionButtons = ({handleCreateProject, handleEditMode}) => {
  return (
    <>
      {/*<!-- Component: Left sided fab button with tooltips --> */}
      <div className="fixed bottom-8 left-8 z-10">
        <div className="group flex flex-col-reverse gap-2">
          <button 
            onClick={handleEditMode}
            className="group relative z-50 inline-flex h-12 items-center justify-center gap-2 self-center whitespace-nowrap rounded bg-emerald-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            <span className="relative transition duration-300 only:-mx-6 group-hover:rotate-45">
              <i className="fa-solid fa-hammer"></i>
            </span>
          </button>

          <button
            className="group relative inline-flex h-0 w-0 translate-y-2 items-center justify-center gap-2 self-center justify-self-center overflow-hidden whitespace-nowrap rounded bg-emerald-50 px-6 text-sm font-medium tracking-wide text-emerald-500 opacity-0 transition duration-300 hover:overflow-visible hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none group-hover:h-12 group-hover:w-12 group-hover:translate-y-0 group-hover:opacity-100"
            aria-describedby="tooltip-fab01"
            onClick={handleCreateProject}
          >
            <span className="relative only:-mx-6">
              <i className="fa-solid fa-plus"></i>
            </span>
            <span
              role="tooltip"
              id="tooltip-fab01"
              className="invisible absolute left-full top-1/2 z-10 ml-2 w-24 -translate-y-1/2 rounded bg-slate-700 p-2 text-xs text-white opacity-0 transition-all before:invisible before:absolute before:right-full before:top-1/2 before:z-10 before:-mt-1 before:ml-2 before:border-y-4 before:border-r-4 before:border-y-transparent before:border-r-slate-700 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100"
            >
              Create
            </span>
          </button>
          
        </div>
      </div>
      {/*<!-- End Left sided fab button with tooltips --> */}
    </>
  )
}

export default Home;
