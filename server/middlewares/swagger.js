'use strict';

/**
 * Modulo que contiene la implementacion de Swagger.
 * Module containing the Swagger implementation.
 *
 * @module
 * @author Marcelo G. Rusconi <mgrusconi@gmail.com>
 */

const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./../config/');
const appPath = __dirname + '/../' + config.routes;

const swaggerDefinition = {
  info: {
    title: config.title,
    version: config.version,
    description: config.description
  },
  basePath: '/'
};

const options = {
  swaggerDefinition,
  apis: [appPath]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;