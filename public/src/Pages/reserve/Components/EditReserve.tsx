import React, { useRef } from 'react';
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

const EditReserve = (props: IProps) => {
  const { handleClose, date } = props;
  const reserveHook = useReserve();
  const classes = useStyles();

  const foodRef = useRef<HTMLSelectElement>(null);
  const beverageRef = useRef<HTMLSelectElement>(null);
  const locationRef = useRef<HTMLSelectElement>(null);

  const editReserve = () => {
    let reservesObjs: IMealReserve[] = [];
    if (foodRef.current?.value) {
      reservesObjs.push({
        dateId: (date.id as unknown) as number,
        foodId: +foodRef.current?.value!,
        beverageId: +beverageRef.current?.value!,
        locationId: +locationRef.current?.value!,
        restaurantId: 1,
      });
    }
    let reserves = reservesObjs;
    reserveHook.mutate({
      reserves,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>ویرایش وعده غذایی ({date.date})</DialogTitle>
      <DialogContent>
        <Typography component="label">غذا</Typography>
        <Select inputRef={foodRef} defaultValue={date.reserve?.food?.id} style={{ width: '100%', marginBottom: '15px' }}>
          {date.meal?.foods?.map((food) => {
            return (
              <MenuItem key={food.id} value={food.id}>
                {food.name}
              </MenuItem>
            );
          })}
        </Select>
        <Typography component="label">نوشیدنی</Typography>
        <Select inputRef={beverageRef} defaultValue={date.reserve?.beverage?.id} style={{ width: '100%', marginBottom: '15px' }}>
          {date.meal?.beverages?.map((bev) => {
            return (
              <MenuItem key={bev.id} value={bev.id}>
                {bev.name}
              </MenuItem>
            );
          })}
        </Select>
        <Typography component="label">محل حضور</Typography>
        <Select inputRef={locationRef} defaultValue={date.reserve?.location?.id} style={{ width: '100%', marginBottom: '15px' }}>
          {date.meal?.locations?.map((loc) => {
            return (
              <MenuItem key={loc.id} value={loc.id}>
                {loc.name}
              </MenuItem>
            );
          })}
        </Select>
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
          <Button fullWidth variant="contained" color="primary" onClick={() => editReserve()} disabled={reserveHook.isLoading}>
            ثبت تغییرات
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditReserve;
