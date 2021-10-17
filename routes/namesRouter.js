const express = require("express");
const router = express.Router();
const stringToBoolean = require("../helpers/stringToBoolean");

const randomNameGenerator = require("random-indian-name");

router.get('/', (req, res) => {
  return res.json({ status: "success" });
});

/*
  A simple API which returns a random Indian name

  REQUEST PARAMS:
    first: Boolean ( True )  - Result contains the firstnames
    last: Boolean ( True ) - Result contains the lastnames
    gender: "male" | "female" - Gender of the name
    seed: String - The seed to be used for randomly obtaining a name
*/
router.get('/names', (req, res) => {

  /* fetch value from query params */
  let { first, last, gender, seed } = req.query;

  /* if first, last values exist, convert them to boolean */
  if(first != undefined) {
    first = stringToBoolean(first);
  }
  if(last != undefined) {
    last = stringToBoolean(last);
  }

  /* validate input data */
  if(first != undefined && typeof first != "boolean") {
    return res.status(400).json({
      err: "first should be a boolean"
    });
  }
  if(last != undefined && typeof last != "boolean") {
    return res.status(400).json({
      err: "last should be a boolean"
    });
  }
  if(first === false && last === false) {
    return res.status(400).json({
      err: "if first, last both are defined, atleast one of them must be true"
    });
  }
  /* due to the way the package is implemented, it returns just 
    the last name if both first and last are true, but we want to return
    the full name, so we do this fix */
  if(first === true && last === true) {
    first = false;
    last = false;
  }
  if(gender && !["male", "female"].includes(gender)) {
    return res.status(400).json({
      err: "gender should be male or female"
    });
  }

  return res.json({
    names: [
      randomNameGenerator({
        first,
        last,
        gender,
        seed
      })
    ]
  });
});

module.exports = router;

