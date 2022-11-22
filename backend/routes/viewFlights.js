import express from "express";
import db from "../utils/mysql_config.js";


const router = express.Router();

// router.get('', async (req, res) => {
//     try {
//         const flights = await FlightDetail.find({});
//         res.status(200).json({ data: flights });
    
//     } catch(error) {
//         console.log("error==", error);
//         return res.status(500).json({msg: 'error'});
          
//     }  
// });

/* GET home page. */
router.get('', function(req, res, next) {
    db.query('SELECT * FROM flight', function (error, results, fields) {
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