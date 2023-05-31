import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TableFooter,
  TablePagination,
  TextField,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Empty from '../../../../Extra/Empty';
import { useStyles } from '../../Styles';
import TableHead from '@material-ui/core/TableHead';
import { TablePaginationActions } from '../../../../Extra/TablePaginationActions';
import { toPersinaDigit } from '../../../../Helpers/Utils';
import { EditIcon, SearchIcon, TrashIcon } from 'Assets/Svg';
import { AddCircleOutline } from '@material-ui/icons';
import useGetServiceReports from '../../../../Hooks/ServiceReports/useGetServiceReports';
import { IServiceReport } from '../../../../Interfaces/ServiceReport.interface';
import CreateServiceReport from './CreateServiceReport';
import DeleteServiceReport from './DeleteServiceReport';
import EditServiceReport from './EditServiceReport';

interface IProps {
  handleClose: () => void;
}

enum EError {
  TITLE = 'TITLE',
}

const ServiceReports = (props: IProps) => {
  const { handleClose } = props;
  let serviceId = parseInt(window.location.pathname.substr(window.location.pathname.lastIndexOf('es/') + 3).replace('/reports', ''));
  let serviceGroupId = parseInt(window.location.pathname.substr(window.location.pathname.lastIndexOf('ps/') + 3).replace('/services', ''));
  const getServiceReportsHook = useGetServiceReports(serviceId);
  const classes = useStyles();
  const [searchReports, setSearchReports] = useState<string | null>(null);

  let rows: IServiceReport[] = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  let timeout: ReturnType<typeof setTimeout>;
  const [deleteReport, setDeleteReport] = useState<IServiceReport | null>(null);
  const [editReport, setEditReport] = useState<IServiceReport | null>(null);
  const [createDialog, setCreateDialog] = useState<boolean>(false);

  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setSearchReports(searchTerm);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (getServiceReportsHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت گزارشات با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }

  let reports: IServiceReport[] = [];
  if (getServiceReportsHook.data?.length) {
    reports = getServiceReportsHook.data;
    rows = getServiceReportsHook.data;
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  if (searchReports && reports.length) {
    reports = reports.filter((report) => {
      return report.name.toLocaleLowerCase().includes(searchReports);
    });
  }
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <Box display="flex" justifyContent="space-between" width="100%" marginBottom="5px">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/service-groups">
            گروه های سرویس
          </Link>
          <Link color="inherit" underline="hover" href={'/service-groups/' + serviceGroupId + '/services'}>
            سرویس ها
          </Link>
          <Link color="primary" underline="hover">
            گزارشات
          </Link>
        </Breadcrumbs>
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%" marginBottom="5px">
        <TextField
          className={classes.searchInput}
          variant="outlined"
          placeholder="جستجو در لیست"
          onChange={searchInList}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined" color="primary" startIcon={<AddCircleOutline />} onClick={() => setCreateDialog(true)}>
          گزارش جدید
        </Button>
      </Box>
      <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {reports.length || getServiceReportsHook.isLoading ? (
              <TableContainer>
                <Table style={{ direction: 'rtl' }} className={classes.dialogTable} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ردیف</TableCell>
                      <TableCell align="left">نام</TableCell>
                      <TableCell align="left">عنوان</TableCell>
                      <TableCell align="left">نوع</TableCell>
                      <TableCell align="left">توضیحات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                      (row, index) => (
                        <TableRow key={index} className="hover">
                          <TableCell align="left">
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
                            {(() => {
                              switch (row.type) {
                                case 'LIST':
                                  return (
                                    <Box display="flex" alignItems="center">
                                      لیست سرویس های ساخته شده
                                    </Box>
                                  );
                                case 'ACTIVITY':
                                  return (
                                    <Box display="flex" alignItems="center">
                                      تاریخچه اکشن های سرویس
                                    </Box>
                                  );
                                case 'RESOURCE_USAGE':
                                  return (
                                    <Box display="flex" alignItems="center">
                                      گزارش منابع مصرفی سرویس
                                    </Box>
                                  );
                              }
                            })()}
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {row.faDescription}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <IconButton size="small" title={'حذف'} onClick={() => setDeleteReport(row)}>
                              <TrashIcon />
                            </IconButton>
                            <IconButton size="small" title={'ویرایش'} style={{ marginRight: 5 }} onClick={() => setEditReport(row)}>
                              <EditIcon viewBox="0 0 1696.162 1696.143" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ),
                    )}
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
            ) : (
              <Empty message={searchReports ? 'گزارشی پیدا نشد.' : 'هنوز گزارشی اضافه نشده است.'} />
            )}
            {createDialog ? <CreateServiceReport serviceId={serviceId} handleClose={() => setCreateDialog(false)} /> : null}
            {deleteReport ? (
              <DeleteServiceReport serviceId={serviceId} report={deleteReport} handleClose={() => setDeleteReport(null)} />
            ) : null}
            {editReport ? <EditServiceReport serviceId={serviceId} report={editReport} handleClose={() => setEditReport(null)} /> : null}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ServiceReports;
