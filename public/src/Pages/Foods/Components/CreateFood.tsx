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
import useCreateFood from '../../../Hooks/Food/useCreateFood';

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
const CreateFood = (props: IProps) => {
  const { handleClose } = props;
  const createFoodHook = useCreateFood();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const pictureUrlRef = useRef<HTMLInputElement>(null);

  const createFood = () => {
    const name = nameRef.current?.value;
    const pictureUrl = pictureUrlRef.current?.value;

    if (!name || name.trim() === '') {
      setError(EError.DESCRIPTION);
      return;
    }

    if (!pictureUrl || pictureUrl.trim() === '') {
      setError(EError.DESCRIPTION);
      return;
    }

    setError(null);
    createFoodHook.mutate({
      name,
      pictureUrl,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>غذای جدید</DialogTitle>
      <DialogContent>
        <Typography component="label">نام غذا</Typography>
        <TextField
          helperText={error === EError.NAME ? 'نام غذا را وارد کنید' : ' '}
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
          inputRef={pictureUrlRef}
        />
      </DialogContent>
      <DialogActions>
        {createFoodHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={createFoodHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => createFood()} disabled={createFoodHook.isLoading}>
            ایجاد
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFood;
