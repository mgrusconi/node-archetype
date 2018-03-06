'use strict';

/**
 * Modulo que contiene la configuracion genérica.
 *
 * @module
 * @author Marcelo G. Rusconi <mgrusconi@gmail.com>
 */

const gulp = require('gulp');
const eslint  = require('gulp-eslint');

gulp.task('eslint', () => {
  return gulp.src([
    '**/*.js',
    '!server/config.js',
    '!built{,/**}',
    '!node_modules{,/**}'
  ])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', ['eslint'] );