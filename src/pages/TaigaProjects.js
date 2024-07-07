import React, { useState, useEffect }  from 'react';
import ProjectCard from '../widgets/ProjectCard';

const url = process.env.REACT_APP_TAIGA_URL + '/api/v1';

const login_payload = {
  username: process.env.REACT_APP_TAIGA_USER,
  password: process.env.REACT_APP_TAIGA_PASS,
  type:"normal"
};

const login_options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(login_payload)
}

const TaigaProjects = () => {
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(url + '/auth', login_options)
      .then(response => response.json())
      .then(json => {
          setToken(json.auth_token);

          const projects_options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + json.auth_token
            }
          }
         
          fetch(url + '/projects', projects_options)
            .then(response => response.json())
            .then(json => setProjects(json))
            .catch(error => console.error(error))
        }
      )
      .catch(error => console.error(error));

  }, []);

  return (
    <div className='p-10'>


      <p className='text-4xl font-bold'>My Projects</p>

      

      <div class="flex flex-wrap">
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>

    </div>
  );
};

export default TaigaProjects;
