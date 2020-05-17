// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
const cors = require("cors");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
// app.use(cors);

// Initialize the main project folder
app.use(express.static(__dirname + "/public"));

// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// app.get("/", (req, res) => res.json({ message: "hello to my api" }));
// // GET data
app.get("/all", function (request, response) {
  response.json(projectData);
});

// Post data`
app.post("/add", function (request, response) {
  newValues = {
    temperature: request.body.temperature,
    date: request.body.date,
    userResponse: request.body.userResponse,
  };
  projectData.unshift(newValues);
  response.json(newValues);
});

// Setup Server
app.listen(3000, function () {
  console.log("Port is running on 3000 ");
});
