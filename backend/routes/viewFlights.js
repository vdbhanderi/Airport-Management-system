import express from "express";
import db from "../utils/mysql_config.js";
import dayjs from 'dayjs';

const router = express.Router();

// async function removeGates(){
//   var now = dayjs(Date.now()).subtract(8, 'hour');
//   //var query = "SELECT * FROM gate g where departure_time < '"+ now.toISOString()+"' and '"+ new Date(now + duration * 60 * 60 * 1000).toISOString()+"'" + " or arrival_time between '"+ now.toISOString()+ "' and '"+ new Date(now + duration * 60 * 60 * 1000).toISOString() + "'";
//   var query = "update gate g  inner join flight f on g.flightId = f.id and (f.departure_time < '"+ now.toISOString()+"' and  f.source = 'SFO') or (f.arrival_time < '"+ now.toISOString()+"' and  f.destination = 'SFO') set flightId = '' ";
//   console.log("testing query",query);

//   db.query(query, function (error, results, fields) {
//         if (error) {
//             console.log(error);
//             console.log("error in Remove Gate Function"); 
//             return res.status(500).json({msg: 'error in Remove Gate Function'});
//           } else {
//             console.log(results);
//             res.status(200).json({ data: results });  
//           }
//     });
// }
router.get('/arrivalFlights', async function (req, res, next) {

  var now = dayjs(Date.now()).subtract(8, 'hour');
  console.log("fli", now.toISOString());
  // console.log("fli",new Date(Date.now()).toISOString());
  var query = "SELECT f.*, g.gateNo, g.terminalNo,b.carouselNumber FROM flight f left join gate g on f.id = g.flightId left join baggage b on b.flightId= f.id  where arrival_time between '" + now.toISOString() + "' and '" + new Date(now + 1 * 60 * 60 * 1000).toISOString() + "' and (b.carouselNumber is Null or b.carouselNumber = 0 )";
  console.log("testing query", query);

  db.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: 'error' });
    } else {
      console.log(results);
      res.status(200).json({ data: results });
    }
  });
});

async function getUnassignerFlights() {
  var now = dayjs(Date.now()).subtract(8, 'hour');
  console.log("fli", now.toISOString());
  var query = "SELECT id FROM flight where ((source = 'SFO' and departure_time between '" + now.toISOString() + "' and '" + new Date(now + 1 * 60 * 60 * 1000).toISOString() + "') or (destination = 'SFO' and arrival_time between '" + now.toISOString() + "' and '" + new Date(now + 1 * 60 * 60 * 1000).toISOString() + "')) and id not in (select flightId from gate where (flightId is not null and flightId != 0))";
  console.log("testing query", query);

  return new Promise((resolve, reject) => {
    db.query(query, function (error, results, fields) {
      if (error) {
        console.log(error);
        reject("error in get unassigned Gates");
        // return res.status(500).json({msg: 'error'});
      } else {
        console.log(results);
        // res.status(200).json({ data: results });  
        resolve(results);
      }
    });

  });
}

async function getUnassignerGates() {
  var query = "SELECT gateNo FROM gate g where (flightId is null or flightId = 0) and isEnable = 0";
  console.log("testing query", query);

  return new Promise((resolve, reject) => {
    db.query(query, function (error, results, fields) {
      if (error) {
        console.log(error);
        reject("error in get unassigned Gates");
        // return res.status(500).json({msg: 'error'});
      } else {
        console.log(results);
        // res.status(200).json({ data: results });  
        resolve(results);
      }
    });

  });
}
async function updateGatesForFlights(UnassignedGatesList, unassignedFlightsList) {
  // console.log(id);
  var i = UnassignedGatesList.length - 1;
  var j = unassignedFlightsList.length - 1;
  var query = "update gate set flightId = ? where gateNo = ?";
  var params;
  while (i >= 0 && j >= 0) {
    params = [unassignedFlightsList[j].id, UnassignedGatesList[i].gateNo];
    console.log("testing query", params);

    db.query(query, params, function (error, results, fields) {
      if (error) {
        console.log(error);
        //  reject("error in get remove Gates");
        return res.status(500).json({ msg: 'error' });
      } else {
        console.log(results);
        // res.status(200).json({ data: results });  
      }
    });
    i--;
    j--;
  }

}

async function removeGates() {
  // console.log(id);
  var now = dayjs(Date.now()).subtract(8, 'hour');
  console.log("remove Gates  Apiiiii");
  var query = "update gate g  inner join flight f on g.flightId = f.id set g.flightId = '' where (f.departure_time < '" + now.toISOString() + "' and  f.source = 'SFO') or (f.arrival_time < '" + now.toISOString() + "' and  f.destination = 'SFO') ";//+ new Date(now + duration * 60 * 60 * 1000).toISOString()+"'" + " or arrival_time between '"+ now.toISOString()+ "' and '"+ new Date(now + duration * 60 * 60 * 1000).toISOString() + "'";
  console.log("testing query", query);
  console.log();

  db.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      //  reject("error in get remove Gates");
      return res.status(500).json({ msg: 'error' });
    } else {
      console.log(results);
      // res.status(200).json({ data: results });  
    }
  });

}

router.get('/:duration1', async function (req, res, next) {

  var duration = req.params.duration1;
  console.log("flight view Apiiiii", duration);

  //get all unassigned flights for next 1 hour
  var unassignedFlightsList = await getUnassignerFlights();
  if (unassignedFlightsList.length != 0) {
    var UnassignedGatesList = await getUnassignerGates();
    if (UnassignedGatesList.length < unassignedFlightsList.length) {
      await removeGates();
    }
    // let result = ;
    // console.log("asdasdasdasdasdaad",result);
    await updateGatesForFlights(Object.values(JSON.parse(JSON.stringify(UnassignedGatesList))), Object.values(JSON.parse(JSON.stringify(unassignedFlightsList))));
  }
  //console.log(unassignedFlightsList);

  var now = dayjs(Date.now()).subtract(8, 'hour');
  console.log("fli", now.toISOString());
  // console.log("fli",new Date(Date.now()).toISOString());
  var query = "SELECT *, g.gateNo,b.carouselNumber,a.airline_name FROM flight f left join gate g on f.id = g.flightId  left join baggage b on  f.id = b.flightId left join  airline a on  f.airline_id = a.airline_id  where ( f.source = 'SFO' and departure_time between '" + now.toISOString() + "' and '" + new Date(now + duration * 60 * 60 * 1000).toISOString() + "' )" + " or ( f.destination = 'SFO' and arrival_time between '" + now.toISOString() + "' and '" + new Date(now + duration * 60 * 60 * 1000).toISOString() + "' )";
  console.log("testing query", query);

  db.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: 'error' });
    } else {
      console.log(results);
      res.status(200).json({ data: results });
    }
  });
});





router.get('/:duration', function (req, res, next) {
  var duration = req.params.duration;
  // console.log(id);
  console.log("flight view Apiiiii", duration);
  //console.log(new Date(now + duration * 60 * 60 * 1000).toISOString());
  var now = dayjs(Date.now()).subtract(8, 'hour');
  //var future = dayjs(Date.now()).subtract((8 - duration), 'hour');
  console.log("fli", now.toISOString());
  //console.log("fli",future.toISOString());
  console.log("fli", now);


  var query = "SELECT * FROM flight where departure_time between '" + now.toISOString() + "' and '" + new Date(now + duration * 60 * 60 * 1000).toISOString() + "' or arrival_time between '" + now.toISOString() + "' and '" + new Date(now + duration * 60 * 60 * 1000).toISOString() + "'";
  console.log("testing query", query);

  db.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: 'error' });
    } else {
      console.log(results);
      res.status(200).json({ data: results });
    }
  });
});

router.get('/fetchFlightsForAirline/:id', function (req, res, next) {
  var id = req.params.id;
  console.log("flight view Apiiiii", id);
  var now = dayjs(Date.now()).subtract(8, 'hour');
  now= now.toISOString();
  db.query("SELECT * FROM flight where airline_id = ? and ((destination = 'SFO' and arrival_time > '"+ now +"') or (source = 'SFO' and departure_time > '"+ now + "') )", [id], function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: 'error' });
    } else {
      console.log(results);
      res.status(200).json({ data: results });
    }
  });
});

router.get('/getFlight/:id', function (req, res, next) {
  var id = req.params.id;
  console.log("flight view Apiiiii", id);
  db.query('SELECT * FROM flight where id = ?', [id], function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: 'error' });
    } else {
      console.log(results);
      res.status(200).json({ data: results[0] });
    }
  });
});

export default router;