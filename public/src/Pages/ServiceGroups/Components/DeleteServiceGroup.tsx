import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { IServiceGroup } from '../../../Interfaces/ServiceGroup.interface';
import useDeleteServiceGroup from '../../../Hooks/serviceGroups/useDeleteServiceGroup';

interface IProps {
  handleClose: () => void;
  serviceGroup: IServiceGroup;
}

const DeleteServiceGroup = (props: IProps) => {
  const { handleClose, serviceGroup } = props;
  const deleteServiceGroupHook = useDeleteServiceGroup();

  const deleteGroup = () => {
    deleteServiceGroupHook.mutate({ groupId: serviceGroup.id, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف گروه</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف گروه سرویس ( <b> {serviceGroup.name} </b> ) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteServiceGroupHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteServiceGroupHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deleteGroup} disabled={deleteServiceGroupHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteServiceGroup;
