import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { IServiceResourcePlan } from '../../../../Interfaces/ServiceResourcePlan.interface';
import useDeleteServiceResourcePlan from '../../../../Hooks/ServiceResourcePlans/useDeleteServiceResourcePlan';

interface IProps {
  handleClose: () => void;
  serviceId: number;
  plan: IServiceResourcePlan;
}

const DeleteResourcePlan = (props: IProps) => {
  const { handleClose, serviceId, plan } = props;
  const deleteResourcePlanHook = useDeleteServiceResourcePlan();

  const deletePlan = () => {
    deleteResourcePlanHook.mutate({ serviceId: serviceId, planId: plan.id, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف پلن</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف پلن ( <b> {plan.name} </b> ) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteResourcePlanHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteResourcePlanHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deletePlan} disabled={deleteResourcePlanHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteResourcePlan;
