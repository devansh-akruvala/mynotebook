const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser");

    const JWT_KEY = "iknowthatthiskeyisin$hisfile";

// create a user using POST: "/api/auth/createuser" (doesnt require auth)
router.post('/createuser', [
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
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        const data = {
            user: {
                id: user.id,
            }
        }

        const authToken = jwt.sign(data, JWT_KEY);
        res.json({ authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE 2 : login a user using POST: "/api/auth/login" (doesnt require auth)
router.post('/login', [
    body('email', 'Email cannto be empty').isEmail().exists(),
    body('password', 'Password cannto be empty').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let success=false
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({success, error: "Invalid email or password" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Invalid email or password" })
        }

        const data = {
            user: {
                id: user.id,
            }
        }

        const authToken = jwt.sign(data, JWT_KEY);
        success=true
        res.json({success, authToken })
    } catch (error) {
        res.status(500).send("Internal Server Error")

    }

})


//ROUTE 3 : GEt login user details a user using POST: "/api/auth/getuser" (require auth)
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;