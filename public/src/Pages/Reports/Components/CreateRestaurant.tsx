import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import { IServiceReport } from '../../../Interfaces/ServiceReport.interface';
import useGetRunServiceReports from '../../../Hooks/ServiceReports/useRunServiceReport';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { FaDate, toPersinaDigit } from '../../../Helpers/Utils';
import { TablePaginationActions } from '../../../Extra/TablePaginationActions';
import TableContainer from '@material-ui/core/TableContainer';
import {
  IReportResponseActivityInput,
  IReportResponseActivityOutput,
  IReportResponseResource,
} from '../../../Interfaces/ServiceReportResponse.interface';
import ReportOutputLog from './ReportOutputLog';

interface IProps {
  handleClose: () => void;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

enum EError {
  TITLE = 'TITLE',
}
const CreateRestaurant = (props: IProps) => {
  const { handleClose } = props;
  const [reportOutputLog, setReportOutputLog] = useState<string | null>(null);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  let rows: any[] = [];

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Dialog open={true} onClose={handleClose} maxWidth={'lg'}>
      <DialogContent>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table" style={{ direction: 'rtl', minWidth: 0 }}>
            <TableHead>

            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 && rows ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row, index) =>
                (() => {
                })(),
              )}

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
        {reportOutputLog ? <ReportOutputLog reportOutputLog={reportOutputLog} handleClose={() => setReportOutputLog(null)} /> : null}
      </DialogContent>
      <DialogActions>
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose}>
            انصراف
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRestaurant;
