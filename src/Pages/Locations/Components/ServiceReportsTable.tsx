import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, makeStyles, TableFooter, TablePagination } from '@material-ui/core';
import { TablePaginationActions } from 'Extra/TablePaginationActions';
import { IServiceReport } from '../../../Interfaces/ServiceReport.interface';
import { toPersinaDigit } from '../../../Helpers/Utils';
import { ILocation } from '../../../Interfaces/Location.interface';
import DeleteLocation from "./DeleteLocation";
import IconButton from "@material-ui/core/IconButton";
import { EditIcon, TrashIcon, UsersIcon } from "../../../Assets/Svg";

interface IProps {
  rows: ILocation[];
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const ReportTable: React.FunctionComponent<IProps> = (props) => {
  const classes = useStyles();
  const { rows } = props;
  const [runServiceReport, setRunServiceReport] = useState<IServiceReport | null>(null);
  const [deleteLocation, setDeleteLocation] = useState<ILocation | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="left">نام</TableCell>
              <TableCell align="left">آدرس</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) => (
              <TableRow key={index} className="hover">
                <TableCell align="left" style={{ width: 50 }}>
                  {toPersinaDigit(index + 1 + page * rowsPerPage)}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.name}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {row.address}
                  </Box>
                </TableCell>
                <TableCell style={{ width: 200 }} align="left">
                  <IconButton size="small" title={'حذف'} onClick={() => setDeleteLocation(row)}>
                    <TrashIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 55 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {/*{runServiceReport ? <RunServiceReport serviceReport={runServiceReport} handleClose={() => setRunServiceReport(null)} /> : null}*/}
      {deleteLocation ? <DeleteLocation location={deleteLocation} handleClose={() => setDeleteLocation(null)} /> : null}
    </>
  );
};

export default ReportTable;
