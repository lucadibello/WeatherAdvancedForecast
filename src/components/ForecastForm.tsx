import React from 'react'
import { Box, IconButton, TextField } from '@mui/material';
import NearbyCity from '../models/NearbyCity';

import {
  Search as SearchIcon
} from '@mui/icons-material'

interface IForecastFormProps {
  city: NearbyCity | null
  onSearch(city: string): void
}

export default function ForecastForm(props: IForecastFormProps) {
  const [location, setLocation] = React.useState<string>("");

  React.useEffect(() => {
    setLocation(props.city != null ? props.city.name : "")
  },[props.city])

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <TextField
        label="City"
        variant="standard"
        value={location}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setLocation(event.target.value);
        }}
        sx={{
          mt: "30px",
          mb: "30px"
        }}
      />
      <IconButton onClick={() => props.onSearch(location)}>
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}