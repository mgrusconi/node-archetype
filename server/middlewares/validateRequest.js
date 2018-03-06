'use strict';

/**
 * Modulo que valida la API Key.
 * Module that validates the API Key.
 *
 * @module
 * @author Marcelo G. Rusconi <mgrusconi@gmail.com>
 */

const config = require('../config/');

module.exports = function(req,res,next){
  let key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if(key && key === config.security.api_key) {
    next();
  }else{
    res.status(401);
    res.json({
      'status': 401,
      'message': 'Invalid API Key'
    });
    return;
  }
};