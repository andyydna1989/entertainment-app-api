
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res, next) => {
    console.log(req.body);
    const { body } = req;
    const { email } = body.user;
    const { password } = body.user;

    const username='andy@andy.com';
    const passwordTest='1';

    if(email === username && password === passwordTest) { 
        jwt.sign({email}, process.env.JWT_KEY, { expiresIn: '3h' },(err, token) => {
            if(err) { console.log(err) }    
            res.send(token);
        });
    } else {
        res.status(403).send('Invalid User');
    }
});

module.exports = router;