'use strict';

/**
 * Punto de entrada de la aplicacion.
 * Entry Point of the application.
 *
 * @module
 * @author Marcelo G. Rusconi <mgrusconi@gmail.com>
 */

const app = require('./middlewares/express');

// Constants
const PORT = 80;
app.listen(PORT);