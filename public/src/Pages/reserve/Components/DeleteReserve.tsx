import React, { useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import useReserve from '../../../Hooks/Meals/useReserve';
import { IDate } from '../../../Interfaces/Date.interface';
import { IMealReserve } from '../../../Interfaces/MealReserve.interface';

interface IProps {
  handleClose: () => void;
  date: IDate;
}

export interface IDateId {
  dateId: number;
  restaurantId: null;
  locationId: null;
  beverageReserves: [];
  foodReserves: [];
}

const DeleteReserve = (props: IProps) => {
  const { handleClose, date } = props;
  const reserveHook = useReserve();
  const classes = useStyles();

  const deleteReserve = () => {
    let reservesObjs: IDateId[] = [];
    reservesObjs.push({
      dateId: (date.id as unknown) as number,
      restaurantId: null,
      locationId: null,
      beverageReserves: [],
      foodReserves: [],
    });
    let reserves = reservesObjs;
    reserveHook.mutate({
      //  @ts-ignore
      reserves,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حذف وعده غذایی ({date.date})</DialogTitle>
      <DialogContent>
        <Typography component="label">آیا از حذف وعده غذایی مطمئن هستید ؟</Typography>
      </DialogContent>
      <DialogActions>
        {reserveHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={reserveHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => deleteReserve()} disabled={reserveHook.isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteReserve;
