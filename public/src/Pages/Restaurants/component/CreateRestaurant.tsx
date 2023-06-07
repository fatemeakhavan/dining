import React, { useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../style';
import useCreateRestaurant from '../../../Hooks/Restaurants/useCreateRestaurant';

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
const CreateRestaurant = (props: IProps) => {
  const { handleClose } = props;
  const createRestaurantHook = useCreateRestaurant();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const createRestaurant = () => {
    const name = nameRef.current?.value;
    const logo = logoRef.current?.value;
    const address = addressRef.current?.value;

    if (!name || name.trim() === '') {
      setError(EError.DESCRIPTION);
      return;
    }

    if (!logo || logo.trim() === '') {
      setError(EError.DESCRIPTION);
      return;
    }

    if (!address || address.trim() === '') {
      setError(EError.DESCRIPTION);
      return;
    }

    setError(null);
    createRestaurantHook.mutate({
      name,
      logo,
      address,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>رستوران جدید</DialogTitle>
      <DialogContent>
        <Typography component="label">نام رستوران</Typography>
        <TextField
          helperText={error === EError.NAME ? 'نام رستوران را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          inputRef={nameRef}
        />
        <Typography component="label">آدرس عکس</Typography>
        <TextField
          helperText={error === EError.NAME ? 'آدرس تصویر را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          inputRef={logoRef}
        />
        <Typography component="label">آدرس رستوران</Typography>
        <TextField
          helperText={error === EError.NAME ? '؟آدرس رستوران را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          inputRef={addressRef}
        />
      </DialogContent>
      <DialogActions>
        {createRestaurantHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={createRestaurantHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => createRestaurant()}
            disabled={createRestaurantHook.isLoading}
          >
            ایجاد
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRestaurant;
