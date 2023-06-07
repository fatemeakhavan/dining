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
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import useCreateService from '../../../Hooks/Services/useCreateService';

interface IProps {
  handleClose: () => void;
}

enum EError {
  TITLE = 'TITLE',
}
const CreateService = (props: IProps) => {
  const { handleClose } = props;
  const createServiceHook = useCreateService();
  const [error, setError] = useState<EError | null>(null);
  let serviceGroupId = parseInt((window.location.pathname.replace('/service-groups/', '')).replace('services', ''));

  const nameRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const validNodeCountsRef = useRef<HTMLInputElement>(null);

  const [maintenanceChecked, setMaintenanceChecked] = React.useState(false);
  const [clusterModeChecked, setClusterModeChecked] = React.useState(false);

  const handleMaintenanceChange = (event: { target: { checked: React.SetStateAction<boolean> } }) => {
    setMaintenanceChecked(event.target.checked);
  };

  const handleClusterModeChange = (event: { target: { checked: React.SetStateAction<boolean> } }) => {
    setClusterModeChecked(event.target.checked);
  };

  const addService = () => {
    const name = nameRef.current?.value;
    const faDisplayName = displayNameRef.current?.value;
    const maintenanceMode = maintenanceChecked;
    const clusterMode = clusterModeChecked;
    const validNodeCounts = (validNodeCountsRef.current?.value.split(',') as unknown) as number[];
    const type = (typeRef.current?.value as unknown) as 'MANAGED' | 'UNMANAGED' | 'SHARED';
    const groupId = serviceGroupId;
    const faDescription = descriptionRef.current?.value;
    if (
      !name ||
      name.trim() === '' ||
      name.length < 2 ||
      !faDisplayName ||
      faDisplayName.trim() === '' ||
      !faDescription ||
      faDescription.trim() === '' ||
      !type
    ) {
      setError(EError.TITLE);
      return;
    }
    setError(null);
    createServiceHook.mutate({
      name,
      faDisplayName,
      faDescription,
      maintenanceMode,
      type,
      groupId,
      clusterMode,
      validNodeCounts,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>سرویس جدید</DialogTitle>
      <DialogContent>
        <Typography component="label" >(نام سرویس می تواند ترکیبی از حروف لاتین و اعداد باشد) *نام سرویس</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'نام سرویس را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          inputRef={nameRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>عنوان سرویس*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'عنوان سرویس را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={displayNameRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>توضیحات*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={descriptionRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>نوع*</Typography>
        <Select inputRef={typeRef} defaultValue={'MANAGED'} style={{ width: '100%', marginBottom: '15px' }}>
          <MenuItem key={1} value={'MANAGED'}>
            MANAGED
          </MenuItem>
          <MenuItem key={2} value={'UNMANAGED'}>
            UNMANAGED
          </MenuItem>
          <MenuItem key={3} value={'SHARED'}>
            SHARED
          </MenuItem>
        </Select>
        <Typography component="label">تعداد نودهای سرویس (تعداد نود ها را با , از هم جدا کنید) </Typography>
        <TextField
          helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
          variant="outlined"
          placeholder="1,2,3"
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={validNodeCountsRef}
        />
        <Box minWidth="100px">
          <Typography component="label">غیر فعال کردن امکان ساخت</Typography>
          <Checkbox checked={maintenanceChecked} onChange={handleMaintenanceChange} color={'primary'} />
        </Box>
        <Box minWidth="100px" marginBottom="4px">
          <Typography component="label">(با انتخاب این گزینه، کاربر سکو امکان ساخت سرویس از آن را نخواهد داشت)</Typography>
        </Box>
        <Typography component="label" style={{ marginLeft: '15px' }}>
          حالت کلاستری
        </Typography>
        <Checkbox checked={clusterModeChecked} onChange={handleClusterModeChange} color={'primary'} />
      </DialogContent>
      <DialogActions>
        {createServiceHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={createServiceHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => addService()} disabled={createServiceHook.isLoading}>
            ایجاد
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateService;
