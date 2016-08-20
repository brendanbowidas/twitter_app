/* eslint-disable */
var webpack = require('webpack')
var merge = require('webpack-merge')
var base = require('./webpack.base.config.js')
var production = require('./webpack.production.config.js')
var validate = require('webpack-validator')
var Joi = require('webpack-validator').Joi
require('babel-polyfill')


// allows the 'vue', and 'babel' keys in webpack-validator
var extension = Joi.object({
  vue: Joi.any(),
  babel: Joi.any(),
  fastUnsafe: Joi.any()
})
var config = merge(base, production)

module.exports = validate(config, {
  schemaExtension: extension
})
