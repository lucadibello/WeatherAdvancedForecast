import React from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import TableauEmbed from './components/Tableau_Embed';
import dynamic from 'next/dynamic'
import {
  Container
} from '@mui/material'
const TableauNoRSS = dynamic(() => import('./components/Tableau_Embed'), {
  ssr: false
})

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container sx={{textAlign: 'left', paddingTop: '10px'}}>
        <TableauEmbed></TableauEmbed>
      </Container>
    </div>
  );
}

export default App;
