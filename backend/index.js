import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import cors from 'cors';
import connectMongoDB from './utils/dbConnection.js';
import flight from "./routes/viewFlights.js";
import gate from "./routes/gate.js";
import addupdate from "./routes/addupdateflight.js";
import airline from "./routes/airline.js";
import user from "./routes/user.js";
import baggage from "./routes/baggage.js";
import config from "./utils/config.js";

// const mysql = require("mysql");
import mysql from 'mysql';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', config.frontend);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// import constants from "./sqlConfig.json";

// const constants = {
//     HOST: "airport.cb1ycgh0w0rf.us-east-1.rds.amazonaws.com",
//     USER: "admin",
//     PASSWORD: "Rds12345",
//     PORT: 3306,
//     DATABASE: "airport"
// }
// const db = mysql.createConnection({
//     host: constants.HOST,
//     user: constants.USER,
//     password: constants.PASSWORD,
//     database: constants.DB
//   });
  
//   // open the MySQL connection
//   db.connect(error => {
//     if (error) throw error;
//     console.log("Successfully connected to the database.");
//   });

const port = 3001;


app.get('/', (req, res) => {
    res.send("Hello World")
});
app.use('/view',flight);
app.use('/gate',gate);
app.use('/flight',addupdate);
app.use('/airline',airline);
app.use('/user',user);
app.use('/baggage',baggage);
// connectMongoDB();

// const db = mongoose.connection; 
// db.on('error', (error) => console.log(error))
// db.once('open', () => console.log('Connected to Database'));

// To listen to port 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

export default app;