import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { IService } from '../../../Interfaces/Service.interface';
import useDeleteServiceJenkinsAction from '../../../Hooks/ServiceJenkinsActions/useDeleteServiceJenkinsAction';
import { IServiceJenkinsAction } from '../../../Interfaces/ServiceJenkinsAction.interface';

interface IProps {
  handleClose: () => void;
  service: IService;
  action: IServiceJenkinsAction;
}

const DeleteJenkinsAction = (props: IProps) => {
  const { handleClose, service, action } = props;
  const deleteJenkinsActionHook = useDeleteServiceJenkinsAction();

  const deleteAction = () => {
    deleteJenkinsActionHook.mutate({ serviceId: service.id, actionId: action.id, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف اکشن</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف اکشن ( <b> {action.name} </b> ) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteJenkinsActionHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteJenkinsActionHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deleteAction} disabled={deleteJenkinsActionHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteJenkinsAction;
