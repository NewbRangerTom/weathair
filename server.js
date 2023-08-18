// Project: Weather and Air Quality
// Title:   weathair
// Version: 1.0.0
// Date:    08/16/2023
// Author:  NewbRangerTom
// Description:
//      client side: display tempurature, heat index, air quality from openweathermap.org
//      server side: expressjs framework, mysql database, call openweathermap.org api to get data

// Database connection

// const connection = require('../../my_connector.js');

// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
//     console.log('connected as id ' + connection.threadId);
// });

// // 
// const express = require('express');

const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
app.listen(process.env.PORT || 3000, () => {
    if (3000){
        console.log('listening on port 3000');
    }
    else{
        console.log(process.env.PORT);
    }
    }
);
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// // ------------------------------------------------------- //

// app.post('/api', (request, response) =>{

// });

// app.get('/api', (request, repsonse) => {

// });


app.get('/weather/:latlon', async (request, response) => {
    const ow_api_key = process.env.OW_API_KEY;
    const latlon = request.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];
    // const lat = 27.2621;
    // const lon = -80.3835;
    console.log(lat, lon);
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ow_api_key}&units=imperial`;
    const weather_response = await fetch(weather_url);
    const current_weather = await weather_response.json();
    response.json(current_weather);
    console.log(current_weather);
});

app.get('/air_qual/:latlon', async (request, response) => {
    const ow_api_key = process.env.OW_API_KEY;
    const latlon = request.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
   
    const air_qual_url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${ow_api_key}`
    const air_qual_response = await fetch(air_qual_url);
    const current_air_qual = await air_qual_response.json();
    response.json(current_air_qual);
    console.log(current_air_qual);
});