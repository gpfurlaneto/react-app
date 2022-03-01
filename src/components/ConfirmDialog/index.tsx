import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface ConfirmDialogProps {
  open: boolean;
  handleConfirm: () => void;
  handleClose?: () => void;
  message: string;
}
export function ConfirmDialog({
  open,
  handleConfirm,
  handleClose,
  message,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
