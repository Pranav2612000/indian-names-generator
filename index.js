const express = require('express');
const bodyParser = require('body-parser');
const { http } = require("@serverless/cloud");
const namesRoutes = require('./routes/namesRouter');


const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json())
app.use("/", namesRoutes);

app.listen(port, () => {
  console.log(`Application up at port ${port}`);
});
if(process.env.NODE_ENV != "dev") {
  http.use(app);
}
module.exports = app;


