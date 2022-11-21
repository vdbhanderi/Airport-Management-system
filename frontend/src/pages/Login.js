import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStyles, createTheme } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { ColorButton4 } from '../constants/index'
// import { userLogin } from '../state/action-creators/loginActions.js';
// import { storeSearchParams, resetFlightData } from '../state/action-creators/flightActions';
//import { employeeLogin, customerLogin } from '../state/action-creators/loginActions.js';
import {
  Grid,
  TextField,
  RadioGroup,
  Radio,
  Button,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import LandingNavbar from '../components/LandingNavbar/LandingNavbar';
import '../pages/styles.css';
import { useTheme } from '@emotion/react';



// CSS styles
const useStyles = createTheme((theme) => ({
  wrapper: {
    background: 'white',
    padding: '20px',
    margin: '10px',
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  }
}));

const Login = () => {
  // const classes = useStyles();
  const [userType, setUserType] = useState('employee');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  // const dispatch = useDispatch();

  const handleOnChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onLogIn = () => {
      // dispatch(userLogin({ identifier: userId, password, userType }, history));
      // dispatch(storeSearchParams({}));
      // dispatch(resetFlightData())
  };

  return (  
    <div>
      <LandingNavbar  />
        <div className="landingpage">
          <Grid  style={{
             background: 'white',
             padding: '20px',
             margin: '10px',
             width: '40%',
             
          }}>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="user" name="row-radio-buttons-group" value={userType} onChange={(e) => { setUserType(e.target.value); }}>
                <FormControlLabel value="user" control={<Radio />} label="Customer" />
                <FormControlLabel value="Airline" control={<Radio />} label="Airline Employee" />
                <FormControlLabel value="Airport" control={<Radio />} label="AirPort Employee" />
              </RadioGroup>
            </FormControl>
            <TextField
              label='UserId'
              variant="outlined"
              placeholder={userType === 'employee' ? 'Employee Id' : 'Mileage Number'}
              fullWidth
              required
              value={userId}
              onChange={(e) => {
                handleOnChangeUserId(e);
              }}
              style={{margin:'20px auto', background:'white'}}
            />
            <TextField
              label='Password'
              variant="outlined"
              placeholder='Enter password'
              type='password'
              fullWidth
              required
              value={password}
              onChange={(e) => {
                handleOnChangePassword(e);
              }}
              style={{margin:'20px auto', background:'white'}}
            />
            <Button
              variant='contained'
              onClick={(e) => { onLogIn(e); }}
              style={{ height: '50px', alignSelf: 'center', width: '100%', marginBottom: '10px'}}
            >
              Login
            </Button>
            <a href="/Signup" className='loginAnchor'>New user? Register Here</a>
            </Grid>
          </div>
    </div>
  );
};

export default Login;