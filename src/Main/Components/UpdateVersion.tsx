import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import { IUser } from '../../Interfaces/User.interface';
import useUpdateVersion from '../../Hooks/Main/useUpdateVersion';
import mainifest from '../../mainifest';

interface IProps {
  handleClose: () => void;
  open: boolean;
  user: IUser;
}

const UpdateVersion = (props: IProps) => {
  const { handleClose, open, user } = props;
  const updateVersionHook = useUpdateVersion();
  const classes = useStyles();

  const appVersionLastSeenRef = useRef<HTMLInputElement>(null);

  const updateVersion = () => {


    updateVersionHook.mutate({
      appVersionLastSeen: mainifest.version,
      callBack: handleClose as () => void,
    });
  };
  const onClose = () => {
    handleClose();

    updateVersionHook.mutate({
      appVersionLastSeen: mainifest.version,
      callBack: handleClose as () => void,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> بروزرسانی نسخه ({user.appVersionLastSeen})</DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        {updateVersionHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={() => updateVersion()} disabled={updateVersionHook.isLoading}>
            بستن
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateVersion;
