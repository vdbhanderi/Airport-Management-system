import express from "express";
import db from "../utils/mysql_config.js";

const router = express.Router();

router.post('/updateGate', function(req, res, next) {
  console.log("gate Apiiiii",req);
  const { gateNo, isEnable } = req.body; 

   var sqlParams = [ isEnable, gateNo];
    db.query('update gate set isEnable = ? where gateNo = ?',sqlParams, function (error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({msg: 'error'});
          } else {
            console.log(results);
            res.status(200).json({ data: results });  
          }
    });
});``

router.get('/fetchGates', function(req, res, next) {
    console.log("gate Apiiiii",req);
    db.query('SELECT * FROM gate', function (error, results, fields) {
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