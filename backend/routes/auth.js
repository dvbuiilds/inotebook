const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Dhairya#is#a#good#boy"

// Create a user usimg POST "/api/auth/". Doesn't require Auth.
router.post('/createuser', [
        body('email').isEmail(),
        body('password').isLength({min: 6})
    ],
    async (req, res)=>{
        const errs = validationResult(req);

        if(!errs.isEmpty()){
            return res.status(400).json({errors: errs});
        }
        
        try {
            let user = await User.findOne({email: req.body.email});
            if(user){
                console.log('user', user)
                return res.status(404).json({error : "User with this email already exists!"});
            }
            else{
                // Hashing the password.
                const salt = await bcrypt.genSalt(10);
                const securePassword = await bcrypt.hash(req.body.password, salt);

                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: securePassword
                })

                const data = {
                    user: { id: user.id}
                };
                // console.log('user.id', user.id)
                const authToken = jwt.sign(data, JWT_SECRET);

                res.json({authToken: authToken});   
            }
        } catch (error) {
            console.log('error.message', error.message);
        }
    }
);

module.exports = router;