import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  TextField,
  RadioGroup,
  Radio,
  Button,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import LandingNavbar from '../components/LandingNavbar/LandingNavbar';
import '../pages/styles.css';
// import { useTheme } from '@emotion/react';
import axios from 'axios';
import server from '../Config';


const Signup = () => {
  // const classes = useStyles();
  const [userType, setUserType] = useState('Customer');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [airlinesList, setairlinesList] = useState('');
  const [airline, setAirline] = useState('');
  const history = useNavigate();
  // const dispatch = useDispatch();
  useEffect(() => {
    axios
        .get(server+"/airline/fetchAirlines")
        .then((res) => {
            console.log("virag",res.data.data);
            setairlinesList(res.data.data);

        })

        if(localStorage.getItem('usertype') != undefined){
          window.location.href = '/ViewFlights';
      }
},[]);

  const handleOnChangeAirline = (event) => {
    setAirline(event.target.value);
  };
  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleOnChangeUserId = (event) => {
    setUserId(event.target.value);
  };
  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSignUp = () => {
    console.log(userType);
    console.log(airline);
    axios
    .post(server+"/user/signUp",{password:password, userType : userType, email:email, airline_id:airline,username:userId})
    .then((res) => {
        if(res.status==200){
            localStorage.setItem("usertype",res.data.data.user_role);
            localStorage.setItem("email",res.data.data.email);
            localStorage.setItem("airline",res.data.data.airline_id);
            alert("user crated successfully");
            console.log(res.data.data);
            window.location.href = '/ViewFlights';
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
            <FormControl component="fieldset">
              <RadioGroup row aria-label="user" name="row-radio-buttons-group" value={userType} onChange={(e) => { setUserType(e.target.value); }}>
                <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="Airline" control={<Radio />} label="Airline Employee" />
                <FormControlLabel value="Airport" control={<Radio />} label="AirPort Employee" />
              </RadioGroup>
            </FormControl>
            <TextField
              label='UserId'
              variant="outlined"
              placeholder="User Name"
              fullWidth
              required
              value={userId}
              onChange={(e) => {
                handleOnChangeUserId(e);
              }}
              style={{margin:'20px auto', background:'white'}}
            />
            <TextField
              label='Email'
              variant="outlined"
              placeholder="Email"
              fullWidth
              required
              value={email}
              onChange={(e) => {
                handleOnChangeEmail(e);
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
             {userType == 'Airline' &&<FormControl fullWidth style={{margin:'20px auto', background:'white'}}>
                    <InputLabel id="demo-simple-select-label">AirLines </InputLabel>
                    <Select
                    
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={airline}
                        label="AirLine"
                        onChange={handleOnChangeAirline}
                    >
                       {airlinesList && airlinesList.map((row) => (
                             <MenuItem value={row.airline_id}>{row.airline_name}</MenuItem>
                        ))}
                       
                    </Select>
                </FormControl>
                }
            <Button
              variant='contained'
              onClick={(e) => { onSignUp(e); }}
              style={{ height: '50px', alignSelf: 'center', width: '100%', marginBottom: '10px'}}
            >
              Signup
            </Button>
            <a href="/login" className='loginAnchor'>Existing user? Login Here</a>
            </Grid>
          </div>
    </div>
  );
};

export default Signup;