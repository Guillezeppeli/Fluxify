import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const WelcomeModal = ({ open, onClose, onAfterClose }) => {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    if (onAfterClose) {
      onAfterClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="welcome-dialog-title"
      aria-describedby="welcome-dialog-description"
    >
      <DialogTitle id="welcome-dialog-title">Welcome Back!</DialogTitle>
        <DialogContent>
          <DialogContentText id="welcome-dialog-description">
            It's great to see you again! Here's what's new...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomeModal;
