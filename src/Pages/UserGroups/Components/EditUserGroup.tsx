import React, { useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useStyles } from '../Styles';
import useEditUserGroup from '../../../Hooks/UserGroups/useEditUserGroup';
import { IUserGroup } from '../../../Interfaces/UserGroup.interface';
import { toast } from 'react-toastify';

interface IProps {
  handleClose: () => void;
  userGroup: IUserGroup;
}

enum EError {
  TITLE = 'TITLE',
}
const EditUserGroup = (props: IProps) => {
  const { handleClose, userGroup } = props;
  const editUserGroupHook = useEditUserGroup();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const groupMainName = userGroup.name.replace('SAKKU_MARKETPLACE_', '');

  const editGroup = () => {
    const name = nameRef.current?.value;
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const userGroupName = userGroup.name;
    if (!name || name.trim() === '' || name.length < 2 || !title || title.trim() === '') {
      setError(EError.TITLE);
      return;
    }
    if (
      userGroup.name.replace('SAKKU_MARKETPLACE_', '') === nameRef.current?.value &&
      userGroup.title === titleRef.current?.value &&
      userGroup.description === descriptionRef.current?.value
    ) {
      toast.error(`هیچ تغییری یافت نشد.`);
      return;
    }
    setError(null);
    editUserGroupHook.mutate({
      userGroupName,
      name,
      title,
      description,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>ویرایش گروه کاربر</DialogTitle>
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
          defaultValue={groupMainName}
        />
        <Typography component="label">عنوان گروه*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'عنوان گروه را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={titleRef}
          defaultValue={userGroup.title}
        />
        <Typography component="label">توضیحات</Typography>
        <TextField
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={descriptionRef}
          defaultValue={userGroup.description}
        />
      </DialogContent>
      <DialogActions>
        {editUserGroupHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={editUserGroupHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => editGroup()} disabled={editUserGroupHook.isLoading}>
            ثبت تغییرات
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserGroup;
