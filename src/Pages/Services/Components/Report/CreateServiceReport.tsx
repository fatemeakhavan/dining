import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
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
import useCreateServiceReport from '../../../../Hooks/ServiceReports/useCreateServiceResourcePlan';
interface IProps {
  handleClose: () => void;
  serviceId: number;
}

enum EError {
  TITLE = 'TITLE',
}
const CreateServiceReport = (props: IProps) => {
  const { handleClose, serviceId } = props;
  const createServiceReportHook = useCreateServiceReport();
  const [error, setError] = useState<EError | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const addReport = () => {
    const name = nameRef.current?.value;
    const faDisplayName = titleRef.current?.value;
    const faDescription = descriptionRef.current?.value;
    const type = (typeRef.current?.value as unknown) as 'LIST' | 'RESOURCE_USAGE' | 'ACTIVITY';
    if (
      !name ||
      name.trim() === '' ||
      name.length < 2 ||
      !faDisplayName ||
      faDisplayName.trim() === '' ||
      !type
    ) {
      setError(EError.TITLE);
      return;
    }
    setError(null);
    createServiceReportHook.mutate({
      serviceId,
      name,
      faDisplayName,
      faDescription,
      type,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>گزارش جدید</DialogTitle>
      <DialogContent>
        <Typography component="label">(می تواند ترکیبی از حروف لاتین و اعداد باشد)نام گزارش*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'نام گزارش را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          inputRef={nameRef}
        />
        <Typography component="label">عنوان گزارش*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'عنوان گزارش را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={titleRef}
        />
        <Typography component="label">توضیحات</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={descriptionRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>نوع گزارش*</Typography>
        <Select inputRef={typeRef} defaultValue={'LIST'} style={{ width: '100%', marginBottom: '15px' }}>
          <MenuItem key={1} value={'LIST'}>
            لیست سرویس های ساخته شده
          </MenuItem>
          <MenuItem key={2} value={'RESOURCE_USAGE'}>
            گزارش منابع مصرفی سرویس
          </MenuItem>
          <MenuItem key={2} value={'ACTIVITY'}>
            تاریخچه اکشن های سرویس
          </MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        {createServiceReportHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={createServiceReportHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => addReport()} disabled={createServiceReportHook.isLoading}>
            ایجاد
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateServiceReport;
