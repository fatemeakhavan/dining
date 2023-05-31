import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, makeStyles } from '@material-ui/core';
import { IServiceQuota } from '../../../Interfaces/ServiceQuota.interface';
import IconButton from '@material-ui/core/IconButton';
import { EditIcon } from '../../../Assets/Svg';
import EditServiceDefaultQuota from './EditServiceDefaultQuota';

interface IProps {
  defaultServiceQuota: IServiceQuota;
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const DefaultQuotaTable: React.FunctionComponent<IProps> = (props) => {
  const { defaultServiceQuota } = props;
  const [editServiceDefaultQuota, setEditServiceDefaultQuota] = useState<IServiceQuota | null>(null);
  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">نام</TableCell>
              <TableCell align="left">عنوان</TableCell>
              <TableCell align="left">حداکثر پردازنده</TableCell>
              <TableCell align="left">حداکثر حافظه</TableCell>
              <TableCell align="left">حداکثر دیسک</TableCell>
              <TableCell align="left">توضیحات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="hover">
              <TableCell align="left">
                <Box display="flex" alignItems="center">
                  {defaultServiceQuota.name}
                </Box>
              </TableCell>
              <TableCell align="left">
                <Box display="flex" alignItems="center">
                  {defaultServiceQuota.displayName}
                </Box>
              </TableCell>
              <TableCell align="left">
                <Box display="flex" alignItems="center">
                  {defaultServiceQuota.maxCpu}
                </Box>
              </TableCell>
              <TableCell align="left">
                <Box display="flex" alignItems="center">
                  {defaultServiceQuota.maxMemory}
                </Box>
              </TableCell>
              <TableCell align="left">
                <Box display="flex" alignItems="center">
                  {defaultServiceQuota.maxDisk}
                </Box>
              </TableCell>
              <TableCell align="left">
                <Box display="flex" alignItems="center">
                  {defaultServiceQuota.description}
                </Box>
              </TableCell>
              <TableCell>
                <IconButton size="small" title={'ویرایش'} onClick={() => setEditServiceDefaultQuota(defaultServiceQuota)}>
                  <EditIcon viewBox="0 0 1696.162 1696.143" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {editServiceDefaultQuota ? <EditServiceDefaultQuota defaultServiceQuota={editServiceDefaultQuota} handleClose={() => setEditServiceDefaultQuota(null)} /> : null}
    </>
  );
};

export default DefaultQuotaTable;
