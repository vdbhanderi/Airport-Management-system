import express from "express";
import db from "../utils/mysql_config.js";

const router = express.Router();

router.post('/signup', function (req, res, next) {
  console.log("testing apiiiiiii for user", req.body);
  const { username, email, password, airline_id, userType } = req.body;
  var queryforExistingUser = "select * from user where email = ?";
  var sqlParamsforExistingUser = [email];

  var sqlParams = [email, username, password, userType, airline_id];
  var query = "INSERT INTO user (email, user_name, password,user_role, airline_id) VALUES (?, ?, ?, ? ,?)";

  db.query(queryforExistingUser, sqlParamsforExistingUser, function (error, result, fields) {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: 'error' });
    }
    else if (result.length != 0) {
      console.log("virag", result);

      res.status(203).json({ msg: "User already exists" });
    }
    else {
      db.query(query, sqlParams, function (error, results, fields) {
        if (error) {
          console.log(error);
          return res.status(500).json({ msg: 'error' });
        } else {
          console.log(results);
          var sqlParams = [email, password];
          var serachForUser = "select * from user where email = ? and password = ?"
          db.query(serachForUser, sqlParams, function (error, result, fields) {
            if (error) {
              console.log(error);
              return res.status(500).json({ msg: 'Please try again later' });
            }
            else {
              console.log("virag", result);
              res.status(200).json({ data: result[0] });
            }
          });
          // res.status(200).json({ data: results });
        }
      });
    }

  });



});

router.post('/login', function (req, res, next) {

  console.log(req.body);
  var { email, password } = req.body;
  var sqlParams = [email, password];
  var serachForFlightsExist = "select * from user where email = ? and password = ?"
  db.query(serachForFlightsExist, sqlParams, function (error, result, fields) {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Please try again later' });
    }
    else if (result.length == 0) {
      return res.status(203).json({ msg: 'Either email or Password is invalid' });
    }
    else {
      console.log("virag", result);
      res.status(200).json({ data: result[0] });
    }
  });

});

export default router;