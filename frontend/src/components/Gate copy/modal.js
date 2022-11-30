import {React, useState, useEffect} from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Switch from '@mui/material/Switch';
import {Button,TextField,Grid,Box,Modal} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModalForm = (props) => {
//   const history = useNavigate();
const [userId, setUserId] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const history = useNavigate();
// const dispatch = useDispatch();
const handleClose = () => setOpen(false);
const [open, setOpen] = useState(props.open);
const handleOnChangeUserId = (event) => {
  setEmail(event.target.value);
};

const handleOnChangePassword = (event) => {
  setPassword(event.target.value);
};
const [checked, setChecked] = useState(false);

useEffect(() => {
  setOpen(props.open);
   ///console.log(props);
},[]);

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
        <Grid  style={{
             background: 'white',
             padding: '20px',
             margin: '10px',
             width: '40%',
             
          }}>
            <TextField
              label='Email'
              variant="outlined"
              placeholder="Email"
              fullWidth
              required
              value={email}
              // onChange={(e) => {
              //   handleOnChangeUserId(e);
              // }}
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
              // onChange={(e) => {
              //   handleOnChangePassword(e);
              // }}
              style={{margin:'20px auto', background:'white'}}
            />
            <Button
              variant='contained'
              // onClick={(e) => { onLogIn(e); }}
              style={{ height: '50px', alignSelf: 'center', width: '100%', marginBottom: '10px'}}
            >
              Login
            </Button>
            </Grid>
        </Box>
      </Modal>
   

  
  );
};

export default ModalForm;
