// const mysql = require("mysql");
import mysql from 'mysql';

// import constants from "./sqlConfig.json";

const constants = {
    HOST: "airport.cb1ycgh0w0rf.us-east-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "Rds12345",
    PORT: 3306,
    DATABASE: "airport"
}
const db = mysql.createConnection({
    host: constants.HOST,
    user: constants.USER,
    password: constants.PASSWORD,
    database: constants.DATABASE
  });
  
  // open the MySQL connection
  db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
  
//   module.exports = db;



// try {
//   await db.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

export default db;