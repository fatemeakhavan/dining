import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box, Breadcrumbs,
  Button,
  Grid,
  IconButton,
  InputAdornment, Link,
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
import useGetServiceResourcePlans from '../../../../Hooks/ServiceResourcePlans/useGetServiceResourcePlans';
import { IServiceResourcePlan } from '../../../../Interfaces/ServiceResourcePlan.interface';
import CreateServiceResourcePlan from './CreateServiceResourcePlan';
import DeleteServiceResourcePlan from './DeleteServiceResourcePlan';
import EditServiceResourcePlan from './EditServiceResourcePlan';

interface IProps {
  handleClose: () => void;
}

enum EError {
  TITLE = 'TITLE',
}

const ServiceResourcePlans = (props: IProps) => {
  const { handleClose } = props;
  let serviceId = parseInt((window.location.pathname.substr(window.location.pathname.lastIndexOf('es/') + 3)).replace('/plans', ''));
  let serviceGroupId = parseInt((window.location.pathname.substr(window.location.pathname.lastIndexOf('ps/') + 3)).replace('/services', ''));
  const getServiceResourcePlansHook = useGetServiceResourcePlans(serviceId);
  const classes = useStyles();
  const [searchPlans, setSearchPlans] = useState<string | null>(null);

  let rows: IServiceResourcePlan[] = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  let timeout: ReturnType<typeof setTimeout>;
  const [deletePlan, setDeletePlan] = useState<IServiceResourcePlan | null>(null);
  const [editPlan, setEditPlan] = useState<IServiceResourcePlan | null>(null);
  const [createDialog, setCreateDialog] = useState<boolean>(false);
  // const [detailsDialog, setDetailsDialog] = useState<IServiceJenkinsAction | null>(null);
  // const [editAction, setEditAction] = useState<IServiceJenkinsAction | null>(null);

  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setSearchPlans(searchTerm);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (getServiceResourcePlansHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت پلن های منابع سرویس با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }

  let resourcePlans: IServiceResourcePlan[] = [];
  if (getServiceResourcePlansHook.data?.length) {
    resourcePlans = getServiceResourcePlansHook.data;
    rows = getServiceResourcePlansHook.data;
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  if (searchPlans && resourcePlans.length) {
    resourcePlans = resourcePlans.filter((plan) => {
      return plan.name.toLocaleLowerCase().includes(searchPlans);
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
            پلن های منابع
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
          پلن منابع جدید
        </Button>
      </Box>
      <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {resourcePlans.length || getServiceResourcePlansHook.isLoading ? (
              <TableContainer>
                <Table style={{ direction: 'rtl' }} className={classes.dialogTable} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ردیف</TableCell>
                      <TableCell align="left">نام</TableCell>
                      <TableCell align="left">عنوان</TableCell>
                      <TableCell align="left">توضیحات</TableCell>
                      <TableCell align="left">پردازنده</TableCell>
                      <TableCell align="left">حافظه</TableCell>
                      <TableCell align="left">سیستم عامل</TableCell>
                      <TableCell align="left">ظرفیت دیسک اصلی</TableCell>
                      <TableCell align="left">iops دیسک اصلی</TableCell>
                      <TableCell align="left">نوع دیسک اصلی</TableCell>
                      <TableCell align="left">دیسک های ثانویه</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
                        <TableRow key={index} className="hover">
                          <TableCell align="left" >
                            <Box display="flex" alignItems="center">
                              {toPersinaDigit(index + 1 + page * rowsPerPage)}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {row.name}
                            </Box>
                          </TableCell>
                          <TableCell align="left" >
                            <Box display="flex" alignItems="center">
                              {row.faDisplayName}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {row.faDescription}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {row.cpu}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {row.memory}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {row.templateName}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {row.mainDisk.capacity}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {row.mainDisk.iops}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Box display="flex" alignItems="center">
                              {row.mainDisk.type}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            {row.extraDisks.map((exDisk) => (
                              <Box display="flex" alignItems="center">
                                iops:{exDisk.iops} -
                                ظرفیت:{exDisk.capacity} -
                                مسیر: {exDisk.mountPath}
                              </Box>
                            ))}
                          </TableCell>
                          <TableCell align="left">
                            <IconButton size="small" title={'حذف'} onClick={() => setDeletePlan(row)}>
                              <TrashIcon />
                            </IconButton>
                            <IconButton size="small" title={'ویرایش'} style={{ marginRight: 5 }} onClick={() => setEditPlan(row)}>
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
              <Empty message={searchPlans ? 'پلنی پیدا نشد.' : 'هنوز پلنی اضافه نشده است.'} />
            )}
            {createDialog ? <CreateServiceResourcePlan serviceId={serviceId} handleClose={() => setCreateDialog(false)} /> : null}
            {deletePlan ? <DeleteServiceResourcePlan serviceId={serviceId} plan={deletePlan} handleClose={() => setDeletePlan(null)} /> : null}
            {editPlan ? <EditServiceResourcePlan serviceId={serviceId} plan={editPlan} handleClose={() => setEditPlan(null)} /> : null}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ServiceResourcePlans;
