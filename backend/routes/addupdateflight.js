import express from "express";
import db from "../utils/mysql_config.js";
import dayjs from 'dayjs';
const router = express.Router();

router.post('/updateflight', function(req, res, next) {
  console.log("testing apiiiiiii",req.body);
   const {  flight_no, arrival_time, departure_time,  source, destination ,id} = req.body; 
   var now = dayjs(Date.now()).subtract(8, 'hour');
   var sqlParams = [  flight_no, arrival_time, departure_time, source, destination ,id];
   
    var sqlParams1 = [ id];
    var query1 = "update gate g inner join flight f  on f.id = g.flightId  set flightId = '' where ((source = 'SFO' and departure_time not between '" + now.toISOString() + "' and '" + new Date(now + 1 * 60 * 60 * 1000).toISOString() + "') or (destination = 'SFO' and arrival_time not between '" + now.toISOString() + "' and '" + new Date(now + 1 * 60 * 60 * 1000).toISOString() + "')) and flightId = ? ";
    db.query(query1,sqlParams1, function (error, result1, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({msg: 'error'});
          } else {
            console.log(result1);
           
          }
    });
   
   var query = 'update flight set  flight_no = ?, arrival_time = ?, departure_time =?, source=?, destination=? where id = ?';
    db.query(query,sqlParams, function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({msg: 'error'});
          } else {
            console.log(results);
            res.status(200).json({ data: results });  
          }
    });
});

router.post('/addFlight', function(req, res, next) {

    const { airline_id, flight_no, arrival_time, departure_time, status, source, destination } = req.body; 
    console.log(req.body);
    var sqlParams = [ airline_id, flight_no, arrival_time, departure_time, "status", source, destination ];
    var sqlParams1 = [ flight_no];
    var serachForFlightsExist = "select * from flight where flight_no = ?"
    var query = "INSERT INTO flight (airline_id, flight_no, arrival_time, departure_time, status, source, destination) VALUES (?, ?, ?, ?, ?, ?, ? )";
    db.query(serachForFlightsExist,sqlParams1, function (error, result, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({msg: 'error'});
        
          }
          else if(result.length != 0){
            console.log("virag",result);

            res.status(203).json({ msg: "flight_no already exists" });  
          } else {
             db.query(query,sqlParams, function (error, results, fields) {
              if (error) {
                  console.log(error);
                  return res.status(500).json({msg: 'error'});
                } else {
                  console.log(results);
                  res.status(200).json({ data: results });  
                }
           });
          }
    });
   
});

export default router;