import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox, Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import useEditServiceJenkinsAction from '../../../Hooks/ServiceJenkinsActions/useEditServiceJenkinsActions';
import { IService } from '../../../Interfaces/Service.interface';
import { IServiceJenkinsInput } from '../../../Interfaces/ServiceJenkinsInput.interface';
import { IServiceJenkinsOutput } from '../../../Interfaces/ServiceJenkinsOutput.interface';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { TrashIcon } from '../../../Assets/Svg';
import { IServiceJenkinsAction } from '../../../Interfaces/ServiceJenkinsAction.interface';

interface IProps {
  handleClose: () => void;
  service: IService;
  action: IServiceJenkinsAction;
  serviceGroupName: string;
}

enum EError {
  TITLE = 'TITLE',
}
const EditServiceJenkinsAction = (props: IProps) => {
  const { handleClose, service, serviceGroupName, action } = props;
  const editServiceJenkinsActionHook = useEditServiceJenkinsAction();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const actionTypeRef = useRef<HTMLSelectElement>(null);
  const jobNameRef = useRef<HTMLInputElement>(null);
  const jenkinsInputNameRef = useRef<HTMLInputElement>(null);
  const jenkinsInputTitleRef = useRef<HTMLInputElement>(null);
  const jenkinsInputDescriptionRef = useRef<HTMLInputElement>(null);
  const jenkinsInputDefaultValueRef = useRef<HTMLInputElement>(null);
  const jenkinsInputTypeRef = useRef<HTMLSelectElement>(null);
  const jenkinsFaRegexCheckErrorRef = useRef<HTMLSelectElement>(null);
  const jenkinsValueValidationRegexRef = useRef<HTMLSelectElement>(null);
  const jenkinsSequenceNumberRef = useRef<HTMLSelectElement>(null);
  const jenkinsInputValuesRef = useRef<HTMLSelectElement>(null);
  const jenkinsOutputNameRef = useRef<HTMLInputElement>(null);
  const jenkinsOutputTitleRef = useRef<HTMLInputElement>(null);
  const jenkinsOutputDescriptionRef = useRef<HTMLInputElement>(null);
  const jenkinsOutputSequenceNumberRef = useRef<HTMLSelectElement>(null);

  const [userCanModifyChecked, setUserCanModifyChecked] = React.useState(true);
  const [forceChecked, setForceChecked] = React.useState(false);
  const [jenkinsInputs, setJenkinsInput] = React.useState<IServiceJenkinsInput[]>(action.jenkinsInput);
  const [jenkinsOutputs, setJenkinsOutputs] = React.useState<IServiceJenkinsOutput[]>(action.jenkinsOutput);
  const [inputTypeChanged, setInputTypeChanged] = React.useState('VALUES');

  const actionJobName = action.jobName.replace(serviceGroupName + '/' + service.name + '/', '');
  const handleUserCanModifyChange = (event: { target: { checked: React.SetStateAction<boolean> } }) => {
    setUserCanModifyChecked(event.target.checked);
  };
  const handleForceChange = (event: { target: { checked: React.SetStateAction<boolean> } }) => {
    setForceChecked(event.target.checked);
  };
  const handleInputTypeChange = (event: any) => {
    setInputTypeChanged(event.target.value);
  };

  const addJenkinsInput = () => {
    const jenkinsInputName = jenkinsInputNameRef.current?.value;
    const jenkinsInputTitle = jenkinsInputTitleRef.current?.value;
    const jenkinsInputDescription = jenkinsInputDescriptionRef.current?.value;
    const jenkinsInputDefaultValue = jenkinsInputDefaultValueRef.current?.value;
    const jenkinsInputType = jenkinsInputTypeRef.current?.value;
    const jenkinsFaRegexCheckError = jenkinsFaRegexCheckErrorRef.current?.value;
    const jenkinsValueValidationRegex = jenkinsValueValidationRegexRef.current?.value;
    const jenkinsSequenceNumber = (jenkinsSequenceNumberRef.current?.value as unknown) as number;
    const jenkinsInputValues = jenkinsInputValuesRef.current?.value.split(',');
    const jenkinsInputObj = {
      name: jenkinsInputName as string,
      faDisplayName: jenkinsInputTitle as string,
      faDescription: jenkinsInputDescription as string,
      defaultValue: jenkinsInputDefaultValue as string,
      faRegexCheckError: jenkinsFaRegexCheckError as string,
      valueValidationRegex: jenkinsValueValidationRegex as string,
      inputType: jenkinsInputType as 'VALUES' | 'STRING' | 'NUMBER' | 'BOOLEAN' | 'PASSWORD' | 'EMAIL',
      inputValues: jenkinsInputValues?.length === 1 && jenkinsInputValues[0] === '' ? [] : (jenkinsInputValues as string[]),
      userCanModify: userCanModifyChecked as boolean,
      sequenceNumber: jenkinsSequenceNumber as number,
      force: forceChecked as boolean,
    };
    setJenkinsInput((state) => {
      return state.concat(jenkinsInputObj);
    });
    if (
      jenkinsInputNameRef.current?.value &&
      jenkinsInputTitleRef.current?.value &&
      jenkinsInputDescriptionRef.current?.value &&
      jenkinsInputDefaultValueRef.current?.value &&
      jenkinsFaRegexCheckErrorRef.current?.value &&
      jenkinsValueValidationRegexRef.current?.value &&
      jenkinsInputTypeRef.current?.value &&
      jenkinsInputValuesRef.current?.value &&
      jenkinsSequenceNumberRef.current?.value
    ) {
      jenkinsInputNameRef.current.value = '';
      jenkinsInputTitleRef.current.value = '';
      jenkinsInputDescriptionRef.current.value = '';
      jenkinsInputDefaultValueRef.current.value = '';
      jenkinsFaRegexCheckErrorRef.current.value = '';
      jenkinsValueValidationRegexRef.current.value = '';
      jenkinsInputTypeRef.current.value = '';
      jenkinsInputValuesRef.current.value = '';
      jenkinsSequenceNumberRef.current.value = '';
    }
  };

  const addJenkinsOutput = () => {
    const jenkinsOutputName = jenkinsOutputNameRef.current?.value;
    const jenkinsOutputTitle = jenkinsOutputTitleRef.current?.value;
    const jenkinsOutputDescription = jenkinsOutputDescriptionRef.current?.value;
    const jenkinsOutputSequenceNumber = (jenkinsOutputSequenceNumberRef.current?.value as unknown) as number;

    const jenkinsOutputObj = {
      name: jenkinsOutputName as string,
      faDisplayName: jenkinsOutputTitle as string,
      faDescription: jenkinsOutputDescription as string,
      sequenceNumber: jenkinsOutputSequenceNumber as number,
    };
    setJenkinsOutputs((state) => {
      return state.concat(jenkinsOutputObj);
    });
  };

  const deleteJenkinsInput = (i: number) => {
    setJenkinsInput((state) => {
      return state.filter((item, j) => i !== j);
    });
  };
  const deleteJenkinsOutput = (i: number) => {
    setJenkinsOutputs((state) => {
      return state.filter((item, j) => i !== j);
    });
  };

  const editAction = () => {
    const actionId = action.id;
    const serviceId = service.id;
    const name = nameRef.current?.value;
    const faDisplayName = titleRef.current?.value;
    const faDescription = descriptionRef.current?.value;
    const actionType = (actionTypeRef.current?.value as unknown) as string;
    const jobName = serviceGroupName + '/' + service.name + '/' + jobNameRef.current?.value;
    const jenkinsInput = jenkinsInputs;
    const jenkinsOutput = jenkinsOutputs;

    if (
      !name ||
      name.trim() === '' ||
      name.length < 2 ||
      !faDisplayName ||
      faDisplayName.trim() === '' ||
      !jobName ||
      jobName.trim() === ''
    ) {
      setError(EError.TITLE);
      return;
    }
    setError(null);
    editServiceJenkinsActionHook.mutate({
      serviceId,
      actionId,
      name,
      faDisplayName,
      faDescription,
      jobName,
      actionType,
      jenkinsInput,
      jenkinsOutput,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth={'md'}>
      <DialogTitle>ویرایش اکشن</DialogTitle>
      <DialogContent>
        <Typography component="label"> (می تواند ترکیبی از حروف لاتین و اعداد باشد) نام اکشن*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'نام اکشن را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          defaultValue={action.name}
          inputRef={nameRef}
        />
        <Typography component="label">عنوان اکشن*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'عنوان اکشن را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          defaultValue={action.faDisplayName}
          inputRef={titleRef}
        />
        <Typography component="label">توضیحات</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          defaultValue={action.faDescription}
          inputRef={descriptionRef}
        />
        <Typography component="label" style={{ display: 'flex' }}>نام جاب*</Typography>
        <TextField
          className={classes.createGroupInput}
          helperText={error === EError.TITLE ? 'نام جاب را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={jobNameRef}
          defaultValue={actionJobName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {serviceGroupName}/{service?.name}/
              </InputAdornment>
            ),
          }}
        />
        <Typography component="label" style={{ display: 'flex' }}>نوع اکشن*</Typography>
        <Select inputRef={actionTypeRef} defaultValue={action.actionType} style={{ width: '100%', marginBottom: '15px' }}>
          <MenuItem key={1} value={'UNMANAGED_SETUP'}>
            UNMANAGED_SETUP
          </MenuItem>
          <MenuItem key={2} value={'SHARED_SETUP'}>
            SHARED_SETUP
          </MenuItem>
          <MenuItem key={3} value={'SHARED_STOP'}>
            SHARED_STOP
          </MenuItem>
          <MenuItem key={4} value={'SHARED_REMOVE'}>
            SHARED_REMOVE
          </MenuItem>
          <MenuItem key={5} value={'SHARED_START'}>
            SHARED_START
          </MenuItem>
          <MenuItem key={6} value={'MANAGED_SETUP'}>
            MANAGED_SETUP
          </MenuItem>
        </Select>
        <Typography component="label">ورودی های جنکینز</Typography>
        <TableContainer style={{ marginBottom: '16px' }}>
          <Typography component="label"> (این نام باید دقیقا مطابق با ورودی جاب جنکینز باشد) نام*</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'نام ورودی جنکینز را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsInputNameRef}
          />
          <Typography component="label">عنوان*</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'عنوان فارسی را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsInputTitleRef}
          />
          <Typography component="label">توضیحات*</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'توضیحات ورودی جنکینز را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsInputDescriptionRef}
          />
          <Typography component="label">مقدار پیش فرض</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'مقدار پیش فرض ورودی جنکینز را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsInputDefaultValueRef}
          />
          <Typography component="label">رجکس چک کردن خطا</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'رجکس چک کردن خطا را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsValueValidationRegexRef}
          />
          <Typography component="label">(درصورتی که کاربر رجکس ورودی را رعایت نکند، این متن به عنوان دلیل خطا نمایش داده می شود) رجکس اعتبارسنجی</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'رجکس اعتبارسنجی را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsFaRegexCheckErrorRef}
          />
          <Typography component="label" style={{ display: 'flex' }}>نوع ورودی*</Typography>
          <Select inputRef={jenkinsInputTypeRef} defaultValue={'VALUES'} onChange={handleInputTypeChange} style={{ width: '100%', marginBottom: '15px' }}>
            <MenuItem key={1} value={'VALUES'}>
              VALUES
            </MenuItem>
            <MenuItem key={2} value={'STRING'}>
              STRING
            </MenuItem>
            <MenuItem key={3} value={'NUMBER'}>
              NUMBER
            </MenuItem>
            <MenuItem key={4} value={'BOOLEAN'}>
              BOOLEAN
            </MenuItem>
            <MenuItem key={5} value={'PASSWORD'}>
              PASSWORD
            </MenuItem>
            <MenuItem key={5} value={'EMAIL'}>
              EMAIL
            </MenuItem>
          </Select>
          {inputTypeChanged === 'VALUES' ? (
            <Container style={{ padding: 0 }}>
              <Typography component="label">مقادیر ورودی</Typography>
              <TextField
                helperText={error === EError.TITLE ? 'مقدار ورودی جنکینز را وارد کنید' : ' '}
                variant="outlined"
                placeholder=""
                fullWidth
                style={{ marginBottom: '15px' }}
                inputRef={jenkinsInputValuesRef}
              />
            </Container>
          ) : null}
          <Typography component="label">شماره ترتیبی</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'مقدار شماره ترتیبی را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsSequenceNumberRef}
          />
          <Box minWidth="100px">
            <Typography component="label" style={{ marginLeft: '15px' }}>
              قابل ویرایش توسط کاربر
            </Typography>
            <Checkbox checked={userCanModifyChecked} onChange={handleUserCanModifyChange} color={'primary'} />
          </Box>
          <Box minWidth="100px">
            <Typography component="label" style={{ marginLeft: '15px' }}>
              پارامتر اجباری است؟
            </Typography>
            <Checkbox checked={forceChecked} onChange={handleForceChange} color={'primary'} />
          </Box>
          <Box minWidth="100px">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => addJenkinsInput()}
              disabled={editServiceJenkinsActionHook.isLoading}
            >
              افزودن ورودی جنکینز
            </Button>
          </Box>
          <Box className={classes.inputCards}>
            {jenkinsInputs.map((inp, index) => {
              return (
                <Card style={{ maxWidth: 345 }} key={index}>
                  <CardHeader title={`JenkinsInput#${index + 1}`} />
                  <CardContent style={{ direction: 'rtl' }}>
                    <Typography variant="body2">نام: {inp.name}</Typography>
                    <Typography variant="body2">عنوان: {inp.faDisplayName}</Typography>
                    <Typography variant="body2">توضیحات: {inp.faDescription}</Typography>
                    <Typography variant="body2">مقدار پیش فرض: {inp.defaultValue}</Typography>
                    <Typography variant="body2">نوع ورودی: {inp.inputType}</Typography>
                    <Typography variant="body2">مقادیر ورودی: {inp.inputValues?.join(',')}</Typography>
                    <Typography variant="body2"> رجکس اعتبارسنجی: {inp.faRegexCheckError}</Typography>
                    <Typography variant="body2">رجکس چک کردن خطا: {inp.valueValidationRegex}</Typography>
                    <Typography variant="body2">شماره ترتیبی: {inp.sequenceNumber}</Typography>
                    <Typography variant="body2">پارامتر اجباری است؟: {inp.force.toString()}</Typography>
                    <Typography variant="body2">قابل ویرایش توسط کاربر: {inp.userCanModify.toString()}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="delete" onClick={() => deleteJenkinsInput(index)}>
                      <TrashIcon style={{ fontSize: '17px' }} />
                    </IconButton>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        </TableContainer>
        <Typography component="label">خروجی های جنکینز</Typography>
        <TableContainer>
          <Typography component="label">نام*</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'نام خروجی جنکینز را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsOutputNameRef}
          />
          <Typography component="label">عنوان*</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'عنوان فارسی را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsOutputTitleRef}
          />
          <Typography component="label">توضیحات</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'توضیحات خروجی جنکینز را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsOutputDescriptionRef}
          />
          <Typography component="label">شماره ترتیبی</Typography>
          <TextField
            helperText={error === EError.TITLE ? 'مقدار شماره ترتیبی را وارد کنید' : ' '}
            variant="outlined"
            placeholder=""
            fullWidth
            style={{ marginBottom: '15px' }}
            inputRef={jenkinsOutputSequenceNumberRef}
          />
          <Box minWidth="100px">
            <Button variant="outlined" color="primary" onClick={() => addJenkinsOutput()}>
              افزودن خروجی جنکینز
            </Button>
          </Box>
          <Box className={classes.inputCards}>
            {jenkinsOutputs.map((otp, index) => {
              return (
                <Card style={{ maxWidth: 345 }} key={index}>
                  <CardHeader title={`JenkinsOutput#${index + 1}`} />
                  <CardContent style={{ direction: 'rtl' }}>
                    <Typography variant="body2">نام: {otp.name}</Typography>
                    <Typography variant="body2">عنوان: {otp.faDisplayName}</Typography>
                    <Typography variant="body2">توضیحات: {otp.faDescription}</Typography>
                    <Typography variant="body2">شماره ترتیبی: {otp.sequenceNumber}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="delete" onClick={() => deleteJenkinsOutput(index)}>
                      <TrashIcon style={{ fontSize: '17px' }} />
                    </IconButton>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        {editServiceJenkinsActionHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={editServiceJenkinsActionHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => editAction()}
            disabled={editServiceJenkinsActionHook.isLoading}
          >
            ثبت تغییرات
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditServiceJenkinsAction;
