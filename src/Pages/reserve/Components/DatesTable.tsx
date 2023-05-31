import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Button, IconButton, makeStyles, MenuItem, TableFooter } from '@material-ui/core';
import { toPersinaDigit } from '../../../Helpers/Utils';
import { IDate } from '../../../Interfaces/Date.interface';
import { EditIcon, PenIcon, TrashIcon } from '../../../Assets/Svg';
import useReserve from '../../../Hooks/Meals/useReserve';
import { IMealReserve } from '../../../Interfaces/MealReserve.interface';
import useGetReserves from '../../../Hooks/Meals/useGetReserves';
import EditReserve from './EditReserve';
import DeleteReserve from './DeleteReserve';
import Select from '@material-ui/core/Select';
import AddFoodComment from './AddFoodComment';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import noimage from 'Assets/img/noimage.png';
import { IFood } from '../../../Interfaces/Food';
import EditRequest from './EditRequest';

interface IProps {
  rows: IDate[];
  currentWeekCount: number;
  disabled: boolean;
  isReserveHookLoading: boolean;
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  holiday: {
    background: '#aa2e25',
  },
  selected: {
    '& .foodName': {
      top: 0,
      left: 0,
      fontSize: 20,
      width: '100%',
      height: '100%',
      fontWeight: 900,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex !important',
      backgroundColor: 'rgba(170, 46, 37, 0.95)',
    },
  },
  foodCard: {
    '&:hover .foodName': {
      top: 0,
      left: 0,
      fontSize: 20,
      width: '100%',
      height: '100%',
      fontWeight: 900,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex !important',
      backgroundColor: 'rgba(170, 46, 37, 0.95)',
    },
  },
}));
let timeout: ReturnType<typeof setTimeout>;
const DatesTable: React.FunctionComponent<IProps> = (props) => {
  const classes = useStyles();
  const reserveHook = useReserve();
  const { rows, currentWeekCount, disabled, isReserveHookLoading } = props;
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(8);
  const [editReserve, setEditReserve] = useState<IDate | null>(null);
  const [editRequest, setEditRequest] = useState<IDate | null>(null);
  const [addComment, setAddComment] = useState<IDate | null>(null);
  const [deleteReserve, setDeleteReserve] = useState<IDate | null>(null);
  const [reserveSelectedFoods, setReserveSelectedFoods] = useState<IFood[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<IFood[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [savedComment, setSavedComment] = useState<string | null>(null);
  const [dateId, setDateId] = useState<number | null>(null);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  let datesListHook = useGetReserves(0);
  let nextDatesListHook = useGetReserves(currentWeekCount !== 0 ? currentWeekCount + 1 : 0);
  let prevDatesListHook = useGetReserves(currentWeekCount !== 0 ? currentWeekCount - 1 : 0);

  let foodRefs = [
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
  ];
  let beverageRefs = [
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
  ];
  let locationRefs = [
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLSelectElement>(null),
  ];

  const handleNextWeek = () => {
    timeout = setTimeout(() => {
      if (currentWeekCount !== 0) {
        nextDatesListHook.refetch();
      }
    }, 100);
  };

  const handlePrevWeek = () => {
    timeout = setTimeout(() => {
      if (currentWeekCount !== 0) {
        prevDatesListHook.refetch();
      }
    }, 100);
  };

  const handleAddSelectedFood = (food: IFood, index: number) => {
    reserveSelectedFoods.forEach((fod) => {
      if (fod.rowId === index) handleDeleteSelectedFood(fod);
    });

    const SelectedFood = {
      ...food,
      rowId: index,
    };
    setSelectedFoods((state) => {
      return state.concat(food);
    });
    setReserveSelectedFoods((state) => {
      return state.concat(SelectedFood);
    });
  };

  const handleDeleteSelectedFood = (food: IFood) => {
    setSelectedFoods((state) => {
      return state.filter((item) => +item.id !== +food.id);
    });
    setReserveSelectedFoods((state) => {
      return state.filter((item) => +item.id !== +food.id);
    });
  };
  const handleReserve = () => {
    let reservesObjs: IMealReserve[] = [];
    rows.forEach((row, index) => {
      if (foodRefs[index].current?.value) {
        reservesObjs.push({
          dateId: (row.id as unknown) as number,
          foodId: (foodRefs[index].current?.value as unknown) as number,
          beverageId: (beverageRefs[index].current?.value as unknown) as number,
          locationId: (locationRefs[index].current?.value as unknown) as number,
          restaurantId: 1,
        });
      }
    });
    let reserves = reservesObjs;
    reserveHook.mutate({
      reserves,
    });
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="left">روز</TableCell>
              <TableCell align="left">تاریخ</TableCell>
              <TableCell align="left">غذا</TableCell>
              <TableCell align="left">نوشیدنی</TableCell>
              <TableCell align="left">محل حضور</TableCell>
              <TableCell align="left">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
              <TableRow
                key={index}
                className={row.holiday || row.dayName === 'جمعه' || row.dayName === 'پنج شنبه' ? classes.holiday : 'test'}
              >
                <TableCell align="left" style={{ width: 50 }}>
                  {toPersinaDigit(index + 1 + page * rowsPerPage)}
                </TableCell>
                <TableCell align="left" style={{ maxWidth: 150 }}>
                  <Box display="flex" alignItems="center">
                    {row.dayName}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.date}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box style={{ display: 'flex' }}>
                    {/*{row.meal?.foods?.map((food) => {*/}
                    {/*  return (*/}
                    {/*    <Card*/}
                    {/*      style={{ width: 135, marginLeft: 16 }}*/}
                    {/*      className={*/}
                    {/*        selectedFoods.includes(food) || (row.reserve?.foods && row.reserve?.foods[0]?.food.id === food.id)*/}
                    {/*          ? classes.selected*/}
                    {/*          : ''*/}
                    {/*      }*/}
                    {/*      onClick={*/}
                    {/*        selectedFoods.includes(food) ? () => handleDeleteSelectedFood(food) : () => handleAddSelectedFood(food, index)*/}
                    {/*      }*/}
                    {/*    >*/}
                    {/*      <CardActionArea className={classes.foodCard}>*/}
                    {/*        <CardMedia component="img" height="135" image={food.pictureUrl ?? noimage} alt={food.name} />*/}
                    {/*        <Typography gutterBottom variant="h6" component="div" className={'foodName'} style={{ display: 'none' }}>*/}
                    {/*          {food.name}*/}
                    {/*        </Typography>*/}
                    {/*      </CardActionArea>*/}
                    {/*    </Card>*/}
                    {/*  );*/}
                    {/*})}*/}
                    {row.reserve?.food ? (
                      <Box>{row.reserve?.food?.name}</Box>
                    ) : (
                      <Select
                        inputRef={foodRefs[index]}
                        style={{ width: '100%', marginBottom: '15px' }}
                        disabled={disabled || rows.findIndex((item) => item.reserve?.food) !== -1}
                      >
                        {row.meal?.foods?.map((food) => {
                          return (
                            <MenuItem key={food?.id} value={food?.id}>
                              {food?.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  {row.reserve?.beverage ? (
                    <Box>{row.reserve?.beverage?.name}</Box>
                  ) : (
                    <Select
                      inputRef={beverageRefs[index]}
                      style={{ width: '100%', marginBottom: '15px' }}
                      disabled={disabled || rows.findIndex((item) => item.reserve?.food) !== -1}
                    >
                      {row.meal?.beverages?.map((bev) => {
                        return (
                          <MenuItem key={bev?.id} value={bev?.id}>
                            {bev?.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                </TableCell>
                <TableCell align="left">
                  {row.reserve?.food && row.reserve?.location ? (
                    <Box>{row.reserve?.location.name}</Box>
                  ) : (
                    <Select
                      inputRef={locationRefs[index]}
                      style={{ width: '100%', marginBottom: '15px' }}
                      defaultValue={localStorage.getItem('ADMIN_PANEL:LOC')}
                      disabled={disabled || rows.findIndex((item) => item.reserve?.food) !== -1}
                    >
                      {row.meal?.locations?.map((loc) => {
                        return (
                          <MenuItem key={loc?.id} value={loc?.id}>
                            {loc?.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                </TableCell>
                <TableCell align="left">
                  {!row?.disabled ? (
                    <IconButton size="small" style={{ marginRight: 5 }} title={'ثبت درخواست'} onClick={() => setEditRequest(row)}>
                      <PenIcon viewBox="0 0 81.471 77.829" />
                    </IconButton>
                  ) : null}
                  <IconButton
                    size="small"
                    disabled={!row.reserve?.food}
                    style={{ marginRight: 5 }}
                    title={'ثبت نظر'}
                    onClick={() => setAddComment(row)}
                  >
                    <CommentOutlinedIcon color="primary" />
                  </IconButton>
                  {!disabled ? (
                    <>
                      <IconButton
                        size="small"
                        disabled={rows.findIndex((item) => item.reserve?.food) === -1}
                        style={{ marginRight: 5 }}
                        title={'ویرایش'}
                        onClick={() => setEditReserve(row)}
                      >
                        <EditIcon viewBox="0 0 1696.162 1696.143" />
                      </IconButton>
                      <IconButton
                        size="small"
                        // disabled={disabled || rows.findIndex((item) => item.reserve?.foods) === -1}
                        disabled={rows.findIndex((item) => item.reserve?.food) === -1}
                        style={{ marginRight: 5 }}
                        title={'حذف وعده'}
                        onClick={() => setDeleteReserve(row)}
                        // onClick={() => handleDeleteRow}
                      >
                        <TrashIcon />
                      </IconButton>
                    </>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 55 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left" colSpan={4}>
                <Button variant="outlined" color="primary" onClick={() => handleNextWeek()}>
                  هفته بعد
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handlePrevWeek()} style={{ marginRight: '8px' }}>
                  هفته قبل
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={
                    rows.findIndex((item) => item.reserve?.food) !== -1 ||
                    // || disabled
                    reserveHook.isLoading ||
                    prevDatesListHook.isLoading ||
                    nextDatesListHook.isLoading ||
                    isReserveHookLoading
                  }
                  onClick={() => handleReserve()}
                  style={{ marginRight: '8px' }}
                >
                  ثبت نهایی
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {editReserve ? <EditReserve date={editReserve} handleClose={() => setEditReserve(null)} /> : null}
      {editRequest ? <EditRequest date={editRequest} handleClose={() => setEditRequest(null)} /> : null}
      {deleteReserve ? <DeleteReserve date={deleteReserve} handleClose={() => setDeleteReserve(null)} /> : null}
      {addComment ? <AddFoodComment date={addComment} handleClose={() => setAddComment(null)} /> : null}
    </>
  );
};

export default DatesTable;
