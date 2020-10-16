const jsonwebtoken = require('jsonwebtoken');

   module.exports = (req,res,next)=>{
    try {
        var token = req.headers.token;
        //const tokendecoded = jsonwebtoken.verify(req.body.token, process.env.JWT_KEY);
        jsonwebtoken.verify(token,process.env.JWT_KEY);
        //req.userData = tokendecoded;
       // next();
    }catch(err){
        return res.status(401).json({
            message:"failed to authenticate"
        })
    }
} 