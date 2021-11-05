import * as React from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, SvgIcon, SwipeableDrawer, Typography } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { Link } from "react-router-dom";
import {
  Close as CloseIcon
} from '@mui/icons-material'
import Navbar from './Navbar';

interface IDrawerItem {
  text: string,
  link: string,
  icon: SvgIconComponent,
}

interface ICustomDrawerProps {
  items: IDrawerItem[]
}

export default function CustomDrawer(props: ICustomDrawerProps) {

  const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  return (
    <nav aria-label="swipable menu">
      <SwipeableDrawer
        open={isDrawerOpen}
        anchor={"left"}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => console.log("open")}
        disableBackdropTransition={false}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1976d2',
          paddingTop: 3,

          color: 'white',
        }} style={{minWidth: 300}}>
          <Typography variant="h5" component="h2">
            Menu
          </Typography>
        </Box>
        <Box>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path style={{marginTop: -5}} fill="#1976d2" fillOpacity="1" d="M0,160L205.7,160L411.4,288L617.1,192L822.9,64L1028.6,160L1234.3,160L1440,288L1440,0L1234.3,0L1028.6,0L822.9,0L617.1,0L411.4,0L205.7,0L0,0Z"></path>
          </svg>
        </Box>
        <List>
          {props.items.map((item) => (
            <ListItem button key={item.text} onClick={() => setDrawerOpen(false)} component={Link} to={item.link} sx={{height: "10vh"}}>
              <ListItemIcon>
                <SvgIcon component={item.icon} />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Box sx={{flexGrow: 1}} />
        <Button
          color="primary"
          onClick={ () => setDrawerOpen(false)}
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
      </SwipeableDrawer>
      <div><Navbar onClick={() => setDrawerOpen(true)} /></div>
    </nav>
  )
}