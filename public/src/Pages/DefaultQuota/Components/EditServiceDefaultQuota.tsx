import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, TextField,
  Typography,
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import { IUserGroup } from '../../../Interfaces/UserGroup.interface';
import useEditServiceDefaultQuota from '../../../Hooks/ServiceDefaultQuota/useEditServiceDefaultQuota';
import { IServiceQuota } from '../../../Interfaces/ServiceQuota.interface';
import { toast } from 'react-toastify';

interface IProps {
  handleClose: () => void;
  defaultServiceQuota: IServiceQuota;
}

enum EError {
  TITLE = 'TITLE',
}

const EditServiceDefaultQuota = (props: IProps) => {
  const { handleClose, defaultServiceQuota } = props;
  const editServiceDefaultQuotaHook = useEditServiceDefaultQuota();
  const [error, setError] = useState<EError | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const maxCpuRef = useRef<HTMLInputElement>(null);
  const maxRamRef = useRef<HTMLInputElement>(null);
  const maxDiskRef = useRef<HTMLInputElement>(null);

  const editQuota = () => {
    const name = nameRef.current?.value;
    const displayName = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const maxCpu = (maxCpuRef.current?.value as unknown) as number;
    const maxCpuNumber = parseFloat((maxCpuRef.current?.value as unknown) as string);
    const maxMemory = (maxRamRef.current?.value as unknown) as number;
    const maxMemoryNumber = parseFloat((maxRamRef.current?.value as unknown) as string);
    const maxDisk = (maxDiskRef.current?.value as unknown) as number;
    const maxDiskNumber = parseFloat((maxDiskRef.current?.value as unknown) as string);

    if (
      !name ||
      name.trim() === '' ||
      name.length < 2 ||
      !displayName ||
      displayName.trim() === '' ||
      !description ||
      description.trim() === '' ||
      !maxCpu ||
      !maxMemory ||
      !maxDisk
    ) {
      toast.error(`فیلدهای ضروری را وارد کنید.`);
      setError(EError.TITLE);
      return;
    }
    if (
      defaultServiceQuota?.name === nameRef.current?.value &&
      defaultServiceQuota?.displayName === titleRef.current?.value &&
      defaultServiceQuota?.description === descriptionRef.current?.value &&
      defaultServiceQuota?.maxCpu === maxCpuNumber &&
      defaultServiceQuota?.maxMemory === maxMemoryNumber &&
      defaultServiceQuota?.maxDisk === maxDiskNumber
    ) {
      toast.error(`هیچ تغییری یافت نشد.`);
      return;
    }
    setError(null);
    editServiceDefaultQuotaHook.mutate({
      name,
      displayName,
      description,
      maxCpu,
      maxMemory,
      maxDisk,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>
        <Typography component="p">ویرایش سهمیه پیش فرض</Typography>
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Typography component="label">نام*</Typography>
          <TextField
            // helperText={error === EError.TITLE ? 'نام گروه را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={nameRef}
            defaultValue={defaultServiceQuota?.name}
          />
          <Typography component="label">عنوان*</Typography>
          <TextField
            // helperText={error === EError.TITLE ? 'عنوان گروه را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={titleRef}
            defaultValue={defaultServiceQuota?.displayName}
          />
          <Typography component="label">توضیحات*</Typography>
          <TextField
            // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={descriptionRef}
            defaultValue={defaultServiceQuota?.description}
          />
          <Typography component="label">حداکثر پردازنده*</Typography>
          <TextField
            // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            type={'number'}
            style={{ marginBottom: '15px' }}
            inputRef={maxCpuRef}
            defaultValue={defaultServiceQuota?.maxCpu}
          />
          <Typography component="label">حداکثر حافظه*</Typography>
          <TextField
            // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            type={'number'}
            style={{ marginBottom: '15px' }}
            inputRef={maxRamRef}
            defaultValue={defaultServiceQuota?.maxMemory}
          />
          <Typography component="label">حداکثر دیسک*</Typography>
          <TextField
            // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            type={'number'}
            style={{ marginBottom: '15px' }}
            inputRef={maxDiskRef}
            defaultValue={defaultServiceQuota?.maxDisk}
          />
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose}>
            بستن
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => editQuota()}
            disabled={editServiceDefaultQuotaHook.isLoading}
          >
            ثبت تغییرات
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditServiceDefaultQuota;
