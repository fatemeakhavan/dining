import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import { IUserGroup } from '../../../Interfaces/UserGroup.interface';
import useGetGroupUsers from '../../../Hooks/UserGroups/useGetGroupUsers';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { toPersinaDigit } from '../../../Helpers/Utils';
import IconButton from '@material-ui/core/IconButton';
import { TrashIcon } from '../../../Assets/Svg';
import { TablePaginationActions } from '../../../Extra/TablePaginationActions';
import TableContainer from '@material-ui/core/TableContainer';
import { IGroupUser } from '../../../Interfaces/Users.interface';
import DeleteUser from './DeleteUser';

interface IProps {
  handleClose: () => void;
  userGroup: IUserGroup;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const GroupUsers = (props: IProps) => {
  const { handleClose, userGroup } = props;
  const classes = useStyles();
  const loggedInUsername = localStorage.getItem('ADMIN_PANEL:USERNAME');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const groupUsersHook = useGetGroupUsers(userGroup.name);
  let rows: string | any[] = [];
  if (groupUsersHook?.data?.result) {
    rows = groupUsersHook?.data?.result;
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [deleteUser, setDeleteUser] = useState<IGroupUser | null>(null);
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>لیست کاربران گروه</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table" style={{ direction: 'rtl', minWidth: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell>ردیف</TableCell>
                <TableCell align="left">شناسه sso</TableCell>
                <TableCell align="left">نام</TableCell>
                <TableCell align="left">نام خانوادگی</TableCell>
                <TableCell align="left">نام کاربری</TableCell>
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
                      {row.ssoId}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      {row.firstName}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      {row.lastName}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      {row.username}
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      size="small"
                      title={'حذف'}
                      disabled={!userGroup.owner && row.username !== loggedInUsername}
                      onClick={() => setDeleteUser(row)}
                    >
                      <TrashIcon />
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
            </TableFooter>
          </Table>
        </TableContainer>
        {deleteUser ? <DeleteUser userGroup={userGroup} user={deleteUser} handleClose={() => setDeleteUser(null)} /> : null}
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

export default GroupUsers;
