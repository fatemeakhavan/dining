import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Grid, InputAdornment, Paper, TextField } from '@material-ui/core';
import { useStyles } from './Styles';
import { AddCircleOutline } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import Empty from 'Extra/Empty';
import { SearchIcon } from 'Assets/Svg';
import CreateUserGroup from './Components/CreateUserGroup';
import UserGroupsTable from './Components/UserGroupsTable';
import useGetUserGroups from '../../Hooks/UserGroups/useGetUserGroups';
import { IUserGroup } from '../../Interfaces/UserGroup.interface';

let timeout: ReturnType<typeof setTimeout>;
const Index = () => {
  const userGroupListHook = useGetUserGroups();
  const classes = useStyles();
  const [searchGroup, setSearchGroup] = useState<string | null>(null);
  const [createDialog, setCreateDialog] = useState<boolean>(false);

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

  if (userGroupListHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت گروه های کاربران با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }

  let userGroups: IUserGroup[] = [];
  if (userGroupListHook.data?.length) {
    userGroups = userGroupListHook.data;
  }
  if (searchGroup && userGroups.length) {
    userGroups = userGroups.filter((group) => {
      return group.name.toLocaleLowerCase().includes(searchGroup);
    });
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
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
            گروه کاربری جدید
          </Button>
        </Box>
        <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {userGroups.length || userGroupListHook.isLoading ? (
                <UserGroupsTable rows={userGroups} />
              ) : (
                <Empty message={searchGroup ? 'گروه کاربری پیدا نشد.' : 'هنوز گروه کاربری اضافه نشده است.'} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {createDialog ? <CreateUserGroup handleClose={() => setCreateDialog(false)} /> : null}
    </>
  );
};

export default Index;
