import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

// Define the props interface if needed
interface AboutProps {
  // Add any props here if necessary
}

const About: React.FC<AboutProps> = () => {
  return (
    <Box>
      <h1>Welcome to the About Page</h1>
      <Link to="/">Home</Link>
    </Box>
  );
};

export default About;