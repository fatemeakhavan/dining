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
import TableContainer from '@material-ui/core/TableContainer';
import Spinner from 'Spinner';
import { useStyles } from '../../Styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { TrashIcon } from '../../../../Assets/Svg';
import { IServiceResourcePlan } from '../../../../Interfaces/ServiceResourcePlan.interface';
import useEditServiceResourcePlan from '../../../../Hooks/ServiceResourcePlans/useEditServiceResourcePlan';
import { IExtraDisk } from '../../../../Interfaces/ExtraDisk.interface';

interface IProps {
  handleClose: () => void;
  serviceId: number;
  plan: IServiceResourcePlan;
}

enum EError {
  TITLE = 'TITLE',
}
const EditServiceResourcePlan = (props: IProps) => {
  const { handleClose, serviceId, plan } = props;
  const editServiceResourcePlanHook = useEditServiceResourcePlan();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();
  const [extraDisk, setExtraDisk] = React.useState<IExtraDisk[]>(plan.extraDisks);

  const nameRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const cpuRef = useRef<HTMLInputElement>(null);
  const memoryRef = useRef<HTMLInputElement>(null);
  const templateNameRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const capacityRef = useRef<HTMLInputElement>(null);
  const iopsRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const exCapacityRef = useRef<HTMLInputElement>(null);
  const exIopsRef = useRef<HTMLSelectElement>(null);
  const exMountPathRef = useRef<HTMLInputElement>(null);

  const addExtraDisk = () => {
    const exCapacity = (exCapacityRef.current?.value as unknown) as number;
    const exIops = (exIopsRef.current?.value as unknown) as number;
    const exMountPath = exMountPathRef.current?.value;
    const extraDiskObj = {
      capacity: exCapacity as number,
      iops: exIops as 100 | 500,
      mountPath: exMountPath as string,
    };
    setExtraDisk((state) => {
      return state.concat(extraDiskObj);
    });
    if (exCapacityRef.current?.value && exIopsRef.current?.value && exMountPathRef.current?.value) {
      exCapacityRef.current.value = '';
      exIopsRef.current.value = '';
      exMountPathRef.current.value = '';
    }
  };
  const deleteExtraDisk = (i: number) => {
    setExtraDisk((state) => {
      return state.filter((item, j) => i !== j);
    });
  };

  const editResource = () => {
    const planId = plan.id;
    const name = nameRef.current?.value;
    const faDisplayName = displayNameRef.current?.value;
    const cpu = (cpuRef.current?.value as unknown) as number;
    const memory = (memoryRef.current?.value as unknown) as number;
    const templateName = templateNameRef.current?.value as 'WIN2016' | 'WIN2019' | 'CENTOS7' | 'UBUNTU1804' | 'ORACLE';
    const capacity = (capacityRef.current?.value as unknown) as number;
    const iops = (iopsRef.current?.value as unknown) as 100 | 500;
    const type = typeRef.current?.value as 'GP' | 'SP';
    const faDescription = descriptionRef.current?.value;
    const mainDisk = {
      capacity: capacity,
      iops: iops,
      type: type,
    };
    const extraDisks = extraDisk;
    if (
      !name ||
      name.trim() === '' ||
      name.length < 2 ||
      !faDisplayName ||
      faDisplayName.trim() === '' ||
      !cpu ||
      !memory ||
      !templateName
    ) {
      setError(EError.TITLE);
      return;
    }
    setError(null);
    editServiceResourcePlanHook.mutate({
      serviceId,
      planId,
      name,
      faDisplayName,
      faDescription,
      cpu,
      memory,
      templateName,
      mainDisk,
      extraDisks,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>ویرایش پلن منابع</DialogTitle>
      <DialogContent>
        <Typography component="label">نام پلن* (می تواند ترکیبی از حروف لاتین و اعداد باشد)</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'نام پلن منابع را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          defaultValue={plan.name}
          inputRef={nameRef}
        />
        <Typography component="label">عنوان پلن*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'عنوان پلن منابع را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          defaultValue={plan.faDisplayName}
          inputRef={displayNameRef}
        />
        <Typography component="label">توضیحات</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          defaultValue={plan.faDescription}
          inputRef={descriptionRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>پردازنده*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'مقدار پردازنده را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          type={'number'}
          style={{ marginBottom: '15px' }}
          defaultValue={plan.cpu}
          inputRef={cpuRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>حافظه*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'مقدار حافظه را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          type={'number'}
          style={{ marginBottom: '15px' }}
          defaultValue={plan.memory}
          inputRef={memoryRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>ظرفیت دیسک اصلی*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'مقدار ظرفیت دیسک اصلی را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          type={'number'}
          style={{ marginBottom: '15px' }}
          defaultValue={plan.mainDisk.capacity}
          inputRef={capacityRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>iops دیسک اصلی*</Typography>
        <Select inputRef={iopsRef} defaultValue={100} style={{ width: '100%', marginBottom: '15px' }}>
          <MenuItem key={1} value={100}>
            100
          </MenuItem>
          <MenuItem key={2} value={500}>
            500
          </MenuItem>
        </Select>
        <Typography component="label" style={{ display: 'flex' }}>نوع دیسک اصلی*</Typography>
        <Select inputRef={typeRef} defaultValue={plan.mainDisk.type} style={{ width: '100%', marginBottom: '15px' }}>
          <MenuItem key={1} value={'GP'}>
            GP
          </MenuItem>
        </Select>
        <Typography component="label">دیسک های ثانویه</Typography>
        <TableContainer>
          <Typography component="label">ظرفیت دیسک ثانویه</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'مقدار ظرفیت دیسک ثانویه را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            type={'number'}
            style={{ marginBottom: '15px' }}
            inputRef={exCapacityRef}
          />
          <Typography component="label">iops دیسک ثانویه</Typography>
          <Select inputRef={exIopsRef} defaultValue={100} style={{ width: '100%', marginBottom: '15px' }}>
            <MenuItem key={1} value={100}>
              100
            </MenuItem>
            <MenuItem key={2} value={500}>
              500
            </MenuItem>
          </Select>
          <Typography component="label">مسیر </Typography>
          <TextField
            helperText={error === EError.TITLE ? 'مسیر دیسک ثانویه را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={exMountPathRef}
          />
          <Box minWidth="100px">
            <Button variant="outlined" color="primary" onClick={() => addExtraDisk()}>
              افزودن دیسک ثانویه
            </Button>
          </Box>
          <Box className={classes.inputCards}>
            {extraDisk.map((exDisk, index) => {
              return (
                <Card style={{ maxWidth: 345 }} key={index}>
                  <CardHeader title={`extraDisk#${index + 1}`} />
                  <CardContent style={{ direction: 'rtl' }}>
                    <Typography variant="body2">ظرفیت: {exDisk.capacity}</Typography>
                    <Typography variant="body2">iops: {exDisk.iops}</Typography>
                    <Typography variant="body2">مسیر: {exDisk.mountPath}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="delete" onClick={() => deleteExtraDisk(index)}>
                      <TrashIcon style={{ fontSize: '17px' }} />
                    </IconButton>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        </TableContainer>
        <Typography component="label" style={{ display: 'flex' }}>سیستم عامل*</Typography>
        <Select inputRef={templateNameRef} defaultValue={plan.templateName} style={{ width: '100%', marginBottom: '15px' }}>
          <MenuItem key={1} value={'WIN2016'}>
            Windows 2016
          </MenuItem>
          <MenuItem key={2} value={'WIN2019'}>
            Windows 2019
          </MenuItem>
          <MenuItem key={3} value={'CENTOS7'}>
            CENTOS 7
          </MenuItem>
          <MenuItem key={4} value={'UBUNTU1804'}>
            UBUNTU 18.04
          </MenuItem>
          <MenuItem key={5} value={'ORACLE'}>
            ORACLE
          </MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        {editServiceResourcePlanHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={editServiceResourcePlanHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => editResource()} disabled={editServiceResourcePlanHook.isLoading}>
            ثبت تغییرات
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditServiceResourcePlan;
