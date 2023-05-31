import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
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
import { IService } from '../../../Interfaces/Service.interface';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { toast } from 'react-toastify';
import { IUserGroup } from '../../../Interfaces/UserGroup.interface';
import useGetServiceJenkinsActions from '../../../Hooks/ServiceJenkinsActions/useGetServiceJenkinsActions';
import useEditServiceJenkinsActions from '../../../Hooks/ServiceJenkinsActions/useEditServiceJenkinsActions';
import Empty from '../../../Extra/Empty';
import { useStyles } from '../Styles';
import { IServiceJenkinsAction } from '../../../Interfaces/ServiceJenkinsAction.interface';
import { IServiceJenkinsInput } from '../../../Interfaces/ServiceJenkinsInput.interface';
import { IServiceJenkinsOutput } from '../../../Interfaces/ServiceJenkinsOutput.interface';
import TableHead from '@material-ui/core/TableHead';
import { TablePaginationActions } from '../../../Extra/TablePaginationActions';
import { toPersinaDigit } from '../../../Helpers/Utils';
import { EditIcon, SearchIcon, TrashIcon } from 'Assets/Svg';
import DeleteAction from './DeleteServiceJenkinsAction';
import CreateServiceJenkinsAction from './CreateServiceJenkinsAction';
import { AddCircleOutline } from '@material-ui/icons';
import useGetServiceGroups from '../../../Hooks/serviceGroups/useGetServiceGroups';
import { IServiceGroup } from '../../../Interfaces/ServiceGroup.interface';
import useGetServices from '../../../Hooks/Services/useGetServices';
import JenkinsAction from './JenkinsAction';
import EditServiceJenkinsAction from './EditServiceJenkinsAction';
import useGetService from '../../../Hooks/Services/useGetService';

interface IProps {
  handleClose: () => void;
  userGroups: IUserGroup[] | undefined;
}

enum EError {
  TITLE = 'TITLE',
}

const ServiceJenkinsActions = (props: IProps) => {
  const { handleClose, userGroups } = props;
  let serviceId = parseInt((window.location.pathname.substr(window.location.pathname.lastIndexOf('es/') + 3)).replace('/actions', ''));
  const getServiceHook = useGetService(serviceId);
  const getServiceJenkinsActionsHook = useGetServiceJenkinsActions(serviceId);
  const editServiceJenkinsActionsHook = useEditServiceJenkinsActions();
  const [isEditing, setIsEditing] = React.useState(false);
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();
  const [searchJenkins, setSearchJenkins] = useState<string | null>(null);
  const handleChange = (event: { target: { checked: React.SetStateAction<boolean> } }) => {
    setIsEditing(event.target.checked);
  };
  let rows: IServiceJenkinsAction[] = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const actionTypeRef = useRef<HTMLSelectElement>(null);
  const jobNameRef = useRef<HTMLInputElement>(null);
  let timeout: ReturnType<typeof setTimeout>;
  const [deleteAction, setDeleteAction] = useState<IServiceJenkinsAction | null>(null);
  const [createDialog, setCreateDialog] = useState<boolean>(false);
  const [detailsDialog, setDetailsDialog] = useState<IServiceJenkinsAction | null>(null);
  const [editAction, setEditAction] = useState<IServiceJenkinsAction | null>(null);
  const getServiceGroupsHook = useGetServiceGroups();

  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setSearchJenkins(searchTerm);
    }, 1000);
  };

  let service: IService = {
    faDisplayName: '',
    faDescription: '',
    maintenanceMode: false,
    id: 0,
    name: 'trs',
    type: 'MANAGED',
    enable: false,
    groupId: 0,
    created: '',
    updated: '',
    validNodeCounts: [],
    clusterMode: false,
  };
  let serviceGroups: IServiceGroup[] = [];
  let serviceGroupName: string = '';
  if (getServiceHook?.data) {
    service = getServiceHook.data as IService;
  }

  if (getServiceGroupsHook?.data) {
    serviceGroups = getServiceGroupsHook.data;
    serviceGroups.forEach((grp) => {
      if (grp.id === service?.groupId) {
        serviceGroupName = grp.name;
      }
    });
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (getServiceJenkinsActionsHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت اکشن های جنکینز با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }

  let jenkinsActions: IServiceJenkinsAction[] = [];
  if (getServiceJenkinsActionsHook.data?.length) {
    jenkinsActions = getServiceJenkinsActionsHook.data;
    rows = getServiceJenkinsActionsHook.data;
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  if (searchJenkins && jenkinsActions.length) {
    jenkinsActions = jenkinsActions.filter((service) => {
      return service.name.toLocaleLowerCase().includes(searchJenkins);
    });
  }
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editJenkins = (jenkinsAction: IServiceJenkinsAction) => {
    const serviceId = service.id;
    const actionId = jenkinsAction.id;
    const name = nameRef.current?.value;
    const faDisplayName = titleRef.current?.value;
    const faDescription = descriptionRef.current?.value;
    const actionType = actionTypeRef.current?.value;
    const jobName = jobNameRef.current?.value;
    const jenkinsInput: IServiceJenkinsInput[] = [];
    const jenkinsOutput: IServiceJenkinsOutput[] = [];

    if (
      !name ||
      name.trim() === '' ||
      name.length < 2 ||
      !faDisplayName ||
      faDisplayName.trim() === '' ||
      !faDescription ||
      faDescription.trim() === '' ||
      !jobName ||
      jobName.trim() === '' ||
      !actionType
    ) {
      setError(EError.TITLE);
      return;
    }
    if (
      service.quota?.name === nameRef.current?.value &&
      service.quota?.displayName === titleRef.current?.value &&
      service.quota?.description === descriptionRef.current?.value
    ) {
      toast.error(`هیچ تغییری یافت نشد.`);
      // return;
    }
    setError(null);
    editServiceJenkinsActionsHook.mutate({
      serviceId,
      actionId,
      name,
      faDisplayName,
      faDescription,
      actionType,
      jobName,
      jenkinsInput,
      jenkinsOutput,
      callBack: handleClose,
    });
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <Box display="flex" justifyContent="space-between" width="100%" marginBottom="5px">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/service-groups">
            گروه های سرویس
          </Link>
          <Link color="inherit" underline="hover" href={'/service-groups/' + service.groupId + '/services'}>
            سرویس ها
          </Link>
          <Link color="primary" underline="hover">
            اکشن های جنکینز
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
          اکشن جدید
        </Button>
      </Box>
      <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {jenkinsActions.length || getServiceJenkinsActionsHook.isLoading ? (
              <TableContainer>
                <Table style={{ direction: 'rtl' }} className={classes.dialogTable} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ردیف</TableCell>
                      <TableCell align="left">نام</TableCell>
                      <TableCell align="left">عنوان</TableCell>
                      <TableCell align="left">نوع اکشن</TableCell>
                      <TableCell align="left">نام جاب</TableCell>
                      <TableCell align="left">توضیحات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
                        <TableRow key={index} className="hover">
                          <TableCell align="left" onClick={() => setDetailsDialog(row)}>
                            <Box display="flex" alignItems="center">
                              {toPersinaDigit(index + 1 + page * rowsPerPage)}
                            </Box>
                          </TableCell>
                          <TableCell align="left" onClick={() => setDetailsDialog(row)}>
                            <Box display="flex" alignItems="center">
                              {row.name}
                            </Box>
                          </TableCell>
                          <TableCell align="left" onClick={() => setDetailsDialog(row)}>
                            <Box display="flex" alignItems="center">
                              {row.faDisplayName}
                            </Box>
                          </TableCell>
                          <TableCell align="left" onClick={() => setDetailsDialog(row)}>
                            <Box display="flex" alignItems="center">
                              {row.actionType}
                            </Box>
                          </TableCell>
                          <TableCell align="left" onClick={() => setDetailsDialog(row)}>
                            <Box display="flex" alignItems="center">
                              {row.jobName}
                            </Box>
                          </TableCell>
                          <TableCell align="left" onClick={() => setDetailsDialog(row)}>
                            <Box display="flex" alignItems="center">
                              {row.faDescription}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <IconButton size="small" title={'حذف'} onClick={() => setDeleteAction(row)}>
                              <TrashIcon />
                            </IconButton>
                            <IconButton size="small" title={'ویرایش'} style={{ marginRight: 5 }} onClick={() => setEditAction(row)}>
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
              <Empty message={searchJenkins ? 'سرویسی پیدا نشد.' : 'هنوز اکشنی اضافه نشده است.'} />
            )}
            {createDialog ? <CreateServiceJenkinsAction service={service} serviceGroupName={serviceGroupName} handleClose={() => setCreateDialog(false)} /> : null}
            {detailsDialog ? <JenkinsAction action={detailsDialog} handleClose={() => setDetailsDialog(null)} /> : null}
            {deleteAction ? <DeleteAction action={deleteAction} service={service} handleClose={() => setDeleteAction(null)} /> : null}
            {editAction ? <EditServiceJenkinsAction action={editAction} serviceGroupName={serviceGroupName} service={service} handleClose={() => setEditAction(null)} /> : null}
          </Grid>
        </Grid>
      </Box>
    </Paper>
    // <Dialog open={true} onClose={handleClose} maxWidth={'lg'}>
    //   <DialogTitle>
    //     <Typography component="p">
    //      اکشن های جنکینز سرویس (  <b> {service[0]?.name} </b> )
    //     </Typography>
    //   </DialogTitle>
    //   <DialogContent>
    //     <Box display="flex" justifyContent="space-between" width="100%" marginBottom="5px">
    //       <Button variant="outlined" color="primary" style={{ direction: 'rtl'}} startIcon={<AddCircleOutline />} onClick={() => setCreateDialog(true)}>
    //         اکشن جدید
    //       </Button>
    //     </Box>
    //     {isEditing ? (
    //       <TableContainer>
    //         <Typography component="label">نام</Typography>
    //         <TextField
    //           // helperText={error === EError.TITLE ? 'نام گروه را وارد کنید' : ' '}
    //           variant="outlined"
    //           placeholder=""
    //           fullWidth
    //           style={{ marginBottom: '15px' }}
    //           inputRef={nameRef}
    //           defaultValue={service[0]?.quota.name}
    //         />
    //         <Typography component="label">عنوان</Typography>
    //         <TextField
    //           // helperText={error === EError.TITLE ? 'عنوان گروه را وارد کنید' : ' '}
    //           variant="outlined"
    //           placeholder=""
    //           fullWidth
    //           style={{ marginBottom: '15px' }}
    //           inputRef={titleRef}
    //           defaultValue={service[0]?.quota.displayName}
    //         />
    //         <Typography component="label">توضیحات</Typography>
    //         <TextField
    //           // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
    //           variant="outlined"
    //           placeholder=""
    //           fullWidth
    //           style={{ marginBottom: '15px' }}
    //           inputRef={descriptionRef}
    //           defaultValue={service[0]?.quota.description}
    //         />
    //         <Typography component="label">حداکثر پردازنده</Typography>
    //         <TextField
    //           // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
    //           variant="outlined"
    //           placeholder=""
    //           fullWidth
    //           style={{ marginBottom: '15px' }}
    //           // inputRef={maxCpuRef}
    //           defaultValue={service[0]?.quota.maxCpu}
    //         />
    //         <Typography component="label">حداکثر حافظه</Typography>
    //         <TextField
    //           // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
    //           variant="outlined"
    //           placeholder=""
    //           fullWidth
    //           style={{ marginBottom: '15px' }}
    //           // inputRef={maxRamRef}
    //           defaultValue={service[0]?.quota.maxMemory}
    //         />
    //         <Typography component="label">حداکثر دیسک</Typography>
    //         <TextField
    //           // helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
    //           variant="outlined"
    //           placeholder=""
    //           fullWidth
    //           style={{ marginBottom: '15px' }}
    //           // inputRef={maxDiskRef}
    //           defaultValue={service[0]?.quota.maxDisk}
    //         />
    //       </TableContainer>
    //     ) : (
    //       <TableContainer>
    //         <Table style={{ direction: 'rtl' }} className={classes.dialogTable} aria-label="simple table">
    //           <TableHead>
    //             <TableRow>
    //               <TableCell>ردیف</TableCell>
    //               <TableCell align="left">نام</TableCell>
    //               <TableCell align="left">عنوان</TableCell>
    //               <TableCell align="left">نوع اکشن</TableCell>
    //               <TableCell align="left">Job Name</TableCell>
    //               <TableCell align="left">توضیحات</TableCell>
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
    //               <TableRow key={index} className="hover">
    //                 <TableCell align="left">
    //                   <Box display="flex" alignItems="center">
    //                     {toPersinaDigit(index + 1 + page * rowsPerPage)}
    //                   </Box>
    //                 </TableCell>
    //                 <TableCell align="left">
    //                   <Box display="flex" alignItems="center">
    //                     {row.name}
    //                   </Box>
    //                 </TableCell>
    //                 <TableCell align="left">
    //                   <Box display="flex" alignItems="center">
    //                     {row.faDisplayName}
    //                   </Box>
    //                 </TableCell>
    //                 <TableCell align="left">
    //                   <Box display="flex" alignItems="center">
    //                     {row.actionType}
    //                   </Box>
    //                 </TableCell>
    //                 <TableCell align="left">
    //                   <Box display="flex" alignItems="center">
    //                     {row.jobName}
    //                   </Box>
    //                 </TableCell>
    //                 <TableCell align="left">
    //                   <Box display="flex" alignItems="center">
    //                     {row.faDescription}
    //                   </Box>
    //                 </TableCell>
    //                 <TableCell align="left">
    //                   <IconButton size="small" title={'حذف'} onClick={() => setDeleteAction(row)}>
    //                     <TrashIcon />
    //                   </IconButton>
    //                 </TableCell>
    //               </TableRow>
    //             ))}
    //
    //             {emptyRows > 0 && (
    //               <TableRow style={{ height: 55 * emptyRows }}>
    //                 <TableCell colSpan={6} />
    //               </TableRow>
    //             )}
    //           </TableBody>
    //           <TableFooter>
    //             <TableRow>
    //               <TablePagination
    //                 rowsPerPageOptions={[]}
    //                 colSpan={3}
    //                 count={rows.length}
    //                 rowsPerPage={rowsPerPage}
    //                 page={page}
    //                 onChangePage={handleChangePage}
    //                 onChangeRowsPerPage={handleChangeRowsPerPage}
    //                 ActionsComponent={TablePaginationActions}
    //               />
    //             </TableRow>
    //           </TableFooter>
    //         </Table>
    //       </TableContainer>
    //     )}
    //     {deleteAction ? <DeleteAction action={deleteAction} service={service[0]} handleClose={() => setDeleteAction(null)} /> : null}
    //   </DialogContent>
    //   <DialogActions>
    //     <Box minWidth="100px">
    //       <Button fullWidth color="primary" onClick={handleClose}>
    //         بستن
    //       </Button>
    //     </Box>
    //     {isEditing ? (
    //       <Box minWidth="100px">
    //         {/*<Button fullWidth variant="contained" color="primary" onClick={() => editQuota()} disabled={editServiceQuotaHook.isLoading}>*/}
    //         {/*  ثبت تغییرات*/}
    //         {/*</Button>*/}
    //       </Box>
    //     ) : null}
    //   </DialogActions>
    // </Dialog>
  );
};

export default ServiceJenkinsActions;
