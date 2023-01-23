const express = require("express")
const router = express.Router()

router.get('/',(req,res) =>{
    obj={
        a:"ABC",
        b:12
    }
    res.json(obj)
})

module.exports = router;