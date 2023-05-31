import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { IBeverage } from '../../../Interfaces/Beverage.interface';
import useDeleteBeverage from '../../../Hooks/Beverages/useDeleteBeverage';

interface IProps {
  handleClose: () => void;
  beverage: IBeverage;
}

const DeleteBeverages = (props: IProps) => {
  const { handleClose, beverage } = props;
  const deleteBeveragesHook = useDeleteBeverage();

  const deleteBeverages = () => {
    deleteBeveragesHook.mutate({ beverageId: beverage.id, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف نوشیدنی</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف نوشیدنی ( <b> {beverage.name} </b> ) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteBeveragesHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteBeveragesHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deleteBeverages} disabled={deleteBeveragesHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBeverages;
