import React, { useEffect, useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { DayValue, utils } from 'react-modern-calendar-datepicker';
import { TextField } from '@material-ui/core';
import { toPersinaDigit } from './../Helpers/Utils';
import moment from 'moment-jalaali';

declare interface IProps {
  onChange: (date: DayValue | number) => void;
  value?: DayValue;
  placeHolder: string;
  timestampDate?: boolean;
}

const DatePickerField = (props: IProps) => {
  const { onChange, value, placeHolder, timestampDate } = props;

  const [selectedDay, setSelectedDay] = useState<DayValue>(null);
  const [focuse, setFocuse] = useState<boolean>(false);

  const onChangeDate = (value: DayValue) => {
    setSelectedDay(value);

    if (timestampDate && value?.year && value.month && value.day) {
      const date = moment(`${value.year}/${value.month}/${value.day}`, 'jYYYY/jMM/jDD').format('YYYY/MM/DD');
      const newDate = new Date(date);
      onChange(newDate.getTime());
    } else {
      onChange(value);
    }
  };

  useEffect(() => {
    if (value) {
      const date = moment(`${value.year}/${value.month}/${value.day}`, 'YYYY/MM/DD').format('jYYYY/jMM/jDD');
      const arrayDate = date.split('/');
      setSelectedDay({
        year: parseInt(arrayDate[0]),
        month: parseInt(arrayDate[1]),
        day: parseInt(arrayDate[2]),
      });
    }
  }, [value]);

  const renderCustomInput = ({ ref }: any) => (
    <TextField
      fullWidth
      value={
        selectedDay ? `${toPersinaDigit(selectedDay.year)}/${toPersinaDigit(selectedDay.month)}/${toPersinaDigit(selectedDay.day)}` : ''
      }
      variant="outlined"
      id="startDate"
      inputRef={ref}
      placeholder={placeHolder}
      onFocus={() => setFocuse(true)}
      onBlur={() => setFocuse(false)}
    />
  );

  return (
    <DatePicker
      inputPlaceholder={placeHolder}
      value={selectedDay}
      wrapperClassName={`date-picker-wrapper ${focuse ? 'focuse' : ''}`}
      onChange={onChangeDate}
      renderInput={renderCustomInput} // render a custom input
      shouldHighlightWeekends
      locale={'fa'}
    />
  );
};

export default DatePickerField;
