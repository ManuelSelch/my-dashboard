import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({project}) => {
  return (
    <div class="flex flex-wrap w-1/4 max-lg:w-1/3 max-md:w-1/2 p-1 md:p-2">
        <div className="card bg-base-100 w-96 shadow-xl mx-auto">
            <figure>
              <img
                src={project.logo_big_url}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{project.name}</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">More</button>
              </div>
            </div>
        </div>
        
    </div>
  );
};

export default ProjectCard;
