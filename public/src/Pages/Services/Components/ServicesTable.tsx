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
import { CourseIcon, DocumentsIcon, EditIcon, NewsIcon, TagsIcon, TrashIcon } from 'Assets/Svg';
import { TablePaginationActions } from 'Extra/TablePaginationActions';
import { IService } from '../../../Interfaces/Service.interface';
import DeleteService from './DeleteService';
import ServiceQuota from './ServiceQuota';
import useGetUserGroups from '../../../Hooks/UserGroups/useGetUserGroups';
import { useHistory } from 'react-router-dom';
import EditService from './EditService';

interface IProps {
  rows: IService[];
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ServiceTable: React.FunctionComponent<IProps> = (props) => {
  const classes = useStyles();
  const { rows } = props;
  const getUserGroupsHook = useGetUserGroups();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [deleteService, setDeleteService] = useState<IService | null>(null);
  const [editService, setEditService] = useState<IService | null>(null);
  const [serviceQuota, setServiceQuota] = useState<IService | null>(null);
  const history = useHistory();

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNavigateToActions = (serviceId: number) => {
    history.push('services/' + serviceId + '/actions');
  };
  const handleNavigateToPlans = (serviceId: number) => {
    history.push('services/' + serviceId + '/plans');
  };
  const handleNavigateToReports = (serviceId: number) => {
    history.push('services/' + serviceId + '/reports');
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
              <TableCell align="left">نوع</TableCell>
              <TableCell align="left">حالت کلاستری</TableCell>
              <TableCell align="left">غیر فعال شدن امکان ساخت</TableCell>
              <TableCell align="left">توضیحات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
              <TableRow key={index} className="hover">
                <TableCell align="left" style={{ width: 50 }}>
                  <Box display="flex" alignItems="center">
                    {toPersinaDigit(index + 1 + page * rowsPerPage)}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.name}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.faDisplayName}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.type}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.clusterMode ? 'بلی' : 'خیر'}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.maintenanceMode ? 'بلی' : 'خیر'}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.faDescription}
                  </Box>
                </TableCell>
                <TableCell style={{ width: 200 }} align="left">
                  <IconButton size="small" title={'ویرایش'} onClick={() => setEditService(row)}>
                    <EditIcon viewBox="0 0 1696.162 1696.143" />
                  </IconButton>
                  <IconButton size="small" title={'حذف'} onClick={() => setDeleteService(row)}>
                    <TrashIcon />
                  </IconButton>
                  <IconButton size="small" style={{ marginRight: 5 }} title={'سهمیه بندی سرویس'} onClick={() => setServiceQuota(row)}>
                    <DocumentsIcon viewBox="0 0 36 36" />
                  </IconButton>
                  <IconButton size="small" style={{ marginRight: 5 }} title={'اکشن های جنکینز سرویس'} onClick={() => handleNavigateToActions(row.id)}>
                    <CourseIcon viewBox="0 0 350 350"/>
                  </IconButton>
                  <IconButton size="small" style={{ marginRight: 5 }} title={'پلن های منابع سرویس'} onClick={() => handleNavigateToPlans(row.id)}>
                    <TagsIcon viewBox="0 0 36 36" />
                  </IconButton>
                  <IconButton size="small" style={{ marginRight: 5 }} title={'گزارشات سرویس'} onClick={() => handleNavigateToReports(row.id)}>
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
      {deleteService ? <DeleteService service={deleteService} handleClose={() => setDeleteService(null)} /> : null}
      {serviceQuota ? <ServiceQuota service={serviceQuota} userGroups={getUserGroupsHook?.data} handleClose={() => setServiceQuota(null)} /> : null}
      {/*{groupUsers ? <GroupUsers userGroup={groupUsers} handleClose={() => setGroupUsers(null)} /> : null}*/}
      {editService ? <EditService service={editService} handleClose={() => setEditService(null)} /> : null}
    </>
  );
};

export default ServiceTable;
