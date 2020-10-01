const jsonwebtoken = require('jsonwebtoken');

   module.exports = (req,res,next)=>{
    try {
        var token = req.headers.authorization.split(" ")[1];
        //const tokendecoded = jsonwebtoken.verify(req.body.token, process.env.JWT_KEY);
        const tokendecoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
        req.token = tokendecoded;
        next();
    }catch(err){
        return res.status(401).json({
            message:"failed to authenticate"
        })
    }
} 