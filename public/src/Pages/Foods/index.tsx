import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Breadcrumbs, Button, Grid, InputAdornment, Link, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import { useStyles } from './Styles';
import { Box } from '@material-ui/core';
import Empty from '../../Extra/Empty';
import { SearchIcon } from '../../Assets/Svg';
import { AddCircleOutline } from '@material-ui/icons';
import FoodsTable from './Components/FoodsTable';
import { IFood } from '../../Interfaces/Food';
import useGetFoods from '../../Hooks/Food/useGetFoods';
import CreateFood from './Components/CreateFood';

let timeout: ReturnType<typeof setTimeout>;
const Index = () => {
  const classes = useStyles();
  const [foodSearch, setFoodSearch] = useState<string | null>(null);
  const filterTypeRef = useRef<HTMLSelectElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const foodListHook = useGetFoods();
  const [createDialog, setCreateDialog] = useState<boolean>(false);

  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setFoodSearch(searchTerm);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (foodListHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت لیست غذا ها با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }

  let foods: IFood[] = [];
  if (foodListHook.data?.length) {
    foods = foodListHook.data;
  }

  if (foodSearch && foodSearch.length) {
    foods = foods.filter((food) => {
      return food.name?.toLocaleLowerCase().includes(foodSearch);
    });
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" justifyContent="space-between" width="100%" marginBottom="15px">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="primary" href="/foods">
              غذاها
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
            غذای جدید
          </Button>
        </Box>
        <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FoodsTable rows={foods} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {createDialog ? <CreateFood handleClose={() => setCreateDialog(false)} /> : null}
    </>
  );
};

export default Index;
