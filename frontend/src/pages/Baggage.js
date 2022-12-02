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
import { Typography } from '@mui/material';
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
import ModalForm from "../components/Gate copy/modal";
import Modal from '@mui/material/Modal';

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

function Baggage(props) {
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

Baggage.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [page, setPage] = React.useState(0);
    const [duration, setDuration] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState();
    const [flightType, setFlightType] = React.useState('');
    const [userType, setUserType] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState();
    const [baggageNo, setBaggageNo] = React.useState('');
    const [listOfBaggageNos, setListOfBaggageNos] = React.useState([]);

    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        axios
            .get(server+"/view/arrivalFlights")
            .then((res) => {
                console.log(res.data.data);
                var data = res.data.data;
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
    const handleOpen = async (row) => {
        // setPage(newPage);
        console.log(row);
        setSelectedRow(row);
        setOpen(true);
        await axios
            .get(server+"/baggage/fetchUnassignedBaggage")
            .then((res) => {
                console.log(res.data.data);
                setListOfBaggageNos(res.data.data);

            })

    };
    const updateBaggage = async(row) => {
        console.log("virag testing", row);
       await axios
            .post(server+"/baggage/updateCurouselNo", { flightId: row.id, carouselNumber: baggageNo })
            .then((res) => {
                console.log("virag testing", res.status);

                if (res.status == 203) {
                    console.log("virag testing", res.status);
                    alert(res.data.msg);
                }
                else if (res.status == 200) {
                    setBaggageNo("");
                    setSelectedRow();
                    window.location.href='/baggage';
                    alert("Baggage curousel No inserted successfully");
                }
            });

    };
    const handleChange = async (e) => {
        console.log(e.target.value);
        setBaggageNo(e.target.value);
    };




    return (
        <>
            <LandingNavbar />
            {userType == undefined ? "" : userType == 'Airline' ? <ApplicationAirlineEmpNavbar /> : userType == 'Customer' ? <ApplicationCustomerNavbar /> : <ApplicationAirportEmpNavbar />}

            <TableContainer component={Paper}
                // style={{ marginTop: '150px', background: 'white', marginLeft: '100px', marginRight: '100px', width: '80%', height: '70px' }}
                style={{ width: '80%', background: 'white', marginTop: '150px', marginLeft: '100px', marginLeft: '100px', marginRight: '100px', boxShadow: "5px 10px 20px 0 rgb(8 45 61 / 17%)" }} >
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead style={{ marginTop: '0px' }}>
                        <TableRow style={{ background: '#001343' }}>
                            <TableCell style={{ color: 'white' }}>Flight</TableCell>
                            <TableCell style={{ color: 'white' }}>Source</TableCell>
                            <TableCell style={{ color: 'white' }}>Arrival</TableCell>
                            <TableCell style={{ color: 'white' }}>Terminal</TableCell>
                            <TableCell style={{ color: 'white' }}>Gate</TableCell>
                            <TableCell style={{ color: 'white' }}>Assign Baggage Carousel</TableCell>
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
                                <TableCell style={{ width: 160 }}>
                                    {row.source}
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
                                <TableCell style={{ width: 160 }}>
                                    <Button onClick={() => handleOpen(row)}>Assign</Button>
                                </TableCell>
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
                                    ActionsComponent={Baggage}
                                />)
                            }

                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            {/* <ModalForm open={open} onClose={handleClose}> </ModalForm> */}

            {
                selectedRow &&
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        <Grid style={{
                            background: 'white',
                            padding: '20px',
                            margin: '10px',


                        }}>
                            <Typography variant="h5" gutterBottom style={{ marginLeft: "100px" }}>
                                Assign Baggage Curousel No
                            </Typography>
                            <TextField
                                label='Flight No'
                                variant="outlined"
                                placeholder="Flight No"

                                disabled
                                value={selectedRow.flight_no}
                                style={{ margin: '20px auto', background: 'white' }}
                            />
                            <TextField
                                label='Arrival Time'
                                variant="outlined"
                                disabled
                                placeholder='Enter password'
                                value={new Date(selectedRow.arrival_time).toTimeString()}
                                style={{ margin: '20px auto', background: 'white', paddingLeft: '10px' }}
                            />
                            <TextField
                                label='Gate No'
                                disabled
                                variant="outlined"
                                placeholder='Enter password'

                                value={selectedRow.gateNo}
                                style={{ margin: '20px auto', background: 'white' }}
                            />
                           
                            <FormControl 
                             style={{ margin: '20px auto', background: 'white', paddingLeft: '10px', width:'195px' }}
                             >
                                <InputLabel id="demo-simple-select-autowidth-label">Curousel No</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={baggageNo}
                                    onChange={handleChange}

                                    label="Curousel No"
                                >
                                    {listOfBaggageNos.map((item) =>
                                        <MenuItem key={item.carouselNumber} value={item.carouselNumber}>{item.carouselNumber}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <Button
                                variant='contained'
                                onClick={() => { updateBaggage(selectedRow); }}
                                style={{ height: '50px', alignSelf: 'center', width: '100%', marginBottom: '10px' }}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Box>
                </Modal>}
        </>
    );
}
