import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = (props) => {
  return (
    <Button 
      {...props}
      className={`custom-btn bg-blue-600 hover:bg-blue-600 ${props.className}`}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
