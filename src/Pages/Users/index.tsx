import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Grid, InputAdornment, Paper, TextField } from '@material-ui/core';
import { useStyles } from './Styles';
import { AddCircleOutline } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import { SearchIcon } from 'Assets/Svg';
import CreateUserGroup from './Components/CreateUserGroup';
import useSearchUser from '../../Hooks/Users/useSearchUser';
import { IUser } from '../../Interfaces/User.interface';
import UsersTable from './Components/UserTable';


let timeout: ReturnType<typeof setTimeout>;
const Index = () => {
  const classes = useStyles();
  const usernameRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string>('');
  const searchUserHook = useSearchUser((username as unknown) as string);
  const [searchGroup, setSearchGroup] = useState<string | null>(null);
  const [createDialog, setCreateDialog] = useState<boolean>(false);

  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setSearchGroup(searchTerm);
    }, 1000);
  };

  let users: IUser[] = [];
  const searchUser = () => {
    if (usernameRef.current?.value) {
      setUsername((usernameRef.current?.value as unknown) as string);
      timeout = setTimeout(() => {
        searchUserHook.refetch();
      }, 500);
    }
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  if (searchUserHook.data?.length) {
    users = searchUserHook.data;
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // @ts-ignore
  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                className={classes.searchInput}
                variant="outlined"
                inputRef={usernameRef}
                placeholder="جستجو با نام کاربری"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="outlined" color="primary" startIcon={<AddCircleOutline />} onClick={searchUser}>
                جستجوی کاربر
              </Button>

              {searchUserHook.data?.length && <UsersTable users={users} />}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {createDialog ? <CreateUserGroup handleClose={() => setCreateDialog(false)} /> : null}
    </>
  );
};

export default Index;
