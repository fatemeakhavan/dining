import React, { useRef } from 'react';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import useAddComment from '../../../Hooks/Meals/useAddComment';
import { IReserveComment } from '../../../Interfaces/IReserveComment';
import { IDate } from '../../../Interfaces/Date.interface';
import useGetComment from '../../../Hooks/Meals/useGetComment';
import { Rating } from '@material-ui/lab';

interface IProps {
  handleClose: () => void;
  date: IDate;
  comment?: string;
}

const AddFoodComment = (props: IProps) => {
  const { handleClose, date, comment } = props;
  const [value, setValue] = React.useState<number | null>(1);
  const addFoodCommentHook = useAddComment(date.id);
  const classes = useStyles();
  const foodCommentHook = useGetComment(date.id);
  const commentRef = useRef<HTMLInputElement>(null);
  // const scoreRef = useRef<HTMLInputElement>(null);

  const addComment = () => {
    let commentObj: IReserveComment = {
      comment: '',
      score: 1,
    };

    if (commentRef.current?.value && value) {
      commentObj = {
        comment: (commentRef.current?.value as unknown) as string,
        score: value,
      };
    } else if (value) {
      commentObj = {
        comment: '',
        score: value,
      };
    }

    let comment = commentObj;
    const dateId = date.id;
    addFoodCommentHook.mutate({
      dateId,
      comment,
      callBack: handleClose,
    });
  };

  let foodComment = {
    comment: '',
    score: 1,
  };
  if (foodCommentHook?.data) {
    foodComment = foodCommentHook?.data.result;
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>ثبت نظر برای غذای ({date?.reserve?.food?.name})</DialogTitle>
      <DialogContent>
        <Box display="flex" style={{ direction: 'rtl' }}>
          <Typography component="label" style={{ marginLeft: '16px', marginBottom: '8px' }}>
            امتیاز
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <Typography component="label">نظر</Typography>
        <TextField variant="outlined" placeholder="" fullWidth inputRef={commentRef} />
        {foodCommentHook?.data && (
          <Container>
            <Typography component="label" style={{ display: 'flex', marginTop: '8px' }}>
              نظر ثبت شده: {foodComment.comment}
            </Typography>
            <Typography component="label" style={{ display: 'flex', marginTop: '8px' }}>
              امتیاز ثبت شده: {foodComment.score}
            </Typography>
          </Container>
        )}
      </DialogContent>
      <DialogActions>
        {addFoodCommentHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={addFoodCommentHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => addComment()} disabled={addFoodCommentHook.isLoading}>
            ثبت نظر
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddFoodComment;
