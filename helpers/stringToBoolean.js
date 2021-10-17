const stringToBoolean = (string) => 
  string === 'false' || string === 'undefined' || string === 'null' || string === '0' ?
  false : !!string

module.exports = stringToBoolean;