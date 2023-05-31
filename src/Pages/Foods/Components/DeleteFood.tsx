import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { IFood } from '../../../Interfaces/Food';
import useDeleteFood from '../../../Hooks/Food/useDeleteFood';

interface IProps {
  handleClose: () => void;
  food: IFood;
}

const DeleteFood = (props: IProps) => {
  const { handleClose, food } = props;
  const deleteFoodHook = useDeleteFood();

  const deleteFood = () => {
    deleteFoodHook.mutate({ foodId: food.id, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف غذا</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف غذای ( <b> {food.name} </b> ) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteFoodHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteFoodHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deleteFood} disabled={deleteFoodHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFood;
