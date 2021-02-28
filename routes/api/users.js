const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

//@route    POST/api/users
//@desc     Register User
//@access   Public(means access route without any token)

router.post('/',[

    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'PLease enter a password with 6 or more characters').isLength({ min: 6 })

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()){
        // Return if their is another res .send
        return res.status(400).json({errors: errors.array()}) 
    }

    const { name, email, password } = req.body;

    try{

        // See if user exists
        let user = await User.findOne({email}); //findOne({email: email})
        if(user){
            return res.status(400).json({errors: [{ msg: "User already exists" }]})
        }

        // Get users gravatar
        const avatar = gravatar.url(email, {
        s: '200',       // s--> size
        r: "pg",        // r--> rating
        d: 'mp'         // d--> default
        })

        // Creating new user instance
        user = new User({name, email, avatar, password});   

        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user into the Database
        await user.save();  

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 3600000 },  //in production 3600
            ( err, token ) => {
                if(err) throw err;
                res.json({ token })
            }
        )
        //------------------------

        } 
    
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

module.exports = router;