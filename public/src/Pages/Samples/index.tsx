import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { SearchIcon } from 'Assets/Svg';
import React from 'react';

const Index = () => {
  const [open, setOpen] = React.useState(false);

  const [age, setAge] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  return (
    <div style={{ background: '#f4f4f4', padding: '25px' }}>
      <h1>Button</h1>
      <h3>contained</h3>
      <Button variant="contained">Default</Button>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" color="primary" href="#contained-buttons">
        Link
      </Button>
      <h3>outlined</h3>
      <Button variant="outlined">Default</Button>
      <Button variant="outlined" color="primary">
        Primary
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary
      </Button>
      <Button variant="outlined" disabled>
        Disabled
      </Button>
      <Button variant="outlined" color="primary" href="#outlined-buttons">
        Link
      </Button>
      <h1>select box</h1>
      <div style={{ marginRight: '10px', padding: '15px', background: '#5374a9' }}>
        <Select value={age} onChange={handleChange}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </div>
      <h1>Form</h1>
      <h3>Text</h3>
      <form noValidate autoComplete="off" style={{ maxWidth: '450px' }}>
        <TextField defaultValue="مقدار اولیه" helperText="نمایش پیغام خطا" variant="outlined" placeholder="متن پیشفرض" fullWidth />
        <TextField
          defaultValue="مقدار اولیه"
          helperText="نمایش پیغام خطا"
          variant="outlined"
          placeholder="جستجو در لیست دسته‌بندی ‌ها"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <h3>TextArea</h3>
        <TextField
          multiline
          rows={4}
          defaultValue="مقدار اولیه"
          helperText="نمایش پیغام خطا"
          placeholder="متن پیشفرض"
          variant="outlined"
          fullWidth
        />
      </form>

      <h1>Dialog</h1>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        open Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ساخت مخزن</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField defaultValue="مقدار اولیه" helperText="نمایش پیغام خطا" variant="outlined" placeholder="متن پیشفرض" fullWidth />
            <TextField multiline rows={4} defaultValue="مقدار اولیه" helperText="نمایش پیغام خطا" variant="outlined" fullWidth />
          </form>
        </DialogContent>
        <DialogActions>
          <Box minWidth="100px">
            <Button fullWidth color="primary" onClick={handleClose}>
              انصراف
            </Button>
          </Box>
          <Box minWidth="100px">
            <Button fullWidth variant="contained" color="primary" onClick={handleClose}>
              ایجاد
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Index;
