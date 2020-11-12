// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const appStart = express();

// BodyParser
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
appStart.use(bodyParser.urlencoded({ extended: false }));
appStart.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
appStart.use(cors());

// Initialize the main project folder
appStart.use(express.static('website'));


// Setup Server
const port = 8000;

// Spin up the Server

const server  = appStart.listen(port, listening);

// Callback to debug
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

// Initalize all route with a callback function
appStart.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(request, response){
    response.send(projectData)
}

// Post Route

appStart.post('/addWData', addData);

function addData(request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.user_response = request.body.user_response;
    response.end();
    console.log(projectData)
}
