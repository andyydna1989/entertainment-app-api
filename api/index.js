require('dotenv').config();
const express = require ('express');
const bodyParser = require('body-parser');
const loginRoute = require('./login/login');
const activitiesRoute = require('./activities/activities')
const postEventRoute = require('./post-event/post-event')
const authRoute = require('./check-auth/check-auth')

const app = express();

app.use((req, res, next)=>{
    console.log(req.method, req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Headers, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, append,delete,entries,foreach,get,has,keys,set,values,Authorization");
    res.header('Access-Control-Allow-Methods', "POST, GET, OPTIONS, DELETE, PUT");
    next();
})

app.options('/', (req, res, next)=>{
    console.log('options');
    res.status(200).send();
    next();
})
app.use(bodyParser.json());

app.post('/login', loginRoute);

app.post('/activities', activitiesRoute);

app.post('/checkAuth', authRoute);

app.post('/postEvent', postEventRoute);

app.listen(process.env.PORT || 3001, ()=> {console.log("App is available on http://localhost:3001")});