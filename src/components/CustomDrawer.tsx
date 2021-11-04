import * as React from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, SvgIcon, SwipeableDrawer, Typography } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import {
  Close as CloseIcon
} from '@mui/icons-material'

interface IDrawerItem {
  text: string,
  icon: SvgIconComponent,
}

interface ICustomDrawerProps {
  open: boolean,
  onClose: React.ReactEventHandler<{}>,
  onOpen: React.ReactEventHandler<{}>,
  items: IDrawerItem[]
}

export default function CustomDrawer(props: ICustomDrawerProps) {
  return (
    <nav aria-label="swipable menu">
      <SwipeableDrawer
        anchor={"left"}
        open={props.open}
        onClose={props.onClose}
        onOpen={props.onOpen}
        disableBackdropTransition={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center !important',
          justifyContent: 'center',
          padding: "20px"
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#161819',
          color: 'white',
        }}>
          <Typography variant="h5" component="h2">
            Menu
          </Typography>
        </Box>
        <Box>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#161819" fillOpacity="1" d="M0,160L205.7,160L411.4,288L617.1,192L822.9,64L1028.6,160L1234.3,160L1440,288L1440,0L1234.3,0L1028.6,0L822.9,0L617.1,0L411.4,0L205.7,0L0,0Z"></path>
          </svg>
        </Box>
        <List>
          {props.items.map((item) => (
            <ListItem button key={item.text} sx={{height: "10vh"}}>
              <ListItemIcon>
                <SvgIcon component={item.icon} />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Box sx={{flexGrow: 1}} />
        <Button
          color="secondary"
          onClick={props.onClose}
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
      </SwipeableDrawer>
    </nav>
  )
}