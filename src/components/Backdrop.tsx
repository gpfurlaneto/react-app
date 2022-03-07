import BackdropMUI from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Backdrop({ show }: { show: boolean }) {
  return (
    <BackdropMUI
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}
    >
      <CircularProgress data-testid="loading-backdrop" color="inherit" />
    </BackdropMUI>
  );
}

export default Backdrop;
