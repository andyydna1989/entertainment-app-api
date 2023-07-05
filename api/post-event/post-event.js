const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Activity = require('../activities/Activity')
const request = require('request');

router.post('/postEvent', async (req, res, next) => {

const {name, town, description, contact} = req.body;

let eventLocation = {lat: 0, lon: 0}

// get lat/long from town name
request.get({
    url: `https://api.api-ninjas.com/v1/geocoding?city=${town}&country=GB`,
headers: {
  'X-Api-Key': process.env.NINJA_KEY,
},
}, function(error, response, body) {
    if (error){res.status(500).send(error.message)}
    else {
        const data = JSON.parse(body)[0];
        console.log(data, 'the data');
        eventLocation.lat = data.latitude.toString();
        eventLocation.lon = data.longitude.toString();
        buildResponse();
    }
})

const buildResponse = async () => {
try {
await mongoose.connect(process.env.MONGO_LOCAL_STRING)
    .then(() => {console.log("connection established to MongoDB cluster")})
    .catch((err) => {console.log(err.stack)});

const newEvent = await Activity.create({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    latitude: eventLocation.lat,
    longitude: eventLocation.lon,
    description: description,
    contact: contact
});

newEvent.save();

res.status(201).send("Event posted successfully");
} catch (error) {
    res.status(500).send(error.message);
}
}
});

module.exports = router;