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
import useCreateBeverage from '../../../Hooks/Beverages/useCreateBeverage';

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
const CreateBeverage = (props: IProps) => {
  const { handleClose } = props;
  const createBeverageHook = useCreateBeverage();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();
  const nameRef = useRef<HTMLInputElement>(null);

  const createBeverage = () => {
    const name = nameRef.current?.value;

    if (!name || name.trim() === '') {
      setError(EError.DESCRIPTION);
      return;
    }

    setError(null);
    createBeverageHook.mutate({
      name,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>نوشیدنی جدید</DialogTitle>
      <DialogContent>
        <Typography component="label">نام نوشیدنی</Typography>
        <TextField
          helperText={error === EError.NAME ? 'نام نوشیدنی را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          inputRef={nameRef}
        />
      </DialogContent>
      <DialogActions>
        {createBeverageHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={createBeverageHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => createBeverage()} disabled={createBeverageHook.isLoading}>
            ایجاد
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBeverage;
