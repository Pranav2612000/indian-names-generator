const getRandom = (max, min) => {
	return Math.floor( Math.random() * max ) + min 
}
module.exports = getRandom;