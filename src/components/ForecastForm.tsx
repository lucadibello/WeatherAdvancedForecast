import React from 'react'
import { Box, IconButton, TextField } from '@mui/material';
import NearbyCity from '../models/NearbyCity';

import {
  Search as SearchIcon
} from '@mui/icons-material'

interface IForecastFormProps {
  city: NearbyCity | null
  onSearch?(): void
}

export default function ForecastForm(props: IForecastFormProps) {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <TextField
        label="City"
        variant="standard"
        value={props.city?.name || ""}
        sx={{
          mt: "30px",
          mb: "30px"
        }}
      />
      <IconButton onClick={props.onSearch}>
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}