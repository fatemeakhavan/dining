import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Link,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TableFooter,
  TablePagination,
  TextField, Typography,
} from '@material-ui/core';
import { Box } from '@material-ui/core';
import Empty from '../../../Extra/Empty';
import { SearchIcon, TrashIcon } from '../../../Assets/Svg';
import { AddCircleOutline } from '@material-ui/icons';
import useGetReservedReport from '../../../Hooks/ReservedReport/useGetReservedReport';
import { IDate } from '../../../Interfaces/Date.interface';
import { IReservedReport } from '../../../Interfaces/ReservedReport.interface';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { toPersinaDigit } from '../../../Helpers/Utils';
import IconButton from '@material-ui/core/IconButton';
import { TablePaginationActions } from '../../../Extra/TablePaginationActions';
import DeleteUser from '../../Users/Components/DeleteUser';
import useGetReserveRequests from '../../../Hooks/Meals/useGetReserveRequests';
import { IReserveRequest } from '../../../Interfaces/IReserveRequest';

interface IProps {
  handleClose: () => void;
  date: IDate;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

let timeout: ReturnType<typeof setTimeout>;
const RequestTable = (props: IProps) => {
  const { handleClose, date } = props;
  const classes = useStyles();
  const [reportSearch, setReportSearch] = useState<string | null>(null);
  const filterTypeRef = useRef<HTMLSelectElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const requestListHook = useGetReserveRequests(date?.id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setReportSearch(searchTerm);
    }, 1000);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  let rows: IReserveRequest[] = [];
  if (requestListHook?.data) {
    rows = requestListHook?.data.result;
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>لیست درخواست ها</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table" style={{ direction: 'rtl', minWidth: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell>ردیف</TableCell>
                <TableCell align="left">نام کاربر</TableCell>
                <TableCell align="left">غذا</TableCell>
                <TableCell align="left">نوشیدنی</TableCell>
                <TableCell align="left">شعبه</TableCell>
                <TableCell align="left">نوع درخواست</TableCell>
                <TableCell align="left">دریافت غذا</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
                <TableRow key={index} className="hover">
                  <TableCell align="left" style={{ width: 50 }}>
                    {toPersinaDigit(index + 1 + page * rowsPerPage)}
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      {row.user}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      {row.food}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      {row.beverage}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      {row.location}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      {row.type === 'ADD'
                        ? 'اضافه کردن'
                        : row.type === 'EDIT'
                        ? 'ویرایش'
                        : row.type === 'REMOVE'
                        ? 'حذف'
                        : row.type === 'UPDATE_LOCATION'
                        ? 'تغییر مکان'
                        : '-'}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      <Typography>{row.received ? 'بله' : 'خیر'}</Typography>
                    </Box>
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
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
              <TableRow>
                <Box display="flex" alignItems="center">
                  تعداد کل : {rows.length}
                </Box>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose}>
            بستن
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default RequestTable;
