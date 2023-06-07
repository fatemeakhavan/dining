import React, { useEffect, useRef, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Button, IconButton, makeStyles, TableFooter } from '@material-ui/core';
import { toPersinaDigit } from '../../../Helpers/Utils';
import { IDate } from '../../../Interfaces/Date.interface';
import useGetDates from '../../../Hooks/Meals/useGetDates';
import AddMeal from './addMeal';
import { CourseIcon, LeftArrowIcon, NewsIcon, PenIcon } from '../../../Assets/Svg';
import ReportTable from './reportTable';
import RestaurantReport from './restaurantReport';
import WeekReport from './weekReport';
import WeekReportCount from './weekReportCount';
import FoodComments from './FoodComments';
import RequestTable from './RequestTable';

interface IProps {
  rows: IDate[];
  currentWeekCount: number;
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  holiday: {
    background: '#aa2e25',
  },
}));
let timeout: ReturnType<typeof setTimeout>;
const DatesTable: React.FunctionComponent<IProps> = (props) => {
  const classes = useStyles();
  const { rows, currentWeekCount } = props;
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(8);
  const [addMeal, setAddMeal] = useState<IDate | null>(null);
  const [reportTable, setReportTable] = useState<IDate | null>(null);
  const [requestTable, setRequestTable] = useState<IDate | null>(null);
  const [weekReportTable, setWeekReportTable] = useState<IDate | null>(null);
  const [restaurantReport, setRestaurantReport] = useState<IDate | null>(null);
  const [foodComments, setFoodComments] = useState<IDate | null>(null);
  const [mealType, setMealType] = useState<'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER'>('LUNCH');
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  let datesListHook = useGetDates(0, mealType);
  let currentDatesListHook = useGetDates(currentWeekCount, mealType);
  let nextDatesListHook = useGetDates(currentWeekCount !== 0 ? currentWeekCount + 1 : 0, mealType);
  let prevDatesListHook = useGetDates(currentWeekCount !== 0 ? currentWeekCount - 1 : 0, mealType);

  const changeMealType = (event: { target: { value: any } }) => {
    const selectedMealType = event?.target.value;
    setMealType(selectedMealType);
    timeout = setTimeout(() => {
      currentDatesListHook.refetch();
    }, 100);
  };

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

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/*<Typography component="label" style={{ display: 'flex' }}>*/}
      {/*  نوع وعده*/}
      {/*</Typography>*/}
      {/*<Select onChange={changeMealType} defaultValue="LUNCH" style={{ width: '30%', marginBottom: '15px' }}>*/}
      {/*  <MenuItem key="0" value="LUNCH">*/}
      {/*    ناهار*/}
      {/*  </MenuItem>*/}
      {/*  <MenuItem key="1" value="DINNER">*/}
      {/*    شام*/}
      {/*  </MenuItem>*/}
      {/*  <MenuItem key="2" value="SNACK">*/}
      {/*    میان وعده*/}
      {/*  </MenuItem>*/}
      {/*</Select>*/}
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="left">تاریخ</TableCell>
              <TableCell align="left">روز</TableCell>
              <TableCell align="left">ماه</TableCell>
              <TableCell align="left">غذا</TableCell>
              <TableCell align="left">نوشیدنی</TableCell>
              <TableCell align="left">محل حضور</TableCell>
              <TableCell align="left">تعداد رزرو</TableCell>
              <TableCell align="left">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
              <TableRow
                key={index}
                className={row.holiday || row.dayName === 'جمعه' || row.dayName === 'پنج شنبه' ? classes.holiday : 'unknown'}
              >
                <TableCell align="left" style={{ width: 50 }}>
                  {toPersinaDigit(index + 1 + page * rowsPerPage)}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.date}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.dayName}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.monthName}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.meal?.foods?.map((food, index) => (
                      <Box display="flex" alignItems="center">
                        {food.name}
                        {index + 1 !== row.meal?.foods?.length ? '،  ' : ''}
                      </Box>
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.meal?.beverages?.map((bev) => (
                      <Box display="flex" alignItems="center">
                        {bev.name}
                      </Box>
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.meal?.locations?.map((loc) => (
                      <Box display="flex" alignItems="center">
                        {loc.name}
                      </Box>
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <WeekReportCount date={row} mealType={mealType} />
                </TableCell>
                <TableCell align="left">
                  <IconButton size="small" style={{ marginRight: 5 }} title={'افزودن وعده'} onClick={() => setAddMeal(row)}>
                    <LeftArrowIcon />
                  </IconButton>
                  <IconButton size="small" style={{ marginRight: 5 }} title={'گزارش روز'} onClick={() => setReportTable(row)}>
                    <CourseIcon viewBox="0 0 350 350" />
                  </IconButton>
                  <IconButton size="small" style={{ marginRight: 5 }} title={'گزارش درخواست ها'} onClick={() => setRequestTable(row)}>
                    <PenIcon viewBox="0 0 81.471 77.829" />
                  </IconButton>
                  <IconButton size="small" style={{ marginRight: 5 }} title={'گزارش نظرات'} onClick={() => setFoodComments(row)}>
                    <NewsIcon viewBox="0 0 350 350" />
                  </IconButton>
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
                <Button variant="outlined" color="primary" onClick={() => setWeekReportTable(rows[0])} style={{ marginRight: '8px' }}>
                  گزارش هفته
                </Button>
                <Button variant="outlined" color="primary" onClick={() => setRestaurantReport(rows[0])} style={{ marginRight: '8px' }}>
                  گزارش رستوران
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {addMeal ? <AddMeal date={addMeal} dates={rows} handleClose={() => setAddMeal(null)} /> : null}
      {reportTable ? <ReportTable date={reportTable} mealType={mealType} handleClose={() => setReportTable(null)} /> : null}
      {requestTable ? <RequestTable date={requestTable} handleClose={() => setRequestTable(null)} /> : null}
      {restaurantReport ? (
        <RestaurantReport
          date={restaurantReport}
          mealType={mealType}
          currentWeek={currentWeekCount}
          handleClose={() => setRestaurantReport(null)}
        />
      ) : null}
      {weekReportTable ? (
        <WeekReport
          date={weekReportTable}
          mealType={mealType}
          currentWeek={currentWeekCount}
          handleClose={() => setWeekReportTable(null)}
        />
      ) : null}
      {foodComments ? <FoodComments date={foodComments} handleClose={() => setFoodComments(null)} /> : null}
    </>
  );
};

export default DatesTable;
