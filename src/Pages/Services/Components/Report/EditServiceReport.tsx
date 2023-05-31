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
import { useStyles } from '../../Styles';
import { IServiceReport } from '../../../../Interfaces/ServiceReport.interface';
import useEditServiceReport from '../../../../Hooks/ServiceReports/useEditServiceReport';

interface IProps {
  handleClose: () => void;
  serviceId: number;
  report: IServiceReport;
}

enum EError {
  TITLE = 'TITLE',
}
const EditServiceReport = (props: IProps) => {
  const { handleClose, serviceId, report } = props;
  const editServiceReportHook = useEditServiceReport();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const editReport = () => {
    const reportId = report.id;
    const name = nameRef.current?.value;
    const faDisplayName = titleRef.current?.value;
    const type = typeRef.current?.value as 'LIST' | 'RESOURCE_USAGE' | 'ACTIVITY';
    const faDescription = descriptionRef.current?.value;

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
    editServiceReportHook.mutate({
      serviceId,
      reportId,
      name,
      faDisplayName,
      faDescription,
      type,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>ویرایش گزارش</DialogTitle>
      <DialogContent>
        <Typography component="label">نام گزارش*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'نام گزارش را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          defaultValue={report.name}
          inputRef={nameRef}
        />
        <Typography component="label">عنوان گزارش*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'عنوان گزارش را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          defaultValue={report.faDisplayName}
          inputRef={titleRef}
        />
        <Typography component="label">توضیحات</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          defaultValue={report.faDescription}
          inputRef={descriptionRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>نوع گزارش*</Typography>
        <Select inputRef={typeRef} defaultValue={report.type} style={{ width: '100%', marginBottom: '15px' }}>
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
        {editServiceReportHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={editServiceReportHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => editReport()} disabled={editServiceReportHook.isLoading}>
            ثبت تغییرات
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditServiceReport;
