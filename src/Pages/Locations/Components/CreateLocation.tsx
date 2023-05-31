import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import useCreateLocation from '../../../Hooks/Locations/useCreateLocation';

interface IProps {
  handleClose: () => void;
}

enum EError {
  NAME = 'NAME',
  DNAME = 'DNAME',
  DESCRIPTION = 'DESCRIPTION',
  LOGO = 'LOGO',
  CATEGORY = 'CATEGORY',
}
const CreateLocation = (props: IProps) => {
  const { handleClose } = props;
  const createLocationHook = useCreateLocation();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const createLocation = () => {
    const name = nameRef.current?.value;
    const address = addressRef.current?.value;

    if (!name || name.trim() === '') {
      setError(EError.DESCRIPTION);
      return;
    }
    if (!address || address.trim() === '') {
      setError(EError.DESCRIPTION);
      return;
    }

    setError(null);
    createLocationHook.mutate({
      name,
      address,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>شعبه جدید</DialogTitle>
      <DialogContent>
        <Typography component="label">نام شعبه</Typography>
        <TextField
          helperText={error === EError.NAME ? 'نام شعبه را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          inputRef={nameRef}
        />
        <Typography component="label">آدرس</Typography>
        <TextField
          helperText={error === EError.DNAME ? 'آدرس را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={addressRef}
        />
      </DialogContent>
      <DialogActions>
        {createLocationHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={createLocationHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => createLocation()} disabled={createLocationHook.isLoading}>
            ایجاد
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLocation;
