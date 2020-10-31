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
chai.should();
chai.use(chaiHttp);

describe('Articles API',()=>{
    describe("GET/article",()=>{
        it("should get all the articles from database",(done)=>{
            chai.request(server).get("/article").end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            })
        });
    })
}) 

describe("get default",()=>{
    it("should desplay a welcome message ",(done)=>{

       chai.request(server)
       .get("/")
       .end((err,response)=>{
        response.body.should.have.property('message').eql('welcome');

           done();
       })
   })
})

describe("get/article",()=>{
    it("should not get any article from database",(done)=>{
        chai.request(server).get("/artile").end((err,response)=>{
            response.should.have.status(404);
            //response.should.have.text('there is an error');
            done();
        })
    });
}) 

//testing GET/article route for getting a particular article
         
describe("get/article/:id",()=>{
    it("should get an article by id",(done)=>{
        const articleId = '5f96b9c3002c7b14f8951145';
        chai.request(server).get("/article/" + articleId).end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
})
