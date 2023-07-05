const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const Activity = require('./Activity');
// haversine is a mathematical formula for working out crow-flies distances between lat/long points.
const haversine = require('haversine');

router.post('/activities', async (req, res, next) => {
    const { body } = req;
    const userLocation = {
        latitude: body.lat,
        longitude: body.lon
    }

    mongoose.connect(process.env.MONGO_LOCAL_STRING)
    .then(() => {console.log("connection established to MongoDB cluster")})
    .catch((err) => {console.log(err.stack)});

    const sortFunction = (a,b)=>{
        const homeToA = haversine(userLocation, a);
        const homeToB = haversine(userLocation, b);

        if (homeToA < homeToB){
            return -1
        }
        if(homeToA > homeToB){
            return 1
        }
        else return 0
    }

    const activities = await Activity.find()
    const mappedActivities = activities.map((activity)=>{
        //scott - why TF did the spread operator cause me issues here?
        return {
            _id: activity.id,
            name: activity.name,
            contact: activity.contact,
            description: activity.description,
            latitude: Number(activity.latitude),
            longitude: Number(activity.longitude),
            distance: haversine(userLocation, activity)
        }
    })

    mappedActivities.sort(sortFunction);
    res.status(200).send(mappedActivities);
    
});

module.exports = router;