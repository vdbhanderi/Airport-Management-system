import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GateRow from '../components/Gate/gateRow.js';
import LandingNavbar from '../components/LandingNavbar/LandingNavbar';
import axios from 'axios';
import ApplicationCustomerNavbar from '../components/ApplicationCustomerNavbar/ApplicationCustomerNavbar.js';
import ApplicationAirlineEmpNavbar from "../components/ApplicationAirlineEmpNavbar/ApplicationAirlineEmpNavbar.js";
import ApplicationAirportEmpNavbar from "../components/ApplicationAirportEmpNavbar/ApplicationAirportEmpNavbar";
import server from '../Config.js';

export default function Gates() {
    const [userType, setUserType] = React.useState('');
    const [rows, setRows] = React.useState();
    useEffect(() => {
        console.log("gate");
        axios
            .get(server+"/gate/fetchGates")
            .then((res) => {
                console.log(res.data.data);
                setRows(res.data.data);

            })
            setUserType(localStorage.getItem('usertype'));
            console.log("testing error", userType);
            if(localStorage.getItem('usertype') == 'Customer' || userType == 'Airline'){
                window.location.href = '/error';
            }
            if(userType== undefined){
                window.location.href = '/login';
            }
    },[]);

    return (
        <>
            <LandingNavbar />
            {userType == undefined ? "":userType == 'Airline' ?  <ApplicationAirlineEmpNavbar/> : userType == 'Customer' ? <ApplicationCustomerNavbar/>: <ApplicationAirportEmpNavbar/>}

            <TableContainer component={Paper} style={{ width: '80%', background: 'white', marginTop: '100px', marginLeft: '100px', boxShadow: "5px 10px 20px 0 rgb(8 45 61 / 17%)" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Gate Name</TableCell>
                            <TableCell>Terminal</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row) => (
                            <GateRow row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}