import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { IRestaurant } from '../../../Interfaces/Restaurant.interface';
import useDeleteRestaurant from '../../../Hooks/Restaurants/useDeleteRestaurant';

interface IProps {
  handleClose: () => void;
  restaurant: IRestaurant;
}

const DeleteRestaurant = (props: IProps) => {
  const { handleClose, restaurant } = props;
  const deleteRestaurantHook = useDeleteRestaurant();

  const deleteRestaurant = () => {
    deleteRestaurantHook.mutate({ restaurantId: restaurant.id, callBack: handleClose });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>حدف رستوران</DialogTitle>
      <DialogContent>
        <Typography component="p">
          آیا از حذف رستوران ( <b> {restaurant.name} </b> ) اطمینان دارید؟
        </Typography>
      </DialogContent>
      <DialogActions>
        {deleteRestaurantHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={deleteRestaurantHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={deleteRestaurant} disabled={deleteRestaurantHook .isLoading}>
            حذف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteRestaurant;
