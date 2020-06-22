import Joi from '@hapi/joi';

export default {
    default: (value) => {
        const { error: { message } = {} } = Joi.string()
            .min(3)
            .max(150)
            .required()
            .validate(value);
        return message ? message : '';
    },
    diameter: (value) => {
        if (value === '') return '"value" is not allowed to be empty'
        const { error: { message } = {} } = Joi.number()
            .integer()
            .positive()
            .less(1e15)
            .validate(value);
        return message ? message : '';
    },
    population: (value) => {
        if (value === '') return '';
        const { error: { message } = {} } = Joi.number()
            .integer()
            .min(0)
            .validate(value);
        return message ? message : '';
    },
    rotation_period: (value) => {
        if (value === '') return '"value" is not allowed to be empty'
        const { error: { message } = {} } = Joi.number()
            .positive()
            .integer()
            .less(100)
            .required()
            .validate(value)
        return message ? message : '';
    }
};