import React from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';

import {
  Container
} from '@mui/material'

function App() {
  return (
    <div className="App">
     <Navbar />
      <Container sx={{textAlign: 'left', paddingTop: '10px'}}>
        <Homepage />
      </Container>
    </div>
  );
}

export default App;
