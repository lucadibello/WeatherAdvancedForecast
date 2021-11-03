import React from 'react';

import {
  Typography
} from '@mui/material'

export default function Homepage () {
  return (
    <Typography sx={{
      color: 'black'
    }} variant='h6' component='h1'>
      Ciao! API KEY: {process.env.REACT_APP_OPENWEATHER_TOKEN}
    </Typography>
  );
}