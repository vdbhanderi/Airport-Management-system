import React, { useEffect, useState } from 'react';
// import {  useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import MobileeRightMenuSlider from '@mui/material/Drawer';
import {
  AppBar,
  Toolbar,
  ListItemIcon,
  ListItem,
  IconButton,
  ListItemText,
  Avatar,
  Divider,
  List,
  Box
} from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../images/icon.svg';
import '../LandingNavbar/LandingNavbar.css';

// CSS styles
// const useStyles = makeStyles(theme=>({
//     menuSliderContainer: {
// width: '100%',
// minWidth: '250px',
// paddingTop: '64px',
// background: '#222',
// height: '100%'
//     },
//     avatar: {
// display: 'block',
// margin: '0.5rem auto',
// marginBottom: '4rem',
// width: theme.spacing(13),
// height: theme.spacing(13),
//     },
//     listItem: {
//         color: '#fff'
//     }
// }));

const menuItems = [
  {
    listIcon: <EngineeringIcon style={{ color: 'black' }} />,
    listText: 'Gate Maintaince',
    listPath: '/gate'
  },

  {
    listIcon: <FlightTakeoffIcon style={{ color: 'black' }} />,
    listText: 'Flights',
    listPath: '/ViewFlights'
  },
  {
    listIcon: <CasesOutlinedIcon style={{ color: 'black' }} />,
    listText: 'Assign Baggage Carousel number',
    listPath: '/baggage'
  },
  {
    listIcon: <LogoutIcon style={{ color: 'black' }} />,
    listText: 'Logout',
    listPath: '/'
  },
]

const ApplicationAirportEmpNavbar = (props) => {
  // const classes = useStyles();
  const history = useNavigate();
  // const dispatch = useDispatch();
  const userDetails = localStorage.getItem('userDetails');//useSelector((state) => state.login.userDetails.data);
  useEffect(() => {
    
  }, [userDetails])

  const [state, setState] = useState({
    left: false
  })
  function logout(){
    localStorage.clear();
    window.location.href = '/ViewFlights';
  }
  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  const sideList = slider => (
    <Box component='div'
      // className={classes.menuSliderContainer}
      onClick={toggleSlider(slider, false)}
      style={{
        width: '100%',
        minWidth: '250px',
        paddingTop: '64px',
        background: 'white',
        height: '100%'
      }}
    >
      {/* <Avatar 
          style={{
            display: 'block',
          margin: '0.5rem auto',
          marginBottom: '4rem',
          width:'15px',
          height:'15px'
          // width: theme.spacing(13),
          // height: theme.spacing(13)
        }}
          src={logo} alt='Customer' /> */}
      <span style={{ paddingLeft: '80px',
   marginBottom: '50px',
    display: 'table-caption',
    fontSize: '20px', fontWeight: 'bold', color: 'orange', fontFamily: 'auto', paddingRight: '50px' }}>Airport Management System</span>

      <Divider />
      <List>
        {menuItems.map((listItem, key) => (
          <ListItem button key={key} component={Link} onClick={() => {
            if (listItem.listText === 'Logout') {
              logout();
            } if (listItem.listText === 'Profile') {
              //   dispatch(getUserDetails(userDetails._id));
            }
          }}
            to={{ pathname: listItem.listPath, state: { userType: 'user' } }}>
            <ListItemIcon >{listItem.listIcon}</ListItemIcon>
            <ListItemText primary={listItem.listText} />
          </ListItem>
        ))}
      </List>
    </Box >
  );

return (
  <div>
    <Box component='nav'>
      <AppBar position='fixed' className='appbar'>
        <Toolbar className='toolbar'>
          <IconButton onClick={toggleSlider('left', true)}>
            <DehazeIcon style={{ color: 'white' }} />
          </IconButton>
          <MobileeRightMenuSlider open={state.left}
            onClose={toggleSlider('left', false)}
            anchor='left'>
            {sideList('left')}
          </MobileeRightMenuSlider>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'orange', fontFamily: 'auto', paddingRight: '50px' }}>Airport Management System</span>
            {/* <img src={logo} style={{cursor: 'pointer'}} width='120' height='80' alt='' /> */}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  </div>
);
};

export default ApplicationAirportEmpNavbar;
