import React, { useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import { IFood } from '../../../Interfaces/Food';
import useEditFood from '../../../Hooks/Food/useEditFood';

interface IProps {
  handleClose: () => void;
  food: IFood;
}

const EditFood = (props: IProps) => {
  const { handleClose, food } = props;
  const editFoodHook = useEditFood();
  const classes = useStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const pictureUrlRef = useRef<HTMLInputElement>(null);
  const foodId = food.id;
  const editFood = () => {
    const name = nameRef.current?.value;
    const pictureUrl = pictureUrlRef.current?.value;

    if (!name || name.trim() === '') {
      return;
    }

    if (!pictureUrl || pictureUrl.trim() === '') {
      return;
    }

    editFoodHook.mutate({
      name,
      foodId,
      pictureUrl,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>ویرایش غذای ({food.name})</DialogTitle>
      <DialogContent>
        <Typography component="label">نام غذا</Typography>
        <TextField variant="outlined" placeholder="" defaultValue={food.name} fullWidth inputRef={nameRef} />
        <Typography component="label">آدرس تصویر</Typography>
        <TextField variant="outlined" placeholder="" defaultValue={food.pictureUrl} fullWidth inputRef={pictureUrlRef} />
      </DialogContent>
      <DialogActions>
        {editFoodHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={editFoodHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => editFood()} disabled={editFoodHook.isLoading}>
            ثبت
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditFood;
