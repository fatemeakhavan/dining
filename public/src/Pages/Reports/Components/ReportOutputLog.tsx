import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

interface IProps {
  handleClose: () => void;
  reportOutputLog: string;
}

const RunServiceReport = (props: IProps) => {
  const { handleClose, reportOutputLog } = props;

  return (
    <Dialog open={true} onClose={handleClose} maxWidth={'lg'}>
      <DialogTitle> خروجی لاگ </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" style={{ textAlign: 'left' }}>
          {reportOutputLog}
        </Box>
      </DialogContent>
      <DialogActions>
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose}>
            انصراف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default RunServiceReport;
