import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Breadcrumbs, Button, Grid, InputAdornment, Link, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import { useStyles } from './Styles';
import { Box } from '@material-ui/core';
import ReportTable from './Components/ServiceReportsTable';
import { ILocation } from '../../Interfaces/Location.interface';
import Empty from '../../Extra/Empty';
import useGetLocations from '../../Hooks/Locations/useGetLocations';
import { SearchIcon } from '../../Assets/Svg';
import { AddCircleOutline } from '@material-ui/icons';
import CreateLocation from "./Components/CreateLocation";

let timeout: ReturnType<typeof setTimeout>;
const Index = () => {
  const classes = useStyles();
  const [locationSearch, setLocationSearch] = useState<string | null>(null);
  const filterTypeRef = useRef<HTMLSelectElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const locationListHook = useGetLocations();
  const [createDialog, setCreateDialog] = useState<boolean>(false);

  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setLocationSearch(searchTerm);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (locationListHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت لیست شعبه با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }

  let locations: ILocation[] = [];
  if (locationListHook.data?.length) {
    locations = locationListHook.data;
  }

  if (locationSearch && locationSearch.length) {
    locations = locations.filter((rest) => {
      return rest.name?.toLocaleLowerCase().includes(locationSearch);
    });
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" justifyContent="space-between" width="100%" marginBottom="15px">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="primary" href="/locations">
              شعب
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
            شعبه جدید
          </Button>
        </Box>
        <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <ReportTable rows={locations} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {createDialog ? <CreateLocation handleClose={() => setCreateDialog(false)} /> : null}
    </>
  );
};

export default Index;
