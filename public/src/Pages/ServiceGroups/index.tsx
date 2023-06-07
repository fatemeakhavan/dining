import React, { ChangeEvent, useEffect, useState } from 'react';
import { Breadcrumbs, Button, Grid, InputAdornment, Link, Paper, TextField } from '@material-ui/core';
import { useStyles } from './Styles';
import { AddCircleOutline } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import Empty from 'Extra/Empty';
import { SearchIcon } from 'Assets/Svg';
import CreateServiceGroup from './Components/CreateServiceGroup';
import ServiceGroupsTable from './Components/ServiceGroupsTable';
import { IServiceGroup } from '../../Interfaces/ServiceGroup.interface';
import useGetServiceGroups from '../../Hooks/serviceGroups/useGetServiceGroups';
import useGetUserGroups from '../../Hooks/UserGroups/useGetUserGroups';
import { IUserGroup } from '../../Interfaces/UserGroup.interface';

let timeout: ReturnType<typeof setTimeout>;
const Index = () => {
  const serviceGroupListHook = useGetServiceGroups();
  const userGroupListHook = useGetUserGroups();
  const classes = useStyles();
  const [searchGroup, setSearchGroup] = useState<string | null>(null);
  const [createDialog, setCreateDialog] = useState<boolean>(false);
  let isSupervisor = false;
  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setSearchGroup(searchTerm);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (serviceGroupListHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت گروه های سرویس با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }

  let serviceGroups: IServiceGroup[] = [];
  if (serviceGroupListHook.data?.length) {
    serviceGroups = serviceGroupListHook.data;
  }
  let userGroups: IUserGroup[] = [];
  if (userGroupListHook.data?.length) {
    userGroups = userGroupListHook.data;
    userGroups.forEach((grp) => {
      if (grp.name === 'SAKKU_MARKETPLACE_SUPERVISOR') isSupervisor = true;
    });
  }
  if (searchGroup && serviceGroups.length) {
    serviceGroups = serviceGroups.filter((group) => {
      return group.name.toLocaleLowerCase().includes(searchGroup);
    });
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" justifyContent="space-between" width="100%" marginBottom="15px">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="primary" href="/service-groups">
              گروه های سرویس
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
          <Button
            variant="outlined"
            disabled={!isSupervisor}
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={() => setCreateDialog(true)}
          >
            گروه سرویس جدید
          </Button>
        </Box>
        <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {serviceGroups.length || serviceGroupListHook.isLoading ? (
                <ServiceGroupsTable rows={serviceGroups} isSupervisor={isSupervisor} />
              ) : (
                <Empty message={searchGroup ? 'گروه سرویس پیدا نشد.' : 'هنوز گروه سرویس اضافه نشده است.'} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {createDialog ? <CreateServiceGroup handleClose={() => setCreateDialog(false)} /> : null}
    </>
  );
};

export default Index;
