import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Switch, TextField,
  Typography,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { IService } from '../../../Interfaces/Service.interface';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { toast } from 'react-toastify';
import useEditServiceQuota from '../../../Hooks/ServiceQuota/useEditServiceQuota';
import { IUserGroup } from '../../../Interfaces/UserGroup.interface';

interface IProps {
  handleClose: () => void;
  service: IService;
  userGroups: IUserGroup[] | undefined;
}

enum EError {
  TITLE = 'TITLE',
}

const ServiceQuota = (props: IProps) => {
  const { handleClose, service, userGroups } = props;
  const editServiceQuotaHook = useEditServiceQuota();
  const [isEditing, setIsEditing] = React.useState(false);
  const [error, setError] = useState<EError | null>(null);
  const [isAdminDataCenter, setIsAdminDataCenter] = React.useState(
    !!userGroups?.find((grp) => grp.name === 'SAKKU_MARKETPLACE_DATACENTER_ADMIN'),
  );

  const handleChange = (event: { target: { checked: React.SetStateAction<boolean> } }) => {
    setIsEditing(event.target.checked);
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const maxCpuRef = useRef<HTMLInputElement>(null);
  const maxRamRef = useRef<HTMLInputElement>(null);
  const maxDiskRef = useRef<HTMLInputElement>(null);

  const editQuota = () => {
    const serviceId = service.id;
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
      setError(EError.TITLE);
      return;
    }
    if (
      service.quota?.name === nameRef.current?.value &&
      service.quota?.displayName === titleRef.current?.value &&
      service.quota?.description === descriptionRef.current?.value &&
      service.quota?.maxCpu === maxCpuNumber &&
      service.quota?.maxMemory === maxMemoryNumber &&
      service.quota?.maxDisk === maxDiskNumber
    ) {
      toast.error(`هیچ تغییری یافت نشد.`);
      return;
    }
    setError(null);
    editServiceQuotaHook.mutate({
      serviceId,
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
        <Typography component="p">
        سهمیه سرویس (  <b> {service.name} </b> )
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Switch
          checked={isEditing}
          onChange={handleChange}
          color="primary"
          disabled={!isAdminDataCenter}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography component="label">ویرایش</Typography>
        {isEditing ? (
          <TableContainer>
            <Typography component="label">نام</Typography>
            <TextField
              // helperText={error === EError.TITLE ? 'نام گروه را وارد کنید' : ' '}
              variant="outlined"
              placeholder=""
              fullWidth
              style={{ marginBottom: '15px' }}
              inputRef={nameRef}
              defaultValue={service.quota?.name}
            />
            <Typography component="label">عنوان</Typography>
            <TextField
              // helperText={error === EError.TITLE ? 'عنوان گروه را وارد کنید' : ' '}
              variant="outlined"
              placeholder=""
              fullWidth
              style={{ marginBottom: '15px' }}
              inputRef={titleRef}
              defaultValue={service.quota?.displayName}
            />
            <Typography component="label">توضیحات</Typography>
            <TextField
              // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
              variant="outlined"
              placeholder=""
              fullWidth
              style={{ marginBottom: '15px' }}
              inputRef={descriptionRef}
              defaultValue={service.quota?.description}
            />
            <Typography component="label">حداکثر پردازنده</Typography>
            <TextField
              // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
              variant="outlined"
              placeholder=""
              fullWidth
              type={'number'}
              style={{ marginBottom: '15px' }}
              inputRef={maxCpuRef}
              defaultValue={service.quota?.maxCpu}
            />
            <Typography component="label">حداکثر حافظه</Typography>
            <TextField
              // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
              variant="outlined"
              placeholder=""
              fullWidth
              type={'number'}
              style={{ marginBottom: '15px' }}
              inputRef={maxRamRef}
              defaultValue={service.quota?.maxMemory}
            />
            <Typography component="label">حداکثر دیسک</Typography>
            <TextField
              // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
              variant="outlined"
              placeholder=""
              fullWidth
              type={'number'}
              style={{ marginBottom: '15px' }}
              inputRef={maxDiskRef}
              defaultValue={service.quota?.maxDisk}
            />
          </TableContainer>
        ) : (
          <TableContainer>
            <Table style={{ direction: 'rtl' }} aria-label="simple table">
              <TableBody>
                <TableRow key={1} className="hover">
                  <TableCell align="left">
                    <Typography component="h2" style={{ marginLeft: '15px' }}>
                      نام:
                    </Typography>
                  </TableCell>
                  <TableCell> {service.quota?.name} </TableCell>
                </TableRow>
                <TableRow key={2} className="hover">
                  <TableCell align="left">
                    <Typography component="h2" style={{ marginLeft: '15px' }}>
                      عنوان:
                    </Typography>
                  </TableCell>
                  <TableCell> {service.quota?.displayName} </TableCell>
                </TableRow>
                <TableRow key={3} className="hover">
                  <TableCell align="left">
                    <Typography component="h2" style={{ marginLeft: '15px' }}>
                      توضیحات:
                    </Typography>
                  </TableCell>
                  <TableCell> {service.quota?.description} </TableCell>
                </TableRow>
                <TableRow key={4} className="hover">
                  <TableCell align="left">
                    <Typography component="h2" style={{ marginLeft: '15px' }}>
                      حداکثر پردازنده:
                    </Typography>
                  </TableCell>
                  <TableCell> {service.quota?.maxCpu} </TableCell>
                </TableRow>
                <TableRow key={5} className="hover">
                  <TableCell align="left">
                    <Typography component="h2" style={{ marginLeft: '15px' }}>
                      حداکثر حافظه:
                    </Typography>
                  </TableCell>
                  <TableCell> {service.quota?.maxMemory} </TableCell>
                </TableRow>
                <TableRow key={6} className="hover">
                  <TableCell align="left">
                    <Typography component="h2" style={{ marginLeft: '15px' }}>
                      حداکثر دیسک:
                    </Typography>
                  </TableCell>
                  <TableCell> {service.quota?.maxDisk} </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose}>
            بستن
          </Button>
        </Box>
        {isEditing ? (
          <Box minWidth="100px">
            <Button fullWidth variant="contained" color="primary" onClick={() => editQuota()} disabled={editServiceQuotaHook.isLoading}>
              ثبت تغییرات
            </Button>
          </Box>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default ServiceQuota;
