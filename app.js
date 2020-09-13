const express = require('express')
const app = express();
let port = process.env.PORT ||3000;
//middlewares
app.use('/psots',()=>{
    
})

//Routes
app.get('/welcome',(req,res)=>{
    res.send('Welcome, Enjoy our weekly realesed blog !');
})
// lesting to the server
app.listen(port,()=>{
    console.log(`Server listing on port http://localhost: ${port}` )
});