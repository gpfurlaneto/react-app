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
        <Button data-testid="cancel" autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button data-testid="confirm" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
