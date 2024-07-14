import React from 'react';
import ProjectCard from '../widgets/Project/ProjectCard';

import useFetchProjects from '../hooks/useFetchProjects';


const TaigaProjects = () => {
  const projects = useFetchProjects();

  return (
    <div className='p-10'>


      <p className='text-4xl font-bold'>My Projects</p>

      


      <div className="columns-1 md:columns-2 xl:columns-3 p-10 p-10 pt-5"> 
        {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </div>
  );
};

export default TaigaProjects;
