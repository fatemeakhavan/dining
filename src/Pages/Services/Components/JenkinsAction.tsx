import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableHead,
  Typography,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { IServiceJenkinsAction } from '../../../Interfaces/ServiceJenkinsAction.interface';
import { toPersinaDigit } from '../../../Helpers/Utils';

interface IProps {
  handleClose: () => void;
  action: IServiceJenkinsAction | null;
}

const JenkinsAction = (props: IProps) => {
  const { handleClose, action } = props;
  return (
    <Dialog open={true} onClose={handleClose} maxWidth={'lg'}>
      <DialogTitle>
        <Typography component="p">
        اطلاعات اکشن جنکینز  <b> {action?.name} </b> )
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TableContainer style={{ direction: 'rtl', marginBottom: '10px' }}>
          <Box display="flex" alignItems="center">
            <Typography component="label">
              <b>نام: </b> {action?.name}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography component="label">
              <b>عنوان: </b> {action?.faDisplayName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography component="label">
              <b>توضیحات: </b>{action?.faDescription}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography component="label">
              <b>نوع اکشن: </b>{action?.actionType}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography component="label">
              <b>نام جاب: </b> {action?.jobName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography component="label">
              <b>فعال: </b> {action?.enable === true ? 'بلی' : 'خیر'}
            </Typography>
          </Box>
        </TableContainer>
        {action?.jenkinsInput && action?.jenkinsInput.length !== 0 && (
          <TableContainer style={{ marginBottom: '10px' }}>
            <Typography component="label">اطلاعات ورودی ها</Typography>
            <Table style={{ direction: 'rtl' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ردیف</TableCell>
                  <TableCell align="left">نام</TableCell>
                  <TableCell align="left">عنوان</TableCell>
                  <TableCell align="left">نوع ورودی</TableCell>
                  <TableCell align="left">مقدار پیش فرض</TableCell>
                  <TableCell align="left">رجکس اعتبارسنجی</TableCell>
                  <TableCell align="left">رجکس چک کردن خطا</TableCell>
                  <TableCell align="left">مقادیر ورودی</TableCell>
                  <TableCell align="left">فیلد اجباری</TableCell>
                  <TableCell align="left">قابل ویرایش توسط کاربر</TableCell>
                  <TableCell align="left">توضیحات</TableCell>
                  <TableCell align="left">شماره ترتیبی</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {action?.jenkinsInput.map((inp, index) => (
                  <TableRow key={index} className="hover">
                    <TableCell align="left" style={{ width: 50 }}>
                      <Box display="flex" alignItems="center">
                        {toPersinaDigit(index + 1)}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {inp.name}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {inp.faDisplayName}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {inp.inputType}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {inp.defaultValue}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {inp.faRegexCheckError}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {inp.valueValidationRegex}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      {inp.inputValues.map((val) => (
                        <Box display="flex" alignItems="center">
                          {val}
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {inp.force ? 'بلی' : 'خیر'}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {inp.userCanModify ? 'بلی' : 'خیر'}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {inp.faDescription}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {inp.sequenceNumber}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {action?.jenkinsOutput && action?.jenkinsOutput.length !== 0 && (
          <TableContainer>
            <Typography component="label">اطلاعات خروجی ها</Typography>
            <Table style={{ direction: 'rtl' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ردیف</TableCell>
                  <TableCell align="left">نام</TableCell>
                  <TableCell align="left">عنوان</TableCell>
                  <TableCell align="left">توضیحات</TableCell>
                  <TableCell align="left">شماره ترتیبی</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {action?.jenkinsOutput.map((otp, index) => (
                  <TableRow key={index} className="hover">
                    <TableCell align="left" style={{ width: 50 }}>
                      <Box display="flex" alignItems="center">
                        {toPersinaDigit(index + 1)}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {otp.name}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {otp.faDisplayName}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {otp.faDescription}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" alignItems="center">
                        {otp.sequenceNumber}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose}>
            بستن
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default JenkinsAction;
