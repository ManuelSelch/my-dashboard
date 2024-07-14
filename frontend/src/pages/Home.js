import React, {useEffect, useState } from 'react';

import Heading from '../widgets/Heading';
import ProjectCard from '../widgets/Project/ProjectCard';

const Home = () => {
  const [config, setConfig] = useState({ projects: [] });
  
  useEffect(() => {
    const fetchData = () => {
      fetch(process.env.REACT_APP_BACKEND_URL + "/home")
        .then(response => response.json())
        .then(data => setConfig(data))
        .catch(error => console.error('Error fetching config:', error));
    };

    fetchData();
  }, []);

  return (
    <div>
      <div
        className="hero bg-no-repeat bg-cover"
        style={{ 
          backgroundImage: `url("/banner.jpg")` 
        }}
      >
      <div className="hero-overlay bg-opacity-60"/>
        <h1 className="text-5xl font-bold absolute bottom-10 left-10 text-white">Manuel Selch</h1>
      </div>

      <div className='min-h-screen p-10'>
        <Heading>Projekte</Heading>
        
        <div className="columns-1 md:columns-2 xl:columns-3 p-20 pt-10">
          {config.projects.map(project => (
            <ProjectCard key={project.slug} project={project}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
