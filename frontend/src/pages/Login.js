import React, { useState ,useEffect} from 'react';
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
import axios from 'axios';
import server from '../Config';


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
  useEffect(() => {
        if(localStorage.getItem('usertype') != undefined){
          window.location.href = '/ViewFlights';
      }
},[]);
  // const classes = useStyles();
  const [userType, setUserType] = useState('employee');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  // const dispatch = useDispatch();

  const handleOnChangeUserId = (event) => {
    setEmail(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onLogIn = () => {
    // console.log(email);
    // console.log(password);
    axios
    .post(server+"/user/login",{password:password, email:email})
    .then((res) => {
        if(res.status==200){
            alert("user Login successfully");
            localStorage.setItem("usertype",res.data.data.user_role);
            localStorage.setItem("email",res.data.data.email);
            localStorage.setItem("airline",res.data.data.airline_id);
            console.log(res.data.data);
            window.location.href='/ViewFlights';
        }
        else if(res.status == 203){
            alert(res.data.msg);
        }
        else{
          alert("please try again");
      }
    })
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
            {/* <FormControl component="fieldset">
              <RadioGroup row aria-label="user" name="row-radio-buttons-group" value={userType} onChange={(e) => { setUserType(e.target.value); }}>
                <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="Airline" control={<Radio />} label="Airline Employee" />
                <FormControlLabel value="Airport" control={<Radio />} label="AirPort Employee" />
              </RadioGroup>
            </FormControl> */}
            <TextField
              label='Email'
              variant="outlined"
              placeholder="Email"
              fullWidth
              required
              value={email}
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