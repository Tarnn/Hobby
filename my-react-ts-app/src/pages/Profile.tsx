import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

// Define the props interface if needed
interface ProfileProps {
  // Add any props here if necessary
}

const Profile: React.FC<ProfileProps> = () => {
  return (
    <Box>
      <h1>Welcome to the Profile Page</h1>
      <Link to="/">Home</Link>
    </Box>
  );
};

export default Profile;