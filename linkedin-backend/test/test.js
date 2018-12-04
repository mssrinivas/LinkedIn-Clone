var assert = require('chai').assert;
// var first = require('../routes/users.js');
// var second = require('../routes/search.js');
// var third = require('../routes/dashboard.js');
// var fourth = require('../routes/booking.js');
var request = require("request");
var expect = require("chai").expect;
var app = require('../app.js')
var chai = require("chai");
var chaiHttp = require('chai-http');
chai.use(chaiHttp);


var request = require('request'), assert = require("assert"), http = require("http");
describe('API testing of  major functionalities', function() {
  it('Checking whether a user who has not account can sign up', function(done) {
      request.post('http://localhost:3001/users/signup', {
          form : {
                  	"first_name": "Michael",
                  	"last_name":"Sinha",
                  	"email":"michael134@gmail.com",
                  	"password":"secret"
                }
      }, function(error, response) {
          //console.log("mocha response",response);
          expect(response).to.have.status(200);
          assert.equal(200, response.statusCode);
          done();
      });
  });
    it('Checking whether a user who has account can login', function(done) {
        request.post('http://localhost:3001/users/login', {
            form : {
                email : 'michael134@gmail.com',
                password : 'secret'
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });
    it('Checking whether a logged in user can view an applied job', function(done) {
        request.get('http://localhost:3001/applications/applied/:5c01a013cbc10ea70ad3497d', {
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });
    it('Checking whether an logged in user can view the conversations', function(done) {
        request.get('http://localhost:3001/messages/ainbox/:5c01a013cbc10ea70ad3497d', {
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
  });
  it('Checking whether a user who has an logged in can view all the jobs', function(done) {
      request.get('http://localhost:3001/jobs/search', {
      }, function(error, response) {
          //console.log("mocha response",response);
          expect(response).to.have.status(200);
          assert.equal(200, response.statusCode);
          done();
      });
  });
});
