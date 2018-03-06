'use strict';

/**
 * App Router
 *
 * @module
 * @author Marcelo Rusconi <mgrusconi@gmail.com>
 */

const Router = require('express');
const controller = require('./app-controller');

const router = new Router();

/**
 * @swagger
 * definitions:
 *   login:
 *     type: object
 *     required:
 *       - email
 *     properties:
 *       email:
 *         type: string
 *         default: "manningblankenship@quotezart.com"
 *         description: e-mail User
 */

/**
 * @swagger
 * /app/login:
 *   post:
 *     tags:
 *       - API v1
 *     summary: Login with User email.
 *     description: Method that allows the user to identify.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Profile
 *         required: true
 *         schema:
 *           $ref: '#/definitions/login'
 *       - name: x-key
 *         in: header
 *         description: API key
 *         required: true
 *         type: string
 *         format: string
 *         default: 2fvTdG53VCp6z8ZbV66h
 *     responses:
 *       200:
 *         description: Profile created!
 */
router.route('/login').post((...args) => controller.login(...args));

/**
 * @swagger
 * /app/getuser/{type}/{value}:
 *   get:
 *     tags:
 *       - API v1
 *     summary: Get User by type (id or name)
 *     description: Method that allows to obtain a user according to his id or name.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: type
 *         in: path
 *         description: User ID
 *         required: true
 *         type: string
 *         default: id
 *       - name: value
 *         in: path
 *         description: User ID
 *         required: true
 *         type: string
 *         default: 031a0925-b531-4e5a-a5f4-059be5f5d9db
 *       - name: x-key
 *         in: header
 *         description: API key
 *         required: true
 *         type: string
 *         format: string
 *         default: 2fvTdG53VCp6z8ZbV66h
 *       - name: user-token
 *         in: header
 *         description: User Token JWT
 *         type: string
 *         format: string
 *         default:
 *     responses:
 *       200:
 *         description: app!
 *         schema:
 *           $ref: ''
 */

router.route('/getuser/:type/:value').get((...args) => controller.getUser(...args));

/**
 * @swagger
 * /app/getpoliciesbyname/{name}:
 *   get:
 *     tags:
 *       - API v1
 *     summary: Get policies by Username
 *     description: Method that allows to obtain a list of policies according to the name of a user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: path
 *         description: User ID
 *         required: true
 *         type: string
 *         default: Lamb
 *       - name: x-key
 *         in: header
 *         description: API key
 *         required: true
 *         type: string
 *         format: string
 *         default: 2fvTdG53VCp6z8ZbV66h
 *       - name: user-token
 *         in: header
 *         description: User Token JWT
 *         type: string
 *         format: string
 *         default:
 *     responses:
 *       200:
 *         description: app!
 *         schema:
 *           $ref: ''
 */

router.route('/getpoliciesbyname/:name').get((...args) => controller.getPoliciesByUser(...args));

/**
 * @swagger
 * /app/getuserbypolicy/{id}:
 *   get:
 *     tags:
 *       - API v1
 *     summary: Get User by policy id
 *     description: Method that allows to obtain a user a user according to the id of a policy.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Policy ID
 *         required: true
 *         type: string
 *         default: 64cceef9-3a01-49ae-a23b-3761b604800b
 *       - name: x-key
 *         in: header
 *         description: API key
 *         required: true
 *         type: string
 *         format: string
 *         default: 2fvTdG53VCp6z8ZbV66h
 *       - name: user-token
 *         in: header
 *         description: User Token JWT
 *         type: string
 *         format: string
 *         default:
 *     responses:
 *       200:
 *         description: app!
 *         schema:
 *           $ref: ''
 */

router.route('/getuserbypolicy/:id').get((...args) => controller.getUserByPolicy(...args));

module.exports = router;