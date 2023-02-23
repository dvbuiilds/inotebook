const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user usimg POST "/api/auth/". Doesn't require Auth.
router.post('/', [
        body('email').isEmail(),
        body('password').isLength({min: 6})
    ],
    (req, res)=>{
        const errs = validationResult(req);
        if(!errs.isEmpty()){
            return res.status(400).json({errors: errs});
        }
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user))
        .catch(err => {
            console.log('err', err); 
            res.json({'errr': err});
        });
    }
);

// router.post()

module.exports = router;