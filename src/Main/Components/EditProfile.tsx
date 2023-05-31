import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import { IUser } from '../../Interfaces/User.interface';
import Select from '@material-ui/core/Select';
import { ILocation } from '../../Interfaces/Location.interface';
import useEditProfile from '../../Hooks/Users/useEditProfile';

interface IProps {
  handleClose: () => void;
  user: IUser;
  locations?: ILocation[];
}

const EditProfile = (props: IProps) => {
  const { handleClose, user, locations } = props;
  const classes = useStyles();

  const locationRef = useRef<HTMLSelectElement>(null);
  const [enableChecked, setEnableChecked] = React.useState(false);
  const editProfileHook = useEditProfile();
  const handleEnableChange = (event: { target: { checked: React.SetStateAction<boolean> } }) => {
    setEnableChecked(event.target.checked);
  };

  const editProfile = () => {
    const sendSms = enableChecked;
    const locationId = locationRef.current?.value;
    if (!locationId) {
      return;
    }

    editProfileHook.mutate({
      sendSms,
      locationId,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>ویرایش مشخصات</DialogTitle>
      <DialogContent>
        {/*<Typography component="label">محل حضور پیشفرض</Typography>*/}
        {/*<Select*/}
        {/*  inputRef={locationRef}*/}
        {/*  style={{ width: '100%', marginBottom: '15px' }}*/}
        {/*  defaultValue={localStorage.getItem('ADMIN_PANEL:LOC')}*/}
        {/*>*/}
        {/*  {locations.map((loc) => {*/}
        {/*    return (*/}
        {/*      <MenuItem key={loc?.id} value={loc?.id}>*/}
        {/*        {loc?.name}*/}
        {/*      </MenuItem>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</Select>*/}
        <Typography component="label">ارسال پیامک</Typography>
        <Checkbox onChange={handleEnableChange} color={'primary'} />
      </DialogContent>
      <DialogActions>
        {editProfileHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={editProfileHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => editProfile()} disabled={editProfileHook.isLoading}>
            ثبت
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
