import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import { toast } from 'react-toastify';
import { IServiceGroup } from '../../../Interfaces/ServiceGroup.interface';
import useEditServiceGroup from '../../../Hooks/serviceGroups/useEditServiceGroup';
import useGetServiceGroupCategories from '../../../Hooks/UserGroups/useGetServiceGroupCategories';
import { IServiceGroupCategory } from '../../../Interfaces/ServiceGroupCategory.inteface';

interface IProps {
  handleClose: () => void;
  serviceGroup: IServiceGroup;
}

enum EError {
  TITLE = 'TITLE',
}
const EditServiceGroup = (props: IProps) => {
  const { handleClose, serviceGroup } = props;
  const editServiceGroupHook = useEditServiceGroup();
  const getServiceGroupCategoriesHook = useGetServiceGroupCategories();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();
  const initialTagsValue: string[] = serviceGroup.tags;
  const [tags, setTags] = React.useState(initialTagsValue);

  const nameRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  let serviceGroupCategories: IServiceGroupCategory[] = [];

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

  const editGroup = () => {
    const name = nameRef.current?.value;
    const faDisplayName = displayNameRef.current?.value;
    const faDescription = descriptionRef.current?.value;
    const logo = logoRef.current?.value;
    const categoryId = categoryRef.current?.value;
    const serviceGroupId = serviceGroup.id;
    if (
      !name ||
      name.trim() === '' ||
      name.length < 2 ||
      !faDisplayName ||
      faDisplayName.trim() === '' ||
      !faDescription ||
      faDescription.trim() === '' ||
      !logo ||
      logo.trim() === '' ||
      !categoryId
    ) {
      setError(EError.TITLE);
      return;
    }
    if (
      serviceGroup.name === nameRef.current?.value &&
      serviceGroup.faDisplayName === displayNameRef.current?.value &&
      serviceGroup.faDescription === descriptionRef.current?.value &&
      serviceGroup.logo === logoRef.current?.value &&
      serviceGroup.categoryId === ((categoryRef.current?.value as unknown) as number) &&
      serviceGroup.tags === tags
    ) {
      toast.error(`هیچ تغییری یافت نشد.`);
      return;
    }
    setError(null);
    editServiceGroupHook.mutate({
      serviceGroupId,
      name,
      faDisplayName,
      faDescription,
      logo,
      tags,
      categoryId,
      callBack: handleClose,
    });
  };

  if (getServiceGroupCategoriesHook.data?.length) {
    serviceGroupCategories = getServiceGroupCategoriesHook.data;
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>ویرایش گروه سرویس</DialogTitle>
      <DialogContent>
        <Typography component="label">نام گروه*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'نام گروه را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          inputRef={nameRef}
          defaultValue={serviceGroup.name}
        />
        <Typography component="label">عنوان گروه*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'عنوان گروه را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={displayNameRef}
          defaultValue={serviceGroup.faDisplayName}
        />
        <Typography component="label">توضیحات*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'توضیحات را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={descriptionRef}
          defaultValue={serviceGroup.faDescription}
        />
        <Typography component="label">لوگو*</Typography>
        <TextField
          helperText={error === EError.TITLE ? 'آدرس لوگو را وارد کنید' : ' '}
          variant="outlined"
          placeholder=""
          fullWidth
          style={{ marginBottom: '15px' }}
          inputRef={logoRef}
          defaultValue={serviceGroup.logo}
        />
        <Typography component="label">تگ ها</Typography>
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
        <Select inputRef={categoryRef} defaultValue={serviceGroup.categoryId} style={{ width: '100%', marginBottom: '15px' }}>
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
        {editServiceGroupHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={editServiceGroupHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => editGroup()} disabled={editServiceGroupHook.isLoading}>
            ثبت تغییرات
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditServiceGroup;
