import React, { Profiler, useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import '../pages/styles.css';
import { Button, TextField } from "@mui/material";
import LandingNavbar from '../components/LandingNavbar/LandingNavbar';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ApplicationCustomerNavbar from '../components/ApplicationCustomerNavbar/ApplicationCustomerNavbar.js';
import ApplicationAirlineEmpNavbar from "../components/ApplicationAirlineEmpNavbar/ApplicationAirlineEmpNavbar.js";
import ApplicationAirportEmpNavbar from "../components/ApplicationAirportEmpNavbar/ApplicationAirportEmpNavbar";
import server from "../Config";

const UpdateFlight = () => {
    //   const history = useHistory();
    const { state } = useLocation();
    const [userType, setUserType] = React.useState('');


    //const [userType, setUserType] = useState(userProfileState.userType);\
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Profile Updated Successfully!');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [arrival, setArrival] = useState();
    const [departure, setDeparture] = useState();
    const [flightNo, setFlightNo] = useState('');


    React.useEffect(() => {
       
          axios
        .get(server+"/view/getFlight/"+state.id)
        .then((res) => {
            console.log(res.data.data.destination);
            setDestination(res.data.data.destination);
            setSource(res.data.data.source);
            setArrival(res.data.data.arrival_time);
            setDeparture(res.data.data.departure_time);
            setFlightNo(res.data.data.flight_no);
             console.log(res.data.data);
    });
    setUserType(localStorage.getItem('usertype'));

    }, [])


    const handleOnChangeSource = (event) => {
        setSource(event.target.value);
    };

    const handleOnChangeDestination = (event) => {
        setDestination(event.target.value);
    };
    const handleOnChangeArrival = (newValue) => {
        setArrival(newValue);
    };
    const handleOnChangeDeparture= (newValue) => {
        console.log("departure11111",newValue);
         setDeparture(newValue);
    };
    const handleOnChangeFlightno= (event) => {
        setFlightNo(event.target.value);
    };


    const handleUpdateFlight = () => {
       
        console.log(source);
        console.log(destination);
        console.log(typeof arrival);
        console.log("departurewwwwwww",departure);

        axios
        .post(server+"/flight/updateFlight",{id:state.id,flight_no : flightNo, arrival_time: dayjs(arrival).subtract(8, 'hour'),airline_id : 1, departure_time:dayjs(departure).subtract(8, 'hour'),source:source,destination:destination})
        .then((res) => {
            if(res.status==200){
                alert("flight updated successfully");
                console.log(res.data.data);
            }
            else{
                alert("please try again");
            }
        })
        // if(validateEmail(email) && ValidateDOB(dob)) {
        //   dispatch(updateProfile(userProfile, userDetails.data._id));
        //     setOpen(true);
        //     setTimeout(()=>{
        //       setOpen(false);
        //     }, 2000)
        // }
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
                        <h3> Update Flight</h3>

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
                            disabled
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
                            disabled
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
                                // type="datetime-local"

                                style={{ marginLeft: '20px' }}
                                
                                fullWidth
                                disablePast

                                value={departure}
                                // onChange={handleOnChangeDeparture}
                                onChange={(newDateTime) => {
                                    console.log("departure11111",newDateTime);
                                    setDeparture(newDateTime);
                                  }}
                                minDateTime={dayjs()}
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
                            disabled
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
                        onClick={handleUpdateFlight}
                    >
                        Update
                    </Button>
                </Grid>
            </div>
        </div>
    );
}

export default UpdateFlight;