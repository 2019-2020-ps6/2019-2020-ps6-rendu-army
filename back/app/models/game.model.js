const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Game', {
  quiz: Joi.object(),
  answersSelected: Joi.array().required(),
  date: Joi.number(),
  step: Joi.number(),
  rightAnswer: Joi.number(),
  userId: Joi.number(),
  isFinish: Joi.boolean(),
})