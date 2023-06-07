import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from "@material-ui/core";
import { IDate } from '../../../Interfaces/Date.interface';
import useGetFoodComments from '../../../Hooks/Meals/useGetFoodComments';
import { IReserveComment } from '../../../Interfaces/IReserveComment';
import Select from '@material-ui/core/Select';

interface IProps {
  handleClose: () => void;
  date: IDate;
}

let timeout: ReturnType<typeof setTimeout>;
const FoodComments = (props: IProps) => {
  const { handleClose, date } = props;
  const [foodId, setFoodId] = useState<number | null>(null);
  let foodRef = useRef<HTMLSelectElement>(null);
  let foodCommentsHook = useGetFoodComments(date.id, (foodId as unknown) as number);
  const handleGetComments = () => {
    if (foodRef?.current?.value) {
      setFoodId((foodRef?.current?.value as unknown) as number);
      timeout = setTimeout(() => {
        foodCommentsHook.refetch();
      }, 500);
    }
  };
  let foodComments: IReserveComment[] = [];
  if (foodCommentsHook?.data) {
    foodComments = foodCommentsHook.data.result.comments;
  }
  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>نظرات ثبت شده</DialogTitle>
      <DialogContent>
        <Select inputRef={foodRef} style={{ width: '100%', marginBottom: '15px' }}>
          {date.meal?.foods?.map((food) => {
            return (
              <MenuItem key={food?.id} value={food?.id}>
                {food?.name}
              </MenuItem>
            );
          })}
        </Select>
        <Box>
          امتیاز کلی :
          {foodCommentsHook?.data?.result.score}
        </Box>
        {foodComments.map((comment) => {
          return (
            <Container>
              <Box style={{ display: 'flex', direction: 'rtl' }}>{comment.comment} --
              {comment.score}</Box>
            </Container>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleGetComments} style={{ marginRight: '8px' }}>
          دریافت نظرات
        </Button>
        <Button variant="outlined" color="primary" onClick={handleClose} style={{ marginRight: '8px' }}>
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FoodComments;
