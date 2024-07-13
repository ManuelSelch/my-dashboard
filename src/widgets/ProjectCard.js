import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({project}) => {
  return (
    <div className="flex flex-wrap w-1/3 max-lg:w-1/2 max-md:w-full p-1 md:p-2">
        <div className="card bg-base-100 w-96 shadow-xl mx-auto">
            <figure>
                {project.logo_big_url
                ? <img src={project.logo_big_url} alt='Project Logo'/>
                : <div></div>
                }
            </figure>
            <div className="card-body">
                <h2 className="card-title">{project.name}</h2>
                <div className="card-actions justify-end">
                    <Link className='btn btn-primary' to={`/project/${project.slug}`}>More</Link>
                </div>
            </div>
        </div>
        
    </div>
  );
};

export default ProjectCard;
