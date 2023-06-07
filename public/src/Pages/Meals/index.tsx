import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Breadcrumbs, Button, Grid, InputAdornment, Link, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import { useStyles } from './Styles';
import { Box } from '@material-ui/core';
import Empty from '../../Extra/Empty';

import useGetDates from '../../Hooks/Meals/useGetDates';
import DatesTable from './Components/DatesTable';
import { IDate } from '../../Interfaces/Date.interface';

let timeout: ReturnType<typeof setTimeout>;
const Index = () => {
  const classes = useStyles();
  const [dateSearch, setDateSearch] = useState<string | null>(null);
  const filterTypeRef = useRef<HTMLSelectElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const datesListHook = useGetDates(0, 'DINNER');
  const [createDialog, setCreateDialog] = useState<boolean>(false);

  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setDateSearch(searchTerm);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (datesListHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت لیست تاریخ ها با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }
  let dates: IDate[] = [];
  let currentWeekDate = 0;
  if (datesListHook.data?.dates.length) {
    dates = datesListHook.data.dates;
    currentWeekDate = datesListHook.data.weekCount;
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" justifyContent="space-between" width="100%" marginBottom="15px">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="primary" href="/meals">
              تاریخ ها
            </Link>
          </Breadcrumbs>
        </Box>
        <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DatesTable rows={dates} currentWeekCount={currentWeekDate} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default Index;
