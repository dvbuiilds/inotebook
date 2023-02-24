const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');

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
            const user = await User.findOne({email: req.body.email});
            if(user){
                console.log('user', user)
                return res.status(404).json({error : "User with this email already exists!"});
            }
            else{
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                })
                // .then(user => res.json(user))
                // .catch(err => {
                //     console.log('err', err); 
                //     res.json({'errr': err});
                // }); 
                res.json({"result": "User created!"})   
            }
        } catch (error) {
            console.log('error.message', error.message);
        }
    }
);

module.exports = router;