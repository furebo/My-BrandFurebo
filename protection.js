const jsonwebtoken = require('jsonwebtoken');

   module.exports = (req,res,next)=>{
    try {
           var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZnVyZWJvIiwiaWF0IjoxNjAzOTU1MzMyLCJleHAiOjE2MDM5NzMzMzJ9.EmbBqBnk2xD0Wfu0fbsTvckM_1jqdmTcz9WSVsbQw9w"
        //var token = req.headers.token;
        //const tokendecoded = jsonwebtoken.verify(req.body.token, process.env.JWT_KEY);
        jsonwebtoken.verify(token,process.env.JWT_KEY);
        //req.userData = tokendecoded;
        next();
    }catch(err){
        return res.status(401).json({
            message:"failed to authenticate"
        })
    }
} 