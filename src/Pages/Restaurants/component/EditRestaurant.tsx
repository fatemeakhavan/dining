import React, { useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../style';
import { IRestaurant } from '../../../Interfaces/Restaurant.interface';
import useEditRestaurant from '../../../Hooks/Restaurants/useEditRestaurant';

interface IProps {
  handleClose: () => void;
  restaurant: IRestaurant;
}

const EditRestaurant = (props: IProps) => {
  const { handleClose, restaurant } = props;
  const editRestaurantHook = useEditRestaurant();
  const classes = useStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const restaurantId = restaurant.id;
  const editRestaurant = () => {
    const name = nameRef.current?.value;
    const logo = logoRef.current?.value;
    const address = addressRef.current?.value;

    if (!name || name.trim() === '') {
      return;
    }

    if (!logo || logo.trim() === '') {
      return;
    }

    if (!address || address.trim() === '') {
      return;
    }

    editRestaurantHook.mutate({
      name,
      restaurantId,
      logo,
      address,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>ویرایش رستوران ({restaurant.name})</DialogTitle>
      <DialogContent>
        <Typography component="label">نام رستوران</Typography>
        <TextField variant="outlined" placeholder="" defaultValue={restaurant.name} fullWidth inputRef={nameRef} />
        <Typography component="label">آدرس تصویر</Typography>
        <TextField variant="outlined" placeholder="" defaultValue={restaurant.logo} fullWidth inputRef={logoRef} />
        <Typography component="label">آدرس رستوران</Typography>
        <TextField variant="outlined" placeholder="" defaultValue={restaurant.address} fullWidth inputRef={addressRef} />
      </DialogContent>
      <DialogActions>
        {editRestaurantHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={editRestaurantHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => editRestaurant()} disabled={editRestaurantHook.isLoading}>
            ثبت
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditRestaurant;
