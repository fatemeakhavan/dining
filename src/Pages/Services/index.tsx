import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Grid, InputAdornment, Paper, TextField, Breadcrumbs, Link } from '@material-ui/core';
import { useStyles } from './Styles';
import { AddCircleOutline } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import Empty from 'Extra/Empty';
import { SearchIcon } from 'Assets/Svg';
import ServicesTable from './Components/ServicesTable';
import useGetServices from '../../Hooks/Services/useGetServices';
import { IService } from '../../Interfaces/Service.interface';
import CreateService from './Components/CreateService';

let timeout: ReturnType<typeof setTimeout>;
const Index = () => {
  let serviceGroupId = parseInt((window.location.pathname.replace('/service-groups/', '')).replace('services', ''));
  const serviceListHook = useGetServices(serviceGroupId);
  const classes = useStyles();
  const [searchService, setSearchservice] = useState<string | null>(null);
  const [createDialog, setCreateDialog] = useState<boolean>(false);
  const searchInList = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    timeout = setTimeout(() => {
      setSearchservice(searchTerm);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (serviceListHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت سرویس ها با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }

  let services: IService[] = [];
  if (serviceListHook.data as IService[]) {
    services = serviceListHook.data as IService[];
  }
  if (searchService && services) {
    services = services.filter((service) => {
      return service.name.toLocaleLowerCase().includes(searchService);
    });
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" justifyContent="space-between" width="100%" marginBottom="5px">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/service-groups">
              گروه های سرویس
            </Link>
            <Link color="primary">
              سرویس ها
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
            سرویس جدید
          </Button>
        </Box>
        <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {services.length || serviceListHook.isLoading ? (
                <ServicesTable rows={services} />
              ) : (
                <Empty message={searchService ? 'سرویسی پیدا نشد.' : 'هنوز سرویسی اضافه نشده است.'} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {createDialog ? <CreateService handleClose={() => setCreateDialog(false)} /> : null}
    </>
  );
};

export default Index;
