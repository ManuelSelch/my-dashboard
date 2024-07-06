import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, description, link, imageUrl, internal }) => {
  const cardContent = (
    <>
      <CardMedia component="img" alt={title} image={imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <Card>
      {internal ? (
        <CardActionArea component={Link} to={link}>
          {cardContent}
        </CardActionArea>
      ) : (
        <CardActionArea href={link} target="_blank">
          {cardContent}
        </CardActionArea>
      )}
    </Card>
  );
};

export default DashboardCard;
