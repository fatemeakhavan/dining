import React, { useEffect } from "react";
import { Box } from '@material-ui/core';
import { IDate } from '../../../Interfaces/Date.interface';
import useGetReservedReport from '../../../Hooks/ReservedReport/useGetReservedReport';

interface IProps {
  date: IDate;
  mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';
}

const WeekReportCount = (props: IProps) => {
  const { date, mealType } = props;
  const reportListHook = useGetReservedReport(date.id, mealType);

  let weekReservedCount: number = 0;
  if (reportListHook?.data) {
    weekReservedCount = reportListHook?.data.length;
  }

  useEffect(() => {
    reportListHook.refetch();
  }, [mealType]);

  return <Box>{weekReservedCount}</Box>;
};

export default WeekReportCount;
