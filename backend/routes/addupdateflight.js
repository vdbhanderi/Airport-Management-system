import express from "express";
import db from "../utils/mysql_config.js";

const router = express.Router();

router.post('/updateflight', function(req, res, next) {
  console.log(req);
   const { airline_id, flight_no, arrival_time, departure_time, status, source, destination } = req.body; 

   var sqlParams = [ airline_id, flight_no, arrival_time, departure_time, status, source, destination ,id];
   query = 'update flight set airline_id = ?, flight_no = ?, arrival_time = ?, departure_time =?, status=?, source=?, destination=? where gateNo = ?';
    db.query(query,sqlParams, function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({msg: 'error'});
          } else {
            console.log(results);
            res.status(200).json({ data: results });  
          }
    });
});``

router.get('/addflight', function(req, res, next) {

    const { airline_id, flight_no, arrival_time, departure_time, status, source, destination } = req.body; 
    
    var sqlParams = [ airline_id, flight_no, arrival_time, departure_time, status, source, destination ];
    var query = "INSERT INTO customers (airline_id, flight_no, arrival_time, departure_time, status, source, destination) VALUES (airline_id, flight_no, arrival_time, departure_time, status, source, destination )";
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

export default router;