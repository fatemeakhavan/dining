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
import { IService } from '../../../Interfaces/Service.interface';
import useEditService from '../../../Hooks/Services/useEditService';

interface IProps {
  handleClose: () => void;
  service: IService;
}

enum EError {
  TITLE = 'TITLE',
}
const EditService = (props: IProps) => {
  const { handleClose, service } = props;
  const editServiceHook = useEditService();
  const [error, setError] = useState<EError | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const validNodeCountsRef = useRef<HTMLInputElement>(null);

  const [maintenanceChecked, setMaintenanceChecked] = React.useState(service.maintenanceMode);
  const [clusterModeChecked, setClusterModeChecked] = React.useState(service.clusterMode);

  const handleMaintenanceChange = (event: { target: { checked: React.SetStateAction<boolean> } }) => {
    setMaintenanceChecked(event.target.checked);
  };

  const handleClusterModeChange = (event: { target: { checked: React.SetStateAction<boolean> } }) => {
    setClusterModeChecked(event.target.checked);
  };

  const editService = () => {
    const name = nameRef.current?.value;
    const faDisplayName = displayNameRef.current?.value;
    const maintenanceMode = maintenanceChecked;
    const type = (typeRef.current?.value as unknown) as 'MANAGED' | 'UNMANAGED' | 'SHARED';
    const clusterMode = clusterModeChecked;
    const validNodeCounts = (validNodeCountsRef.current?.value.split(',') as unknown) as number[];
    const faDescription = descriptionRef.current?.value;
    const serviceId = service.id;
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
    editServiceHook.mutate({
      serviceId,
      name,
      faDisplayName,
      faDescription,
      maintenanceMode,
      type,
      clusterMode,
      validNodeCounts,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>ویرایش سرویس</DialogTitle>
      <DialogContent>
        <Typography component="label" style={{ display: 'flex' }}>نام سرویس*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'نام سرویس را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          defaultValue={service.name}
          inputRef={nameRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>عنوان سرویس*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'عنوان سرویس را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          defaultValue={service.faDisplayName}
          inputRef={displayNameRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>توضیحات*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          defaultValue={service.faDescription}
          inputRef={descriptionRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>نوع*</Typography>
        <Select inputRef={typeRef} defaultValue={service.type} style={{ width: '100%', marginBottom: '15px' }}>
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
          helperText={error === EError.TITLE ? 'تعداد نودها را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          defaultValue={service.validNodeCounts}
          inputRef={validNodeCountsRef}
        />
        <Box>
          <Typography component="label">غیر فعال کردن امکان ساخت</Typography>
          <Checkbox checked={maintenanceChecked} onChange={handleMaintenanceChange} color={'primary'} />
        </Box>
        <Typography component="label" style={{ marginLeft: '15px' }}>
          حالت کلاستری
        </Typography>
        <Checkbox checked={clusterModeChecked} onChange={handleClusterModeChange} color={'primary'} />
      </DialogContent>
      <DialogActions>
        {editServiceHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={editServiceHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => editService()} disabled={editServiceHook.isLoading}>
            ثبت تغییرات
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditService;
