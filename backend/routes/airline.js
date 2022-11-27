import express from "express";
import db from "../utils/mysql_config.js";

const router = express.Router();


router.get('/fetchAirlines', function(req, res, next) {
    console.log("gate Apiiiii",req);
    db.query('SELECT * FROM airline', function (error, results, fields) {
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