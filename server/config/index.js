'use strict';

/**
 * Modulo que unifica las configuraciones.
 * Module that unifies the configs.
 * 
 * @module
 * @author Marcelo G. Rusconi <mgrusconi@gmail.com>
 */

const _ = require('lodash');

module.exports = _.extend(
  require('./common'),
  require('./security'),
  require('./resources')
);
