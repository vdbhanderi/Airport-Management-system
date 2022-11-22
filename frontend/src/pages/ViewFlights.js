import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
// import '../pages/styles.css';

import { DataGrid } from '@mui/x-data-grid';


const ViewFlight = () => {
  const [userType, setUserType] = useState('employee');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleOnChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (  
    <div>
      <LandingNavbar  />
        <div className="landingpage">
        <div style={{ height: 400, width: '80%', background: 'white', marginLeft:'50px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
        </div>
    </div>
  );
};

export default ViewFlight;