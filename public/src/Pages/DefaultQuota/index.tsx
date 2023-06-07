import React, { useEffect } from 'react';
import { Breadcrumbs, Grid, Link, Paper } from '@material-ui/core';
import { useStyles } from './Styles';
import { Box } from '@material-ui/core';
import Empty from 'Extra/Empty';
import useGetServiceDefaultQuota from '../../Hooks/ServiceDefaultQuota/useGetServiceDefaultQuota';
import DefaultQuotaTable from './Components/ServiceDefaultQuotaTable';
import { IServiceQuota } from '../../Interfaces/ServiceQuota.interface';

let timeout: ReturnType<typeof setTimeout>;
const Index = () => {
  const classes = useStyles();
  const serviceDefaultQuotaHook = useGetServiceDefaultQuota();

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (serviceDefaultQuotaHook.isError) {
    return (
      <Grid lg={12} xs={12} item>
        <Paper elevation={0} className={classes.paper}>
          <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
            <Empty message="دریافت مقادیر پیشفرض سهمیه سرویس با خطا مواجه شد!" />
          </Box>
        </Paper>
      </Grid>
    );
  }

  let serviceDefaultQuota: IServiceQuota = {
    displayName: '',
    description: '',
    id: 1,
    name: '',
    maxCpu: 0,
    maxMemory: 0,
    maxDisk: 0,
    created: '',
    updated: '',
  };
  if (serviceDefaultQuotaHook.data) {
    serviceDefaultQuota = serviceDefaultQuotaHook.data;
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" justifyContent="space-between" width="100%" marginBottom="15px">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="primary" href="/service-default-quota">
              سهمیه پیش فرض
            </Link>
          </Breadcrumbs>
        </Box>
        <Box display="flex" flex="1" position="relative" minHeight="calc(100vh - 410px)">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {serviceDefaultQuota || serviceDefaultQuotaHook.isLoading ? (
                <DefaultQuotaTable defaultServiceQuota={serviceDefaultQuota} />
              ) : (
                <Empty message={'هنوز سهمیه ای اضافه نشده است.'} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default Index;
