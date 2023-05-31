import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import Spinner from 'Spinner';
import { IUserGroup } from '../../../Interfaces/UserGroup.interface';
import useAddUser from '../../../Hooks/UserGroups/useAddUser';

interface IProps {
  handleClose: () => void;
  userGroup: IUserGroup;
}

enum EError {
  TITLE = 'TITLE',
}

const AddUser = (props: IProps) => {
  const { handleClose, userGroup } = props;
  const [error, setError] = useState<EError | null>(null);

  const addUserHook = useAddUser();
  const usernameRef = useRef<HTMLInputElement>(null);

  const addUser = () => {
    const username = usernameRef.current?.value;
    if (!username || username.trim() === '') {
      setError(EError.TITLE);
      return;
    }
    setError(null);
    addUserHook.mutate({ groupName: userGroup.name, userName: username, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>افزودن کاربر</DialogTitle>
      <DialogContent>
        <Typography component="p">لطفا نام کاربری را جهت افزودن به گروه وارد نمایید.</Typography>
        <Typography component="label">نام کاربر</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'نام کاربری' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={usernameRef}
        />
      </DialogContent>
      <DialogActions>
        {addUserHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={addUserHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={addUser} disabled={addUserHook.isLoading}>
            افزودن
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;
