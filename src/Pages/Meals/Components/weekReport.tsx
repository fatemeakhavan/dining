import React, { useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Typography } from '@material-ui/core';
import { IDate } from '../../../Interfaces/Date.interface';
import FileDownload from 'js-file-download';
import useGetReservesReport from '../../../Hooks/Meals/useGetReservesReport';

interface IProps {
  handleClose: () => void;
  date: IDate;
  currentWeek: number;
  mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';
}

const WeekReport = (props: IProps) => {
  const { handleClose, date, currentWeek, mealType } = props;
  let dateReportHook = useGetReservesReport(currentWeek, mealType!);

  const handleDownloadReport = () => {
    dateReportHook.refetch();
    FileDownload((dateReportHook.data as unknown) as Blob, 'test.csv');
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>دانلود گزارش هفتگی</DialogTitle>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={() => handleDownloadReport()} style={{ marginRight: '8px' }}>
          دانلود فایل
        </Button>
        <Button variant="outlined" color="primary" onClick={handleClose} style={{ marginRight: '8px' }}>
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WeekReport;
