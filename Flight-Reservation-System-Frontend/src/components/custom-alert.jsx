import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { ErrorOutline } from '@material-ui/icons';

const CustomAlert = ({ title, message, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center', background: 'black', color: 'white', padding: '10px 0' }}>
        <ErrorOutline style={{ fontSize: '2rem', verticalAlign: 'middle', marginRight: '5px', color: 'white' }} />
        <span style={{ color: 'white' }}>{title}</span>
      </DialogTitle>
      <DialogContent style={{ background: 'white', padding: '20px' }}>
        <DialogContentText style={{ fontSize: '16px', textAlign: 'center' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', background: 'white', padding: '10px' }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          style={{ background: 'black', color: 'white' }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomAlert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CustomAlert;
