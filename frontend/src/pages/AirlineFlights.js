import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import UpdateFlightRow from '../components/Flight/updateFlightRow';
import LandingNavbar from '../components/LandingNavbar/LandingNavbar';
import axios from 'axios';
import ApplicationCustomerNavbar from '../components/ApplicationCustomerNavbar/ApplicationCustomerNavbar.js';
import ApplicationAirlineEmpNavbar from "../components/ApplicationAirlineEmpNavbar/ApplicationAirlineEmpNavbar.js";
import ApplicationAirportEmpNavbar from "../components/ApplicationAirportEmpNavbar/ApplicationAirportEmpNavbar";
import server from '../Config';

export default function AirlineFlights() {
    const [userType, setUserType] = React.useState('');
    const [rows, setRows] = React.useState();
    useEffect(() => {
    
        axios
            // .get("server/view/fetchFlightsForAirline/?id=" + sessionStorage.getItem('airlineId'))
            .get(server+"/view/fetchFlightsForAirline/" + localStorage.getItem('airline'))
            .then((res) => {
                console.log("virag",res.data.data);
                setRows(res.data.data);

            })
            setUserType(localStorage.getItem('usertype'));
    },[]);
    
    return (
        <>
            <LandingNavbar />
            {userType == undefined ? "":userType == 'Airline' ?  <ApplicationAirlineEmpNavbar/> : userType == 'Customer' ? <ApplicationCustomerNavbar/>: <ApplicationAirportEmpNavbar/>}

            <TableContainer component={Paper} style={{ width: '80%', background: 'white', marginTop: '100px', marginLeft: '100px', boxShadow: "5px 10px 20px 0 rgb(8 45 61 / 17%)" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>FlightNo</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell>Destination</TableCell>
                            <TableCell>Departure</TableCell>
                            <TableCell>Arrival</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.length == 0 ?
                            <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>No Data</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>:""
                        }
                        {rows && rows.map((row) => (
                            <UpdateFlightRow row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}