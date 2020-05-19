const Joi = require('joi');
const BaseModel = require('../utils/base-model');

module.exports = new BaseModel('Setting', {
    color: Joi.string(),
    font: Joi.number(),
    light: Joi.number(),
    t2sOn: Joi.boolean(),
    id: Joi.number(),
})