import {React, useState, useEffect} from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import server from '../../Config';

const GateRow = (props) => {
//   const history = useNavigate();
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function handleGate(e){
   setChecked(e.target.checked);
   axios
   .post(server+"/gate/updateGate",{gateNo : props.row.gateNo, isEnable : e.target.checked })
   .then((res) => {
       
       console.log(res.data.data);

   });
}
const [checked, setChecked] = useState(false);
useEffect(() => {
    if(props.row.isEnable == '1'){
        setChecked(true);
    }
    else{
        setChecked(false);
    }
   
},[]);

  return (
    <TableRow
              key={props.row.gateNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {props.row.gateNo}
              </TableCell>
              <TableCell >{props.row.terminalNo}</TableCell>
              <TableCell > <Switch checked={checked} onChange={e => handleGate(e)} /></TableCell>
     </TableRow>
  );
};

export default GateRow;
