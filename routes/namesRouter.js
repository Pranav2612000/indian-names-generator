const express = require("express");
const router = express.Router();
const stringToBoolean = require("../helpers/stringToBoolean");
const getRandom = require("../helpers/getRandom");

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
  let { number, first, last, gender, seed } = req.query;

  /* If number of names required is not defined set it to 1 by default */
  if(number == undefined) {
    number = 1;
  }
  /* if first, last values exist, convert them to boolean */
  if(first != undefined) {
    first = stringToBoolean(first);
  }
  if(last != undefined) {
    last = stringToBoolean(last);
  }

  /* validate input data */
  try {
    number = parseInt(number)
    if(isNaN(number)) {
      return res.status(400).json({
        err: "number should be an integer"
      });
    }
  } catch(err) {
    return res.status(400).json({
      err: "number should be an integer"
    });
  }
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

  const names = [];
  for (let i = 0; i < number; i++) {
    names.push(
      randomNameGenerator({
        first,
        last,
        gender,
        // By default the seed depends on the timestamp and since the function is going to be called multiple times
        // with the same timestamp the returned names are the same. To get around this we pass a random timestamp as the seed
        seed: new Date().getTime() + getRandom(1000, -1000) 
      })
    )
  }

  return res.json({
    names
  });
});

module.exports = router;

