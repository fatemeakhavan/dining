import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import useDeleteLocation from '../../../Hooks/Locations/useDeleteLocation';
import { ILocation } from '../../../Interfaces/Location.interface';

interface IProps {
  handleClose: () => void;
  location: ILocation;
}

const DeleteLocation = (props: IProps) => {
  const { handleClose, location } = props;
  const deleteLocationHook = useDeleteLocation();

  const deleteLocation = () => {
    deleteLocationHook.mutate({ locationId: location.id, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف شعبه</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف شعبه ( <b> {location.name} </b> ) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteLocationHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteLocationHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deleteLocation} disabled={deleteLocationHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLocation;
