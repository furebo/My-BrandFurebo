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

describe('Articles API',()=>{
    describe("GET/article",()=>{
        it("should get all the articles from database",()=>{
            chai.request(server).get("/article").end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
               // done();
            })
        });
    })
}) 