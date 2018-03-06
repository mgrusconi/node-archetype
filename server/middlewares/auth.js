'use strict';

/**
 * Modulo que valida el Json Web Token.
 * Module that validates the Json Web Token.
 *
 * @module
 * @author Marcelo G. Rusconi <mgrusconi@gmail.com>
 */

const jwt = require('jsonwebtoken');
const config = require('../config/');

module.exports = (req,res,next) => {

  if(req.url == '/app/login'){
    next();
  }
  
  const key = config.security.private_key;
  let token = (req.body && req.body.user_token) || (req.query && req.query.user_token) || req.headers['user-token'];

  if (token) {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({
          'status': 401,
          'name': 'JsonWebTokenError',
          'message': 'Invalid User Token'
        });
        return;
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};