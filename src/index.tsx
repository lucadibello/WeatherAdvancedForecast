import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Analytics from './components/Analytics';
import CustomDrawer from './components/CustomDrawer';
import { SnackbarProvider } from 'notistack';
import Navbar from './components/Navbar';
import {
  Cloud as CloudIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material'



ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
          {/* Drawer */}
          <CustomDrawer
            items={[
              {
                text: "Forecast",
                link: "/",
                icon: CloudIcon,
              },
              {
                text: "Analytics",
                link: "/analytics",
                icon: TimelineIcon,
              },
            ]}
          />
          {/* Navbar */}
          {/*Navbar onClick={() => setDrawerOpen(true)} />*/}
          </SnackbarProvider>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/analytics" element={<Analytics />} /> 
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
