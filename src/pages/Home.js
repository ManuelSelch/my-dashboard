import React from 'react';
import { Grid, Typography } from '@mui/material';
import DashboardCard from '../widgets/DashboardCard';

const Home = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Project Management Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Taiga Project Management"
            description="Manage your projects efficiently with Taiga."
            link="/taiga"
            imageUrl="/taiga_logo.png"
            internal={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Kimai Time Management"
            description="Track your time effectively with Kimai."
            link="https://time.manuelselch.de"
            imageUrl="/kimai_logo.png"
            internal={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
