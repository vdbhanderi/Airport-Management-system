import express from "express";
import db from "../utils/mysql_config.js";
import dayjs from 'dayjs';
const router = express.Router();

var now = dayjs(Date.now()).subtract(8, 'hour');
console.log("fli", now.toISOString());
var query ="SELECT carouselNumber FROM baggage b  where (flightId is null or flightId = 0 ) or b.flightId in (select id from flight where arrival_time < '"+ now.toISOString()+"')";

router.get('/fetchUnassignedBaggage', function(req, res, next) {
    console.log("baggage Apiiiii",req);
    // db.query('SELECT carouselNumber FROM baggage where flightId is null or flightId = 0', function (error, results, fields) {
      db.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({msg: 'error'});
          } else {
            console.log(results);
            res.status(200).json({ data: results });  
          }
    });
});

router.post('/updateCurouselNo', function(req, res, next) {
    console.log("testing apiiiiiii",req.body);
     const {  flightId, carouselNumber} = req.body; 
  
     var sqlParams = [  flightId, carouselNumber];
     var query1 = 'update baggage set flightid = ? where carouselNumber = ?';
      db.query(query1,sqlParams, function (error, results, fields) {
          if (error) {
              console.log(error);
              return res.status(500).json({msg: 'error'});
            } else {
              console.log(results);
              db.query(query, function (error, result, fields) {
                if (error) {
                    console.log(error);
                    return res.status(500).json({msg: 'error'});
                  } else {
                    console.log(result);
                    res.status(200).json({ data: result });  
                  }
             });
            }
      });
  });
  

export default router;