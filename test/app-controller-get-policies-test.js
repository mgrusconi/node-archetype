
require('chai/register-should');
const request = require('supertest');
const app = require('../server/middlewares/express');

describe('App Controller get list polices by user Method', ()=>{
  
  let adminToken = null;
  before(function(done) {
    let req = {'email': 'manningblankenship@quotezart.com'};
    request(app)
      .post('/app/login')
      .set('x-key', '2fvTdG53VCp6z8ZbV66h')
      .send(req)
      .end((err, res) => {
        adminToken = res.body.user_token;
        done();
      });
  });

  it('Error - Bad API Key Test', (done) => {
    request(app)
      .get('/app/getpoliciesbyname/Whitley')
      .set('x-key', 'badApiToken')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        should.not.exist(err);
        res.body.message.should.equal('Invalid API Key');
        done();
      });
  });

  it('Error - Bad User Token', (done) => {
    request(app)
      .get('/app/getpoliciesbyname/Whitley')
      .set({'x-key': '2fvTdG53VCp6z8ZbV66h', 'user-token': 'badUserToken'})
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        should.not.exist(err);
        res.body.message.should.equal('Invalid User Token');
        done();
      });
  });

  it('Error - Get User by Name not found Test', (done) => {   
    request(app)
      .get('/app/getpoliciesbyname/anyUser')
      .set({'x-key': '2fvTdG53VCp6z8ZbV66h', 'user-token': adminToken})
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        should.not.exist(err);
        res.body.message.should.equal('User not Found');
        done();
      });
  });

  it('Error - Get User by Name Policies not found Test', (done) => {   
    request(app)
      .get('/app/getpoliciesbyname/Whitley')
      .set({'x-key': '2fvTdG53VCp6z8ZbV66h', 'user-token': adminToken})
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        should.not.exist(err);
        res.body.message.should.have.equal('Policies not Found');
        done();
      });
  });

  it('Successful - Get User by Name Test', (done) => {   
    request(app)
      .get('/app/getpoliciesbyname/Manning')
      .set({'x-key': '2fvTdG53VCp6z8ZbV66h', 'user-token': adminToken})
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.have.property('policies');
        done();
      });
  });

});