import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Breadcrumbs, Button, Grid, InputAdornment, Link, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import { useStyles } from './Styles';
import { Box } from '@material-ui/core';
import { IServiceReport } from '../../Interfaces/ServiceReport.interface';
import ReportTable from './Components/ServiceReportsTable';
import useGetRestaurants from '../../Hooks/Restaurants/useGetRestaurants';
import { IRestaurant } from '../../Interfaces/Restaurant.interface';
import Empty from '../../Extra/Empty';
import { SearchIcon } from '../../Assets/Svg';
import { AddCircleOutline } from '@material-ui/icons';
import CreateRestaurant from './Components/CreateRestaurant';

let timeout: ReturnType<typeof setTimeout>;
const Index = () => {
  const classes = useStyles();
  const [restaurantSearch, setRestaurantSearch] = useState<string | null>(null);
  const filterTypeRef = useRef<HTMLSelectElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [createDialog, setCreateDialog] = useState<boolean>(false);
  const restaurantListHook = useGetRestaurants();

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setRestaurantSearch(searchTerm);
    }, 1000);
  };

  if (restaurantListHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت لیست رستوران با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }

  let restaurants: IRestaurant[] = [];
  if (restaurantListHook.data?.length) {
    restaurants = restaurantListHook.data;
  }

  if (restaurantSearch && restaurantSearch.length) {
    restaurants = restaurants.filter((rest) => {
      return rest.name?.toLocaleLowerCase().includes(restaurantSearch);
    });
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" justifyContent="space-between" width="100%" marginBottom="15px">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="primary" href="/service-reports">
              گزارشات سرویس ها
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
            گروه سرویس جدید
          </Button>
        </Box>
        <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <ReportTable rows={restaurants} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {createDialog ? <CreateRestaurant handleClose={() => setCreateDialog(false)} /> : null}
    </>
  );
};

export default Index;
