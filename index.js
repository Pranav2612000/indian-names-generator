const express = require('express');
const bodyParser = require('body-parser');
const namesRoutes = require('./routes/namesRouter');

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json())
app.use("/", namesRoutes);

app.listen(port, () => {
  console.log(`Application up at port ${port}`);
});
module.exports = app;


