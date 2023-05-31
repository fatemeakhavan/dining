import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { IService } from '../../../Interfaces/Service.interface';
import useDeleteService from '../../../Hooks/Services/useDeleteService';

interface IProps {
  handleClose: () => void;
  service: IService;
}

const DeleteService = (props: IProps) => {
  const { handleClose, service } = props;
  const deleteServiceHook = useDeleteService();

  const deleteService = () => {
    deleteServiceHook.mutate({ serviceId: service.id, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف سرویس</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف سرویس ( <b> {service.name} </b> ) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteServiceHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteServiceHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deleteService} disabled={deleteServiceHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteService;
