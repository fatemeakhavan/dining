import React from 'react';
import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  handleClose: () => void;
  source: string;
}

const DisplayImage = (props: IProps) => {
  const { handleClose, source } = props;
  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth={'lg'}>
      <DialogTitle>
        <Box width="100%" justifyContent="flex-start" display="flex">
          <IconButton edge="start" color="secondary" onClick={handleClose} style={{ padding: '0', backgroundColor: 'transparent' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box minHeight="350px" width="100%" overflow="autho" height="100%" display="flex" alignItems="center" justifyContent="center">
          <img width="100%" src={source} alt="banner" />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default DisplayImage;
