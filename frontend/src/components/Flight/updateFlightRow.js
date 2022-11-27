import { React, useState, useEffect } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import axios from 'axios';
import { grey } from '@mui/material/colors';
import { Button } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const UpdateFlightRow = (props) => {
  const history = useNavigate();
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  function handleUpdateFlight(e) {
    // Navigate(to ={'/updateFlight'} state={{id : props.row.id}});
    // console.log(e);

    <Navigate to={"/updateFlight"} state={{ id: props.row.id }} />

  }
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    // if(props.row.isEnable == '1'){
    //     setChecked(true);
    // }
    // else{
    //     setChecked(false);
    // }

  }, []);

  return (
    <TableRow
      key={props.row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0, background: grey } }}
    >
      <TableCell component="th" scope="row">
        {props.row.flight_no}
      </TableCell>
      <TableCell >{props.row.source}</TableCell>
      <TableCell >{props.row.destination}</TableCell>
      {/* <TableCell >{ moment( props.row.departure_time).tz("America/Los_Angeles").format() }</TableCell> */}
      <TableCell >{new Date(props.row.departure_time).toLocaleDateString() + "   "+new Date(props.row.departure_time).toLocaleTimeString() }</TableCell>
      <TableCell >{new Date(props.row.arrival_time).toLocaleDateString() + "   "+new Date(props.row.arrival_time).toLocaleTimeString() }</TableCell>
      <TableCell > <Link
        style={{ textDecoration: 'none' }}
        to={"/updateFlight"}
        state = {{ id: props.row.id }}
        
      ><Button variant="outlined" >update</Button></Link></TableCell>
    </TableRow>
  );
};

export default UpdateFlightRow;
