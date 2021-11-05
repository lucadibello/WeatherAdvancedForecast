import React from 'react'
import { Box, IconButton, TextField } from '@mui/material';
import NearbyCity from '../models/NearbyCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import {
  Search as SearchIcon
} from '@mui/icons-material'
import { isPropertySignature, updatePropertySignature } from 'typescript';
import { LoadingButton } from '@mui/lab';

interface IForecastFormProps {
  city: NearbyCity | null
  actualLocation: NearbyCity | null
  loading: boolean
  onSearch(city: string): void
  onFetch(): void
}

interface LocationManager {
  isLocationOn: boolean
}

function LocationIcon(props: LocationManager){
  
  if (props.isLocationOn) {
    return(
      <div style={{marginRight: 10, marginTop: 15}}>
        <LocationOnIcon style={{color: "red"}}></LocationOnIcon>
      </div>
    );
  } else {
    return(
      <div>
      <div style={{marginRight: 10, marginTop: 15}}>
        <LocationOnOutlinedIcon style={{color: "gray"}}></LocationOnOutlinedIcon>
      </div>
      </div>
    );
  }
};

export default function ForecastForm(props: IForecastFormProps) {
  const [location, setLocation] = React.useState<string>("");
  const [actualLocation, setActualLocation] = React.useState<string>("");

  React.useEffect(() => {
    setLocation(props.city != null ? props.city.name : "")
    setActualLocation(props.actualLocation != null ? props.actualLocation.name : "")
  },[props.city])

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
        <LoadingButton
                color={location==null ? "error" : "info"}
                onClick={() => props.onFetch()}
                loading={props.loading}
                loadingPosition="end"
                endIcon={<LocationIcon isLocationOn={actualLocation == location}/>}
              >{actualLocation == null ? "" : ""}</LoadingButton>
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