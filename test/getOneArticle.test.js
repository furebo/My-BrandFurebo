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

 
    //testing GET/article route for getting a particular article
            
    describe("get/article/:id",()=>{
        it("should get an article by id",()=>{
            const articleId = '5f96b9c3002c7b14f8951145';
            chai.request(server).get("/article/" + articleId).end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
            //done();
            })
        })
    })
