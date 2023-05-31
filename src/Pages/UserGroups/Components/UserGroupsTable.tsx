import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { toPersinaDigit } from 'Helpers/Utils';
import IconButton from '@material-ui/core/IconButton';
import { Box, makeStyles, TableFooter, TablePagination } from '@material-ui/core';
import { DotIcon, EditIcon, TrashIcon, UsersIcon } from 'Assets/Svg';
import { TablePaginationActions } from 'Extra/TablePaginationActions';
import { IUserGroup } from '../../../Interfaces/UserGroup.interface';
import DeleteUserGroup from './DeleteUserGroup';
import EditUserGroup from './EditUserGroup';
import AddUser from './AddUser';
import GroupUsers from './GroupUsers';

interface IProps {
  rows: IUserGroup[];
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserTable: React.FunctionComponent<IProps> = (props) => {
  const classes = useStyles();
  const { rows } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [deleteUserGroup, setDeleteUserGroup] = useState<IUserGroup | null>(null);
  const [editUserGroup, setEditUserGroup] = useState<IUserGroup | null>(null);
  const [addUser, setAddUser] = useState<IUserGroup | null>(null);
  const [groupUsers, setGroupUsers] = useState<IUserGroup | null>(null);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="left">نام</TableCell>
              <TableCell align="left">عنوان</TableCell>
              <TableCell align="left">توضیحات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
              <TableRow key={index} className="hover">
                <TableCell align="left" title={'مدیر'} style={{ width: 50 }} onClick={() => setGroupUsers(row)}>
                  <Box display="flex" alignItems="center">
                    {toPersinaDigit(index + 1 + page * rowsPerPage)}
                    {row.owner ? <DotIcon /> : null}
                  </Box>
                </TableCell>
                <TableCell align="left" onClick={() => setGroupUsers(row)}>
                  <Box display="flex" alignItems="center">
                    {row.name}
                  </Box>
                </TableCell>
                <TableCell align="left" onClick={() => setGroupUsers(row)}>
                  <Box display="flex" alignItems="center">
                    {row.title}
                  </Box>
                </TableCell>
                <TableCell align="left" onClick={() => setGroupUsers(row)}>
                  <Box display="flex" alignItems="center">
                    {row.description}
                  </Box>
                </TableCell>
                <TableCell style={{ width: 200 }} align="left">
                  {row.owner ?
                    <IconButton size="small" title={'ویرایش'} onClick={() => setEditUserGroup(row)}>
                      <EditIcon viewBox="0 0 1696.162 1696.143" />
                    </IconButton>
                  : null}
                  <IconButton size="small" title={'حذف'} disabled={!row.owner} onClick={() => setDeleteUserGroup(row)}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="small" style={{ marginRight: 5 }} disabled={!row.owner} title={'افزودن کاربر'} onClick={() => setAddUser(row)}>
                    <UsersIcon viewBox="0 0 36 36" />
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
      {deleteUserGroup ? <DeleteUserGroup userGroup={deleteUserGroup} handleClose={() => setDeleteUserGroup(null)} /> : null}
      {addUser ? <AddUser userGroup={addUser} handleClose={() => setAddUser(null)} /> : null}
      {groupUsers ? <GroupUsers userGroup={groupUsers} handleClose={() => setGroupUsers(null)} /> : null}
      {editUserGroup ? <EditUserGroup userGroup={editUserGroup} handleClose={() => setEditUserGroup(null)} /> : null}
    </>
  );
};

export default UserTable;
