const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/checkAuth', (req, res, next) => {

    const user='andy@andy.com';

    const {token} = req.body;

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err){
            console.log(err);
            res.status(403).send('Invalid User');
        }
        else{
            // needs replacing with a database call
            if (decoded.email !== user){
                res.status(403).send('Invalid User');
            }
            else {
            res.status(200).send('Valid User');
            }
        }
    })

});

module.exports = router;