import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Chip,
} from '@material-ui/core';
import Spinner from 'Spinner';
import useCreateServiceGroup from 'Hooks/serviceGroups/useCreateServiceGroup';
import useGetServiceGroupCategories from '../../../Hooks/UserGroups/useGetServiceGroupCategories';
import Empty from '../../../Extra/Empty';
import { useStyles } from '../Styles';
import { IServiceGroupCategory } from '../../../Interfaces/ServiceGroupCategory.inteface';

interface IProps {
  handleClose: () => void;
}

enum EError {
  NAME = 'NAME',
  DNAME = 'DNAME',
  DESCRIPTION = 'DESCRIPTION',
  LOGO = 'LOGO',
  CATEGORY = 'CATEGORY',
}
const CreateServiceGroup = (props: IProps) => {
  const { handleClose } = props;
  const createServiceGroupHook = useCreateServiceGroup();
  const getServiceGroupCategoriesHook = useGetServiceGroupCategories();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();
  let serviceGroupCategories: IServiceGroupCategory[] = [];

  const nameRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const initialTagsValue: string[] = [];
  const [tags, setTags] = React.useState(initialTagsValue);

  const handleDeleteTags = (tagToDelete: string) => () => {
    if (tags !== null && tags.length !== 0) {
      setTags((chips) => chips.filter((chip) => chip !== tagToDelete));
    }
  };

  const addTag = () => () => {
    if (tagRef.current?.value) {
      setTags([...tags, (tagRef.current?.value as unknown) as string]);
      tagRef.current.value = '';
    }
  };

  const createGroup = () => {
    const name = nameRef.current?.value;
    const faDisplayName = displayNameRef.current?.value;
    const faDescription = descriptionRef.current?.value;
    const logo = logoRef.current?.value;
    // let tags = [''];
    // if (tagRef.current?.value) {
    //   if (tags[0] === '') tags[0] = tagRef.current?.value;
    // }
    const categoryId = categoryRef.current?.value;
    if (!name || name.trim() === '' || name.length < 2) {
      setError(EError.NAME);
      return;
    }
    if (!faDisplayName || faDisplayName.trim() === '') {
      setError(EError.DNAME);
      return;
    }
    if (!faDescription || faDescription.trim() === '') {
      setError(EError.DESCRIPTION);
      return;
    }
    if (!logo || logo.trim() === '') {
      setError(EError.LOGO);
      return;
    }
    if (!categoryId) {
      setError(EError.CATEGORY);
      return;
    }
    setError(null);
    createServiceGroupHook.mutate({
      name,
      faDisplayName,
      faDescription,
      categoryId,
      logo,
      tags,
      callBack: handleClose,
    });
    if (getServiceGroupCategoriesHook.isError) {
      return (
        <Grid lg={12} xs={12} item>
          <Paper elevation={0} className={classes.paper}>
            <Box minHeight="calc(100vh - 245px)" position="relative" height="450px">
              <Empty message="دریافت دسته های گروه های سرویس با خطا مواجه شد!" />
            </Box>
          </Paper>
        </Grid>
      );
    }
  };

  if (getServiceGroupCategoriesHook.data?.length) {
    serviceGroupCategories = getServiceGroupCategoriesHook.data;
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>گروه سرویس جدید</DialogTitle>
      <DialogContent>
        <Typography component="label">نام گروه* (نام گروه سرویس یکتا و ترکیبی از کاراکترلاتین و اعداد است)</Typography>
        <TextField
          helperText={error === EError.NAME ? 'نام گروه را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          inputRef={nameRef}
        />
        <Typography component="label">عنوان فارسی گروه*</Typography>
        <TextField
          helperText={error === EError.DNAME ? 'عنوان گروه را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={displayNameRef}
        />
        <Typography component="label">توضیحات*</Typography>
        <TextField
          helperText={error === EError.DESCRIPTION ? 'توضیحات را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={descriptionRef}
        />
        <Typography component="label">لوگو* (آدرس تصویر)</Typography>
        <TextField
          helperText={error === EError.LOGO ? 'آدرس لوگو را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={logoRef}
        />
        <Typography component="label">تگ (برای جستجوی کاربران در پنل بازارچه استفاده می شود)</Typography>
        <Box className={classes.tagInputBox}>
          <TextField variant="outlined" placeholder="" fullWidth style={{ marginBottom: '0' }} inputRef={tagRef} />
          <Button variant="outlined" color="primary" style={{ marginRight: '4px' }} onClick={addTag()}>
            +
          </Button>
        </Box>
        {tags[0] !== '' ? (
          <ul className={classes.tagsList}>
            {tags.map((data) => {
              return (
                <li key={data}>
                  <Chip label={data} color="primary" variant="outlined" onDelete={handleDeleteTags(data)} />
                </li>
              );
            })}
          </ul>
        ) : (
          <Box className={classes.tagsList}></Box>
        )}
        <Typography component="label">*دسته بندی</Typography>
        <Select inputRef={categoryRef} defaultValue={1} style={{ width: '100%', marginBottom: '15px' }}>
          {serviceGroupCategories.map((cat) => {
            return (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.faDisplayName}
              </MenuItem>
            );
          })}
        </Select>
      </DialogContent>
      <DialogActions>
        {createServiceGroupHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={createServiceGroupHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => createGroup()} disabled={createServiceGroupHook.isLoading}>
            ایجاد
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateServiceGroup;
