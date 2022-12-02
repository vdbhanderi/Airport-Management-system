import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from 'axios';
import LandingNavbar from '../components/LandingNavbar/LandingNavbar';
import ApplicationCustomerNavbar from '../components/ApplicationCustomerNavbar/ApplicationCustomerNavbar.js';
import ApplicationAirlineEmpNavbar from "../components/ApplicationAirlineEmpNavbar/ApplicationAirlineEmpNavbar.js";
import ApplicationAirportEmpNavbar from "../components/ApplicationAirportEmpNavbar/ApplicationAirportEmpNavbar";

import {
    Grid,
    TextField,
    RadioGroup,
    Radio,
    Button,
    FormControlLabel,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
} from '@mui/material';
import server from '../Config';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;


    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
    const [page, setPage] = React.useState(0);
    const [duration, setDuration] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState();
    const [flightType, setFlightType] = React.useState('');
    const [userType, setUserType] = React.useState('');

    useEffect(() => {
        axios
            .get(server+"/view/" + duration)
            .then((res) => {
                console.log(res.data.data);
                var data = res.data.data.filter(d => d.destination == 'SFO');
                console.log(res.data.data);
                setRows(data);
                setFlightType('Arrivals');

            })
        setUserType(localStorage.getItem('usertype'));

    }, []);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = async (e) => {
        setDuration(e.target.value);

        await axios
            .get(server+"/view/" + e.target.value)
            .then((res) => {
                var flightsData = null;
                if (flightType == 'Departures') {
                    flightsData = res.data.data.filter(d => d.destination != 'SFO');
                }
                else {
                    flightsData = res.data.data.filter(d => d.destination == 'SFO');
                }
                console.log(flightsData);
                setRows(flightsData);
            })
    };

    const setFlightTypeByRows = async (e) => {
        console.log(flightType);
        setFlightType(e.target.value);

        await axios
            .get(server+"/view/" + duration)
            .then((res) => {
                var flightsData = null;
                if (e.target.value == 'Departures') {
                    flightsData = res.data.data.filter(d => d.destination != 'SFO');
                }
                else {
                    flightsData = res.data.data.filter(d => d.destination == 'SFO');
                }
                console.log(flightsData);
                setRows(flightsData);
            })

    };



    return (
        <>
            <LandingNavbar />
            {userType == undefined ? "" : userType == 'Airline' ? <ApplicationAirlineEmpNavbar /> : userType == 'Customer' ? <ApplicationCustomerNavbar /> : <ApplicationAirportEmpNavbar />}

            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ marginTop: '150px', background: 'white', marginLeft: '100px', marginRight: '100px', width: '80%', height: '70px' }}
            > <FormControl component="fieldset" style={{ marginLeft: '20px' }}>
                    <RadioGroup row aria-label="Flight" name="row-radio-buttons-group" value={flightType} onChange={(e) => { setFlightTypeByRows(e) }}>
                        <FormControlLabel value="Departures" control={<Radio />} label="Departures" />
                        <FormControlLabel value="Arrivals" control={<Radio />} label="Arrivals" />
                    </RadioGroup>
                </FormControl>
                <FormControl style={{ marginRight: '20px', width: '200px' }}>
                    <InputLabel id="demo-simple-select-label">Time Duration</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={duration}
                        label="Time Duration"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>next hour</MenuItem>
                        <MenuItem value={2}>next 2 hour</MenuItem>
                        <MenuItem value={4}>next 4 hour</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {/* <Box sx={{ width: '150px' }} style={{background:'white'}}>
           
               
            </Box> */}

            <TableContainer component={Paper} style={{ width: '80%', background: 'white', marginTop: '10px', marginLeft: '100px', boxShadow: "5px 10px 20px 0 rgb(8 45 61 / 17%)" }} >
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead style={{ marginTop: '0px' }}>
                        <TableRow style={{ background: '#001343' }}>
                            <TableCell style={{ color: 'white' }}>Flight</TableCell>
                            <TableCell style={{ color: 'white',minWidth:'80px' }}>Airline</TableCell>
                            {
                                flightType == 'Arrivals' ?
                                    <TableCell style={{ color: 'white' }}>Arriving From</TableCell> :
                                    <TableCell style={{ color: 'white' }}>Departing To</TableCell>

                            }
                            {/* <TableCell style={{ color: 'white' }}>Arriving From</TableCell> */}
                            <TableCell style={{ color: 'white' }}>Departure</TableCell>
                            <TableCell style={{ color: 'white' }}>Arrival</TableCell>
                            <TableCell style={{ color: 'white',maxWidth:'80px' }}>Terminal</TableCell>
                            <TableCell style={{ color: 'white',maxWidth:'30px' }}>Gate</TableCell>
                            {
                                flightType == 'Arrivals' ?
                                    <TableCell style={{ color: 'white' }}>Baggage Claim</TableCell> :
                                    ""
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows ? (rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row, index) => (
                            <TableRow key={row.flight_no} style={index % 2 ? { background: "#f0f5f8" } : { background: "white" }}>
                                <TableCell component="th" scope="row">
                                    {row.flight_no}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.airline_name}
                                </TableCell>
                                {/* <TableCell style={{ width: 160 }}>
                                    {row.source}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>
                                    {row.destination}
                                </TableCell> */}
                                {
                                    flightType == 'Arrivals' ?
                                        <TableCell style={{ width: 160 }}>
                                            {row.source}
                                        </TableCell> :
                                        <TableCell style={{ width: 160 }}>
                                            {row.destination}
                                        </TableCell>

                                }
                                <TableCell style={{ width: 180 }}>
                                    {new Date(row.departure_time).toLocaleDateString() + " " + new Date(row.departure_time).toLocaleTimeString()}
                                </TableCell>
                                <TableCell style={{ width: 180 }}>
                                    {new Date(row.arrival_time).toLocaleDateString() + " " + new Date(row.arrival_time).toLocaleTimeString()}
                                </TableCell>


                                <TableCell style={{ width: 160 }}>
                                    {row.terminalNo}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>
                                    {row.gateNo}
                                </TableCell>
                                {
                                    flightType == 'Arrivals' ?
                                        <TableCell style={{ width: 160 }}>
                                            {row.carouselNumber}
                                        </TableCell> :
                                        ""
                                }
                            </TableRow>
                        )) : ""}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            {
                                rows && (<TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />)
                            }

                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}
