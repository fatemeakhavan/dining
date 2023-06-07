import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Button, makeStyles, TableFooter, TablePagination } from '@material-ui/core';
import { TablePaginationActions } from 'Extra/TablePaginationActions';
import { toPersinaDigit } from '../../../Helpers/Utils';
import { IUser } from '../../../Interfaces/User.interface';
import { AddCircleOutline } from '@material-ui/icons';
import useActivateUser from '../../../Hooks/Users/useActivateUser';
import useSearchUser from '../../../Hooks/Users/useSearchUser';

interface IProps {
  users: IUser[];
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const UsersTable: React.FunctionComponent<IProps> = (props) => {
  const classes = useStyles();
  const { users } = props;
  const [ssoid, setSsoid] = useState<number>();
  const [username, setUsername] = useState<string>('');
  const searchUserHook = useSearchUser((username as unknown) as string);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const activateUserHook = useActivateUser();
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const activateUser = (ssoId: number) => {
    activateUserHook.mutate({ ssoId: ssoId });
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="left">نام کاربری</TableCell>
              <TableCell align="left">نام</TableCell>
              <TableCell align="left">نام خوانوادگی</TableCell>
              <TableCell align="left">ایمیل</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 && users ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : users).map((user, index) => (
              <TableRow key={index} className="hover">
                <TableCell align="left" style={{ width: 50 }}>
                  {toPersinaDigit(index + 1 + page * rowsPerPage)}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {user.username}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {user.firstName}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {user.lastName}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {user.email}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Button variant="outlined" color="primary" startIcon={<AddCircleOutline />} onClick={() => activateUser(user.ssoId)}>
                    فعالسازی
                  </Button>
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
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
