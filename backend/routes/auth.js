const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const    jwt = require('jsonwebtoken');
const User = require('../models/User')

const JWT_KEY = "iknowthatthiskeyisin$hisfile";

// create a user using POST: "/api/auth" (doesnt require auth)
router.post('/', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {


        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ "error": "this email already exist" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password:hashedPassword,
        })
        const data ={
            user:{
                id:user.id,
            }
        }

        const authToken = jwt.sign(data,JWT_KEY);
        res.json({authToken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured")
    }
})

module.exports = router;