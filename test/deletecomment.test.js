require('dotenv').config();
const express = require('express');
let mongoose = require('mongoose');
const sinon = require('sinon');
const articleModel = require("../model.js");
const usermodel = require("../usermodel.js");
const chai = require("chai");
const expect = require('chai').expect;
const request = require('supertest');
const chaiHttp = require("chai-http");
const server = require("../app");
const assert = require('assert');
const { should } = require('chai');
chai.should();
chai.use(chaiHttp);


    //testing route for deleting a comment
    describe("deleting a comment",()=>{

        it("should delete a user comment ",(done)=>{
    
           articleModel.findById("5f7ed0affdd9c80004310ca5").then((result)=>{
            let commentid = result.comments[0]._id               
            chai.request(server)
            .delete("/article/:id/comments/" + commentid)
            .end((err,response)=>{
                response.should.have.status(200)
                response.body.should.have.property('message').eql('comment deleted successfully !');
     
                done();
            })
          })
        }) 
    })