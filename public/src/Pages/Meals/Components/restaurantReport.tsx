import React, { useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { IDate } from '../../../Interfaces/Date.interface';
import useGetRestaurantReservesReport from '../../../Hooks/Meals/useGetRestaurantReservesReport';
import FileDownload from 'js-file-download';

interface IProps {
  handleClose: () => void;
  date: IDate;
  currentWeek: number;
  mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';
}

const RestaurantReport = (props: IProps) => {
  const { handleClose, date, currentWeek, mealType } = props;
  let restaurantDateReportHook = useGetRestaurantReservesReport(currentWeek, mealType);

  const handleRestaurantDownloadReport = () => {
    FileDownload((restaurantDateReportHook.data as unknown) as Blob, 'restaurant.csv');
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>دانلود گزارش رستوران</DialogTitle>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={() => handleRestaurantDownloadReport()} style={{ marginRight: '8px' }}>
          دانلود فایل
        </Button>
        <Button variant="outlined" color="primary" onClick={handleClose} style={{ marginRight: '8px' }}>
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestaurantReport;
