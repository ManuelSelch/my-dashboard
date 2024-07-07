import React, { useState, useEffect }  from 'react';
import ProjectCard from '../widgets/ProjectCard';

import useLogin from '../hooks/useLogin';
import useFetchProjects from '../hooks/useFetchProjects';


const TaigaProjects = () => {
  const token = useLogin();
  const projects = useFetchProjects();

  return (
    <div className='p-10'>


      <p className='text-4xl font-bold'>My Projects</p>

      

      <div className="flex flex-wrap pt-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </div>
  );
};

export default TaigaProjects;
