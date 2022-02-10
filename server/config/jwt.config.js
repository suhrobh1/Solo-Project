const jwt = require("jsonwebtoken");

module.exports = {

    authenticate(req, res, next){
        jwt.verify(req.cookies.usertoken, 
            process.env.JWT_SECRET,
            (err, payload) => {
                if(err){
                    console.log("Message 1", err);
                    res.status(401).json({verified: false})
                }else{
                    console.log("Message 2", payload);
                    req.jwtpayload = payload;
                    next()
                }
            }
            )
    }

}