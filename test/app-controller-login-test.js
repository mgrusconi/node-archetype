
require('chai/register-should');
const request = require('supertest');
const app = require('../server/middlewares/express');

describe('App Controller Login Method', ()=>{
  
  it('Successful login test', (done) => {
    let req = {'email': 'manningblankenship@quotezart.com'};
    request(app)
      .post('/app/login')
      .set('x-key', '2fvTdG53VCp6z8ZbV66h')
      .send(req)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.have.property('user_token');
        done();
      });
  });

  it('Error login - User not Found test', (done) => {
    let req = {'email': 'anymail@quotezart.com'};
    request(app)
      .post('/app/login')
      .set('x-key', '2fvTdG53VCp6z8ZbV66h')
      .send(req)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        should.not.exist(err);
        res.body.message.should.equal('User not Found');
        done();
      });
  });

  it('Error login - Bad API Key test', (done) => {
    let req = {'email': 'anymail@quotezart.com'};
    request(app)
      .post('/app/login')
      .set('x-key', '2fvTdG53VCp6z8ZbV66')
      .send(req)
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        should.not.exist(err);
        res.body.message.should.equal('Invalid API Key');
        done();
      });
  });

});