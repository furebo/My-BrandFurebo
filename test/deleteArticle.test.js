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



describe("delete/article/:id",()=>{
    it("should delete an existing  article ",(done)=>{
        let token = " ";
            const newArticle = {
                _id:"5f9abcc557cd8100044d4d5b",
                title:"new title3",
                description:"new description2",
                articleImage:"uploads/database.png",
                content:"content of new article2",
            }

            const valid_input = {
                "name": "furebo",
                "password": "fode123"
            }
            chai.request(server)
              .post('/loginuser')
              .send(valid_input)
              .then((login_response)=>{
               token = 'Bearer ' + login_response.body.token;

                chai.request(server)
                .delete('/article/' + newArticle._id)
                .set('authorization',token)
                .end((err,response)=>{
                    response.should.have.status(200);
                    //response.body.should.have.property('message').eql("Article deleted !");
                    done();
                })
                
            })  
        })
    })