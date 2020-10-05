
let server = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
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




    describe("get/article",()=>{
        it("should not get any article from database",(done)=>{
            chai.request(server).get("/artile").end((err,response)=>{
                response.should.have.status(404);
                done();
            })
        });
    }) 


    //testing GET/article route for getting a particular article
    
    describe("get/article/:id",()=>{
        it("should get an article by id",(done)=>{
            const articleId = '5f6e20183a0fa22e625528ba';
            chai.request(server).get("/article/" + articleId).end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();
            })
        })
    })

//testing a route for posting comment

describe("post/article/:id/comments",()=>{
    it("should add comments to an article ",(done)=>{
        const articleId = '5f6e20183a0fa22e625528ba';
        chai.request(server).get("/article/" + articleId +"/comments").end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
})

//testing route for getting article with comments

describe("get/article/:id/comments",()=>{
    it("should get an article with its comments",(done)=>{
        const articleId = '5f6e20183a0fa22e625528ba';
        chai.request(server).get("/article/" + articleId +"/comments").end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
})

//testing route for updating article

describe("put/article/:id",()=>{

    it("should update an existing  article ",(done)=>{
        const updatedArticleId = "5f6e20183a0fa22e625528ba";
        const newArticle = {
            title:"my article title",
            description:"my article description",
            content:"my new article content",

        }

        chai.request(server).put("/article/" + updatedArticleId).send(newArticle).end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property("title");
            response.body.should.have.property("description");
            response.body.should.have.property("content")
            done();
        })
    })
})     

  //testing route to delete an article

  

  describe("delete/article/:id",()=>{

    it("should delete an existing  article ",(done)=>{
        const updatedArticleId = "5f6e20183a0fa22e625528ba";
        const newArticle = {
            title:"my article title",
            description:"my article description",
            content:"my new article content",

        }

        chai.request(server).put("/article/" + updatedArticleId).send(newArticle).end((err,response)=>{
            response.should.have.status(200);
            done();
        })
    })

})
})
//testing GET default route for getting all articles


  



