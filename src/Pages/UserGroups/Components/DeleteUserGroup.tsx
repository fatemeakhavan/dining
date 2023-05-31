import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import useDeleteUserGroup from '../../../Hooks/UserGroups/useDeleteUserGroup';
import { IUserGroup } from '../../../Interfaces/UserGroup.interface';

interface IProps {
  handleClose: () => void;
  userGroup: IUserGroup;
}

const DeleteUserGroup = (props: IProps) => {
  const { handleClose, userGroup } = props;
  const deleteUserGroupHook = useDeleteUserGroup();

  const deleteUser = () => {
    deleteUserGroupHook.mutate({ groupName: userGroup.name, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف گروه</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف گروه کاربری ( <b> {userGroup.name} </b> ) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteUserGroupHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteUserGroupHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deleteUser} disabled={deleteUserGroupHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserGroup;
