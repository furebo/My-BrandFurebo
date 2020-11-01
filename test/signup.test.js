process.env.NODE_ENV = 'test';
require('dotenv').config();
const express = require('express');
let mongoose = require('mongoose');
//var articleModel = require('./model');
//const fs = require('fs');
const sinon = require('sinon');
const articleModel = require("../model.js");
const usermodel = require("../usermodel.js");
const protection = require("../protection.js");
const chai = require("chai");
const expect = require('chai').expect;
const request = require('supertest');
const chaiHttp = require("chai-http");
const server = require("../app");
const assert = require('assert');
const { should } = require('chai');
//const commentsModel = require('../commentsModel.js');
chai.should();
chai.use(chaiHttp);

 //testing post route for signing up the user to database
    
 describe("post/signup",()=>{
    it("should signup a user to database ",(done)=>{
           let user = {name:"frere",password:"frere123"}
       
            chai.request(server)
            .post("/signup")
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('message').eql('user signed up');
            done();
            })
    
        })

    }) 