const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');

const User = require('../models/User')

// create a user using POST: "/api/auth" (doesnt require auth)
router.post('/',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
], (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>{
        res.json({"error":"email already used","message":err.message})
      });
    // console.log(req.body)
    // const user  = User(req.body)
    // console.log(user)
    // user.save()
    // res.json(req.body)
})

module.exports = router;