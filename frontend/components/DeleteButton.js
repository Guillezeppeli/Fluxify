import React from 'react';
import Button from '@mui/material/Button';

const DeleteButton = (props) => {
  return (
    <Button 
      {...props}
      className={`custom-btn bg-red-600 text-white ${props.className}`}
    >
      {props.children}
    </Button>
  );
};

export default DeleteButton;