import React from 'react';
import './App.css';
import Homepage from './components/Homepage';
import { SnackbarProvider } from 'notistack';
import { Outlet } from "react-router-dom";

import {
  Alert,
  AlertTitle,
  Container,
} from '@mui/material'

function App() {
  // check if API token is present in environment variables
  let tokenExists = Boolean(process.env.REACT_APP_OPENWEATHER_TOKEN)

  if (tokenExists) {

    return (
      <SnackbarProvider maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <div className="App">
          <div>
              <Homepage />
          </div>
        </div>
        <Outlet />
      </SnackbarProvider>
    );
  } else {
    return (
      <div className="App">
        <Container sx={{textAlign: 'left', paddingTop: '10px'}}>
          <Alert severity="error">
            <AlertTitle>Error - Missing API token</AlertTitle>
            The <strong>OpenWeatherMap forecast api token</strong> is <strong>missing</strong>.
            <br />
            <br />
            Steps to fix: 
            <ul>
              <li>Create a <strong>.env</strong> file in the application root (outside of src directory)</li>
              <li>Create a variable called <strong>REACT_APP_OPENWEATHER_TOKEN</strong></li>
              <li>Save the token inside REACT_APP_OPENWEATHER_TOKEN</li>
            </ul>
            <br />
            Example:
            <br />

            <code>
              REACT_APP_OPENWEATHER_TOKEN="6863f057deaf11250e7b54465a0fe53f"
            </code>
          </Alert>
        </Container>
      </div>
    );
  }
}

export default App;
