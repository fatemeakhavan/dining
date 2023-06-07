import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { toPersinaDigit } from 'Helpers/Utils';
import IconButton from '@material-ui/core/IconButton';
import { Box, Chip, makeStyles, TableFooter, TablePagination } from '@material-ui/core';
import { EditIcon, TrashIcon } from 'Assets/Svg';
import { TablePaginationActions } from 'Extra/TablePaginationActions';
import { IServiceGroup } from '../../../Interfaces/ServiceGroup.interface';
import DeleteServiceGroup from './DeleteServiceGroup';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import useGetServiceGroupCategories from '../../../Hooks/UserGroups/useGetServiceGroupCategories';
import { IServiceGroupCategory } from '../../../Interfaces/ServiceGroupCategory.inteface';
import EditServiceGroup from './EditServiceGroup';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ChevronLeft';

interface IProps {
  rows: IServiceGroup[];
  isSupervisor: boolean;
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tagsList: {
    display: 'flex',
    direction: 'ltr',
    listStyle: 'none',
    margin: '0',
    padding: theme.spacing(0.5),
    flexWrap: 'wrap',
    '& li': {
      margin: theme.spacing(0.5),
    },
  },
}));

const GroupTable: React.FunctionComponent<IProps> = (props) => {
  const classes = useStyles();
  const { rows, isSupervisor } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [deleteServiceGroup, setDeleteServiceGroup] = useState<IServiceGroup | null>(null);
  const [editServiceGroup, setEditServiceGroup] = useState<IServiceGroup | null>(null);
  const getServiceGroupCategoriesHook = useGetServiceGroupCategories();
  const history = useHistory();
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  let serviceGroupCategories: IServiceGroupCategory[] = [];

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNavigateToServices = (serviceGroupID: number) => {
    history.push('service-groups/' + serviceGroupID + '/services');
  };

  if (getServiceGroupCategoriesHook.data?.length) {
    serviceGroupCategories = getServiceGroupCategoriesHook.data;
  }
  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="left">نام</TableCell>
              <TableCell align="left">نام فارسی</TableCell>
              <TableCell align="left">توضیحات</TableCell>
              <TableCell align="left">دسته بندی</TableCell>
              <TableCell align="left">لوگو</TableCell>
              <TableCell align="left">تگ ها</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
              <TableRow key={index} className="hover">
                <TableCell align="left" style={{ width: 50 }}>
                  {toPersinaDigit(index + 1 + page * rowsPerPage)}
                </TableCell>
                <TableCell align="left" onClick={() => handleNavigateToServices(row.id)}>
                  <Box display="flex" alignItems="center">
                    {row.name}
                  </Box>
                </TableCell>
                <TableCell align="left" onClick={() => handleNavigateToServices(row.id)}>
                  <Box display="flex" alignItems="center">
                    {row.faDisplayName}
                  </Box>
                </TableCell>
                <TableCell align="left" onClick={() => handleNavigateToServices(row.id)}>
                  <Box display="flex" alignItems="center">
                    {row.faDescription}
                  </Box>
                </TableCell>
                <TableCell align="left" onClick={() => handleNavigateToServices(row.id)}>
                  <Box display="flex" alignItems="center">
                    {serviceGroupCategories[row.categoryId - 1]?.faDisplayName}
                  </Box>
                </TableCell>
                <TableCell align="left" onClick={() => handleNavigateToServices(row.id)}>
                  <Box display="flex" alignItems="center">
                    {row.logo ? (
                      <img src={row.logo} style={{ borderRadius: '35px', marginLeft: '5px' }} width="35px" height="35px" alt="" />
                    ) : (
                      <AccountCircleOutlinedIcon style={{ fontSize: '35px', marginLeft: '5px' }} color={'disabled'} />
                    )}
                  </Box>
                </TableCell>
                <TableCell align="left" onClick={() => handleNavigateToServices(row.id)}>
                  <ul className={classes.tagsList}>
                    {row.tags.map((data) => {
                      return (
                        <li key={data}>
                          <Chip label={data} color="primary" variant="outlined" />
                        </li>
                      );
                    })}
                  </ul>
                </TableCell>
                <TableCell style={{ width: 200 }} align="left">
                  <IconButton size="small" title={'حذف'} onClick={() => setDeleteServiceGroup(row)} disabled={!isSupervisor}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="small" title={'ویرایش'} onClick={() => setEditServiceGroup(row)}>
                    <EditIcon viewBox="0 0 1696.162 1696.143" />
                  </IconButton>
                  <IconButton size="small" title={'سرویس ها'} onClick={() => handleNavigateToServices(row.id)}>
                    <ArrowBackIosIcon />
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
      {deleteServiceGroup ? <DeleteServiceGroup serviceGroup={deleteServiceGroup} handleClose={() => setDeleteServiceGroup(null)} /> : null}
      {editServiceGroup ? <EditServiceGroup serviceGroup={editServiceGroup} handleClose={() => setEditServiceGroup(null)} /> : null}
      {/*{addUser ? <AddUser userGroup={addUser} handleClose={() => setAddUser(null)} /> : null}*/}
      {/*{groupUsers ? <GroupUsers userGroup={groupUsers} handleClose={() => setGroupUsers(null)} /> : null}*/}
    </>
  );
};

export default GroupTable;
