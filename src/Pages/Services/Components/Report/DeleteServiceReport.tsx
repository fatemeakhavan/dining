import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { IServiceReport } from '../../../../Interfaces/ServiceReport.interface';
import useDeleteServiceReport from '../../../../Hooks/ServiceReports/useDeleteServiceReport';

interface IProps {
  handleClose: () => void;
  serviceId: number;
  report: IServiceReport;
}

const DeleteReport = (props: IProps) => {
  const { handleClose, serviceId, report } = props;
  const deleteReportHook = useDeleteServiceReport();

  const deleteReport = () => {
    deleteReportHook.mutate({ serviceId: serviceId, reportId: report.id, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف گزارش</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف گزارش ( <b> {report.name} </b> ) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteReportHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteReportHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deleteReport} disabled={deleteReportHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteReport;
