import React from 'react';
import Button from '@mui/material/Button';

const CreateButton = (props) => {
  return (
    <Button 
      {...props}
      className={`custom-btn bg-green-600 hover:bg-green-600 text-white ${props.className}`}
    >
      {props.children}
    </Button>
  );
};

export default CreateButton;