import { SnackbarOrigin } from '@material-ui/core'
import { useSnackbar, OptionsObject } from 'notistack'

export const useDefaultSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const anchorOrigin: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'right',
  }

  return {
    error: (error: string, options?: OptionsObject) => enqueueSnackbar(error, { ...options, variant: 'error', anchorOrigin})
  }
}