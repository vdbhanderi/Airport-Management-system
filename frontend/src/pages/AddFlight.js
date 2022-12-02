import React, { Profiler, useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import '../pages/styles.css';
import { Button, TextField } from "@mui/material";
import LandingNavbar from '../components/LandingNavbar/LandingNavbar';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import {Alert, Stack} from '@mui/material';
import Error from "./PageNotFound";
import ApplicationCustomerNavbar from '../components/ApplicationCustomerNavbar/ApplicationCustomerNavbar.js';
import ApplicationAirlineEmpNavbar from "../components/ApplicationAirlineEmpNavbar/ApplicationAirlineEmpNavbar.js";
import ApplicationAirportEmpNavbar from "../components/ApplicationAirportEmpNavbar/ApplicationAirportEmpNavbar";
import server from "../Config";


const AddFlight = () => {
    //   const history = useHistory();

    const [value, setValue] = React.useState();
    const [userType, setUserType] = React.useState('');

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    function ValidateDOB(dob) {
        var dateString = dob;
        var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\-(0[1-9]|1[0-2])\-((19|20)\d\d))$/;
        if (regex.test(dateString)) {
            var parts = dateString.split("-");
            var dtDOB = new Date(parts[1] + "-" + parts[0] + "-" + parts[2]);
            var dtCurrent = new Date();
            if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 14) {
                alert("Eligibility 14 years ONLY.")
                return false;
            }
            if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 14) {
                if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                    return false;
                }
                if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                    if (dtCurrent.getDate() < dtDOB.getDate()) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            alert("Please enter a correct date and in dd-mm-yyyy format.");
            return false;
        }
    }
    function validateArraivalandDeparture(arrival, departure){

    }

    //const [userType, setUserType] = useState(userProfileState.userType);\
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Profile Updated Successfully!');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [arrival, setArrival] = useState();
    const [departure, setDeparture] = useState();
    const [flightNo, setFlightNo] = useState('');


    React.useEffect(() => {
        // setUserName(userProfileState.userName);
        // setDOB(userProfileState.dob);
        // setEmail(userProfileState.email);
        // setPhone(userProfileState.phone);
        
        setUserType(localStorage.getItem('usertype'));
        console.log(userType);
        if(localStorage.getItem('usertype') == 'Customer' || localStorage.getItem('usertype') == 'Airport'){
            window.location.href = '/error';
        }
        if(localStorage.getItem('usertype') == '' || localStorage.getItem('usertype')== undefined){
            window.location.href = '/login';
        }
    }, [])

    const [rows, setRows] = useState([]);

    const handleOnChangeSource = (event) => {
        setSource(event.target.value);
    };

    const handleOnChangeDestination = (event) => {
        setDestination(event.target.value);
    };
    const handleOnChangeArrival = (newValue) => {
        console.log(newValue);
        setArrival(newValue);
    };
    const handleOnChangeDeparture= (newValue) => {
        console.log(newValue);

         setDeparture(newValue);
    };
    const handleOnChangeFlightno= (event) => {
        setFlightNo(event.target.value);
    };


    const handleAddFlight = () => {
       
        console.log(source);
        console.log(flightNo);
        console.log(dayjs(departure));
        // console.log(new Date(departure).to());
        if(source.trim() == '' ){
            alert("Source is required");
        }
        else if(destination.trim() == ''){
            alert("Destination is required");
        }
        else if(flightNo.trim() == ''){
            alert("Flight No is required");
        }
        else if(source.trim() != 'SFO' && destination.trim()!='SFO'){
            alert("Either Source or Destination should be SFO.");
        }

        // else if(dayjs(departure).isBefore(dayjs(arrival))){

        //     alert("Departure can not be grater than Arrivals");
        // }
        else{
            axios
            .post(server+"/flight/addFlight",{flight_no : flightNo, arrival_time: dayjs(arrival).subtract(8, 'hour'),airline_id : localStorage.getItem('airline'), departure_time:dayjs(departure).subtract(8, 'hour'),source:source,destination:destination})
            .then((res) => {
                console.log("virag testing", res.status);
    
                if(res.status == 203){
                    console.log("virag testing", res.status);
                    alert(res.data.msg);
                }
                else if(res.status == 200){
                    alert("Flight inserted successfully");
                    window.location.href = '/ViewFlights';
                }
                // console.log(res.data.data);
               
    
            // })
            // if(validateEmail(email) && ValidateDOB(dob)) {
            //   dispatch(updateProfile(userProfile, userDetails.data._id));
            //     setOpen(true);
            //     setTimeout(()=>{
            //       setOpen(false);
            //     }, 2000)
            // }
        })
        }
      };



    return (
        <div>
           
            <LandingNavbar />
            {userType == undefined ? "":userType == 'Airline' ?  <ApplicationAirlineEmpNavbar/> : userType == 'Customer' ? <ApplicationCustomerNavbar/>: <ApplicationAirportEmpNavbar/>}
           
            <div className="employeeProfile">
                <Grid style={{
                    background: "white",
                    padding: "20px",
                    margin: "10px",
                    width: "80%"
                }}>
                    <div>
                        <h3> Add Flight</h3>

                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {/* <FormControl fullWidth style={{ margin: '20px' }}>
                            <InputLabel id="demo-simple-select-label">Source</InputLabel>
                            <Select
                            
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl> */}
                     <TextField
                            style={{ margin: '20px' }}
                            label="Source"
                            variant="outlined"
                            placeholder="Source"
                            fullWidth
                            required
                            value={source}
                            onChange={(e) => {
                                handleOnChangeSource(e);
                            }}
                        /> 
                        <TextField
                            style={{ margin: '20px' }}
                            label="Destination"
                            variant="outlined"
                            placeholder="Destination"
                            fullWidth
                            required
                            value={destination}
                            onChange={(e) => {
                                handleOnChangeDestination(e);
                            }}
                        />
                        {/* <FormControl fullWidth style={{ margin: '20px' }}>
                            <InputLabel id="demo-simple-select-label">Source</InputLabel>
                            <Select
                            
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl> */}
                    </div>
                    <div style={{ display: "flex", margin: '20px' }}>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Departure Date and Time"
                                style={{ marginLeft: '20px' }}
                                inputProps={{
                                    min: new Date().toISOString().slice(0, 16),
                                  }}
                                fullWidth
                                disablePast

                                value={departure}
                                onChange={handleOnChangeDeparture}
                                renderInput={(params) => <TextField 
                                  {...params} />}
                            />

                            <DateTimePicker
                                label="Arrival Date and Time"
                                style={{ marginLeft: '20px' }}
                                fullWidth
                                value={arrival}
                                disablePast
                                onChange={handleOnChangeArrival}
                                renderInput={(params) => <TextField  style={{ marginLeft: '20px' }} {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            label="Flight No"
                            variant="outlined"
                            placeholder="Flight No"
                            style={{ marginLeft: '20px' }}

                            required
                            value={flightNo}
                            onChange={(e) => {
                                handleOnChangeFlightno(e);
                            }}
                        />
                    </div>

            
                    <Button
                        variant="contained"
                        style={{
                            height: "50px",
                            alignSelf: "center",
                            width: "100%",
                            marginBottom: "10px",
                        }}
                        onClick={handleAddFlight}
                    >
                        Add
                    </Button>
                </Grid>
            </div>
        </div>
    );
}

export default AddFlight;