import { Box, IconButton, makeStyles, useTheme } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { toPersinaDigit } from 'Helpers/Utils';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const paginationStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
  },
  icon: {
    fontSize: 14,
    color: theme.palette.primary.main,
    padding: 0,
    width: 25,
    height: 25,
    borderRadius: 4,
  },
  active: {
    color: '#FFF',
    backgroundColor: '#c9dce4 !important',
  },
}));

export const TablePaginationActions = (props: any) => {
  const [startPage, setStartPage] = useState(0);
  const classes = paginationStyle();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (event: any) => {
    updateStartPage(page - 1);
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    updateStartPage(page + 1);
    onChangePage(event, page + 1);
  };

  const updateStartPage = (pageNumber: number) => {
    setStartPage(Math.floor((pageNumber + 1) / rowsPerPage) * (rowsPerPage - 1));
  };

  const handleChangePage = (event: any, pageINdex: number) => {
    onChangePage(event, pageINdex);
  };

  return (
    <div className={classes.root}>
      <IconButton className={classes.icon} onClick={handleBackButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <Box display="inline-block" minWidth="100px" textAlign="center">
        {Array.from(
          Array(
            startPage * rowsPerPage + rowsPerPage >= count ? 1 : Math.floor(count / rowsPerPage) + (count % rowsPerPage === 0 ? 0 : 1),
          ).keys(),
        ).map((item, index) => {
          return (
            <IconButton
              onClick={(event) => handleChangePage(event, index)}
              className={`${classes.icon} ${index + startPage === page ? classes.active : null}`}
              key={index}
            >
              {toPersinaDigit(index + 1 + startPage)}
            </IconButton>
          );
        })}
      </Box>
      <IconButton className={classes.icon} onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
