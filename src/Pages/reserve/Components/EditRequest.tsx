import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import useReserve from '../../../Hooks/Meals/useReserve';
import { IDate } from '../../../Interfaces/Date.interface';
import { IMealReserve } from '../../../Interfaces/MealReserve.interface';
import useDeleteRequest from '../../../Hooks/Meals/useDeleteRequest';

interface IProps {
  handleClose: () => void;
  date: IDate;
}

const EditRequest = (props: IProps) => {
  const { handleClose, date } = props;
  const reserveHook = useReserve();
  const deleteRequestHook = useDeleteRequest();
  const classes = useStyles();

  const foodRef = useRef<HTMLSelectElement>(null);
  const beverageRef = useRef<HTMLSelectElement>(null);
  const locationRef = useRef<HTMLSelectElement>(null);
  const [deleteChecked, setDeleteChecked] = useState(false);

  const handleDeleteChange = (event: { target: { checked: React.SetStateAction<boolean> } }) => {
    setDeleteChecked(event.target.checked);
  };

  const editRequest = () => {
    let reservesObjs: IMealReserve[] = [];
    if (foodRef.current?.value && !deleteChecked) {
      reservesObjs.push({
        dateId: (date.id as unknown) as number,
        foodId: +foodRef.current?.value!,
        beverageId: +beverageRef.current?.value!,
        locationId: +locationRef.current?.value!,
        restaurantId: 1,
      });
    } else if (locationRef.current?.value && !deleteChecked) {
      reservesObjs.push({
        dateId: (date.id as unknown) as number,
        locationId: +locationRef.current?.value!,
        foodId: date.reserve?.food.id,
        beverageId: date.reserve?.beverage.id,
        restaurantId: 1,
      });
    } else if (deleteChecked) {
      reservesObjs.push({
        dateId: (date.id as unknown) as number,
        // @ts-ignore
        restaurantId: null,
        locationId: null,
        foodId: null,
        beverageId: null,
      });
    }
    let reserves = reservesObjs;
    reserveHook.mutate({
      reserves,
      callBack: handleClose,
    });
  };

  const deleteRequest = () => {
    deleteRequestHook.mutate({
      dateId: date.id,
      callBack: deleteReqCallBack,
    });
  };

  const deleteReqCallBack = () => {
    handleClose();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>درخواست ویرایش وعده غذایی ({date.date})</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          {date?.request !== null ? (
            <>
              <Typography component="label">درخواست ثبت شده: </Typography>
              <Typography component="label">
                {date?.request?.requestType === 'ADD'
                  ? 'درخواست رزرو'
                  : date?.request?.requestType === 'EDIT'
                  ? ' ویرایش'
                  : date?.request?.requestType === 'REMOVE'
                  ? ' حذف'
                  : date?.request?.requestType === 'UPDATE_LOCATION'
                  ? ' تغییر مکان '
                  : '-'}
              </Typography>
            </>
          ) : null}
          <FormControlLabel
            disabled={date.reserve === null}
            style={{ direction: 'rtl' }}
            control={<Checkbox onChange={handleDeleteChange} color={'secondary'} />}
            label="حذف وعده غذایی رزرو شده"
          />
        </Box>

        <br />
        <Typography component="label">غذا</Typography>
        <Select
          inputRef={foodRef}
          defaultValue={date.request?.food?.id}
          disabled={deleteChecked || date.reserve !== null}
          style={{ width: '100%', marginBottom: '15px' }}
        >
          {date.meal?.foods?.map((food) => {
            return (
              <MenuItem key={food.id} value={food.id}>
                {food.name}
              </MenuItem>
            );
          })}
        </Select>
        <Typography component="label">نوشیدنی</Typography>
        <Select
          inputRef={beverageRef}
          defaultValue={date.request?.beverage?.id}
          disabled={deleteChecked || date.reserve !== null}
          style={{ width: '100%', marginBottom: '15px' }}
        >
          {date.meal?.beverages?.map((bev) => {
            return (
              <MenuItem key={bev.id} value={bev.id}>
                {bev.name}
              </MenuItem>
            );
          })}
        </Select>
        <Typography component="label">محل حضور</Typography>
        <Select
          inputRef={locationRef}
          defaultValue={date.request?.location?.id}
          disabled={deleteChecked}
          style={{ width: '100%', marginBottom: '15px' }}
        >
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
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={deleteRequest}
            disabled={reserveHook.isLoading || date?.request === null}
          >
            حذف درخواست
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={editRequest} disabled={reserveHook.isLoading}>
            ثبت تغییرات
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditRequest;
