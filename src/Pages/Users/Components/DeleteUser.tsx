import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import useDeleteUserFromGroup from '../../../Hooks/UserGroups/useDeleteUserFromGroup';
import { IUserGroup } from '../../../Interfaces/UserGroup.interface';
import { IGroupUser } from '../../../Interfaces/Users.interface';

interface IProps {
  handleClose: () => void;
  userGroup: IUserGroup;
  user: IGroupUser;
}

const DeleteUser = (props: IProps) => {
  const { handleClose, userGroup, user } = props;
  const deleteUserHook = useDeleteUserFromGroup();

  const deleteUser = () => {
    deleteUserHook.mutate({ groupName: userGroup.name, userName: user.username, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف کاربر</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف کاربر ( <b> {user.firstName + ' ' + user.lastName} </b> ) از گروه (<b>{userGroup.name}</b>) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteUserHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteUserHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deleteUser} disabled={deleteUserHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUser;
