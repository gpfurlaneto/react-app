import { SnackbarOrigin } from '@mui/material';
import { useSnackbar, OptionsObject } from 'notistack';

const useDefaultSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const anchorOrigin: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'right',
  };

  return {
    error: (error: string, options?: OptionsObject) =>
      enqueueSnackbar(error, { ...options, variant: 'error', anchorOrigin }),
    success: (success: string, options?: OptionsObject) =>
      enqueueSnackbar(success, {
        ...options,
        variant: 'success',
        anchorOrigin,
      }),
  };
};

export default useDefaultSnackbar;
