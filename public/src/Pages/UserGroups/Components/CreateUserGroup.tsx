import React, { useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import useCreateUserGroup from '../../../Hooks/UserGroups/useCreateUserGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useStyles } from '../Styles';

interface IProps {
  handleClose: () => void;
}

enum EError {
  TITLE = 'TITLE',
}
const CreateUserGroup = (props: IProps) => {
  const { handleClose } = props;
  const createUserGroupHook = useCreateUserGroup();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const addUser = () => {
    const name = nameRef.current?.value;
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!name || name.trim() === '' || name.length < 2 || !title || title.trim() === '') {
      setError(EError.TITLE);
      return;
    }
    setError(null);
    createUserGroupHook.mutate({
      name,
      title,
      description,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>گروه کاربر جدید</DialogTitle>
      <DialogContent>
        <Typography component="label">نام گروه*</Typography>
        <TextField
          className={classes.createGroupInput}
          helperText={error === EError.TITLE ? 'نام گروه را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          inputRef={nameRef}
          InputProps={{
            startAdornment: <InputAdornment position="start">SAKKU_MARKETPLACE_</InputAdornment>,
          }}
        />
        <Typography component="label">عنوان گروه*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'عنوان گروه را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={titleRef}
        />
        <Typography component="label">توضیحات</Typography>
        <TextField
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={descriptionRef}
        />
      </DialogContent>
      <DialogActions>
        {createUserGroupHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={createUserGroupHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => addUser()} disabled={createUserGroupHook.isLoading}>
            ایجاد
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserGroup;
