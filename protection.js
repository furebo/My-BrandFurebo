const jsonwebtoken = require('jsonwebtoken');

   module.exports = (req,res,next)=>{
    try {
        var Authorization = req.headers.token.split(" ")[1];
        //var token = req.headers.token;
        //const tokendecoded = jsonwebtoken.verify(Authorization, process.env.JWT_KEY);
        jsonwebtoken.verify(Authorization,process.env.JWT_KEY);
        //req.userData = tokendecoded;
        next();
    }catch(err){
        return res.status(401).json({
            message:"failed to authenticate"
        })
    }
} 

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZnVyZWJvIiwiaWF0IjoxNjA0MDUwODUwLCJleHAiOjE2MDQwODY4NTB9.ba-kms3B9BJB2R2_2ISDGb2TT0LWhemAyun4c5tFZxc" 