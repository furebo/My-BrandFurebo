const request = require("supertest");
let server = require("./app");

//describe('articles API',()=>{

//testing GET default route for getting all articles
     
request(server).get('/article').expect(200)

    