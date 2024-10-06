import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

const MediaBox = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      // Uncomment below if fetching from a server:
      // setImageSrc(`http://localhost:3030/thermalImage?t=${new Date().getTime()}`);

      // Corrected path to reference the image from the public folder:
      setImageSrc('/thermalImg.jpeg'); // Relative path from public folder
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    // <Box
    //   component="img"
    //   sx={{ width: '100%', height: 'auto' }}
    //   src={imageSrc}
    //   alt="Thermal Image"
    // />
    <Box
      sx={{
        width: '100%',
        height: '100%', // Ensure it takes the full height of the grid cell
        overflow: 'hidden', // Hide overflow to maintain aspect ratio
      }}
    >
      <Box
        component="img"
        sx={{
          width: '100%',
          height: '100%', // Fill the grid item
          objectFit: 'cover', // Cover the area without distortion
        }}
        src={imageSrc}
        alt="Thermal Image"
      />
    </Box>
  );
};

export default MediaBox;
