import { LinearProgress } from '@material-ui/core';
import React from 'react';
import { useIsFetching } from 'react-query';

export default function GlobalLoader() {
  const isFetching = useIsFetching();

  if (!isFetching) {
    return null;
  }
  return (
    <div style={{ position: 'fixed', bottom: '2px', left: 0, width: '100%', height: '2px', zIndex: 10000 }}>
      <LinearProgress />
    </div>
  );
}
