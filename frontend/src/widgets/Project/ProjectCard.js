import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({project}) => {
  return (
    <div className='pb-5'>
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
          <figure>
                  {project.logo_big_url
                  ? <img src={project.logo_big_url} className='w-full' alt='Project Logo'/>
                  : <div></div>
                  }
              </figure>
          <div className="p-6 text-center">
              <h3 className="text-xl font-medium text-slate-700 text-center">
                  {project.name}
              </h3>
              <Link className='btn btn-primary' to={`/project/${project.slug}`}>More</Link>
          </div>
      </div>
    </div>

  );
};

export default ProjectCard;
