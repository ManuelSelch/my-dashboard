import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

// Mock data for Taiga projects
const projects = [
  { id: 1, name: 'Project Alpha', description: 'Description for Project Alpha' },
  { id: 2, name: 'Project Beta', description: 'Description for Project Beta' },
  { id: 3, name: 'Project Gamma', description: 'Description for Project Gamma' },
];

const TaigaProjects = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Taiga Project Management
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItem key={project.id}>
            <ListItemText primary={project.name} secondary={project.description} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaigaProjects;
