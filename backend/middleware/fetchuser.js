const jwt = require('jsonwebtoken');

const JWT_KEY = "iknowthatthiskeyisin$hisfile";

const fetchuser = (req,res,next) => {
    // get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send("Access Denied!!") // no token in header
    }
    try {
        const data = jwt.verify(token,JWT_KEY);
        req.user = data.user;
        next()        
    } catch (error) {
        res.status(401).send("Access Denied!!") // Incorrect token
 
    }

}

module.exports = fetchuser