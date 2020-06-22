import Joi from '@hapi/joi';

export default {
    default: (value) => {
        const { error: { message } = {} } = Joi.string()
            .required()
            .validate(value);
        return message ? message : '';
    },
    name: (value) => {
        const { error: { message } = {} } = Joi.string()
            .min(3)
            .max(30)
            .required()
            .validate(value);
        return message ? message : '';
    },
    height: (value) => {
        if (value === '') return '"value" is not allowed to be empty'
        const { error: { message } = {} } = Joi.number()
            .integer()
            .positive()
            .less(250)
            .validate(value);
        return message ? message : '';
    },
    mass: (value) => {
        if (value === '') return '"value" is not allowed to be empty'
        const { error: { message } = {} } = Joi.number()
            .integer()
            .positive()
            .less(250)
            .validate(value);
        return message ? message : '';
    },
    gender: (value) => {
        const { error: { message } = {} } = Joi.string().valid('male', 'female', '').validate(value)
        return message ? message : '';
    },
    birth_year: (value) => {
        if (value === '') return '';
        const { error: { message } = {} } = Joi.number().positive().validate(value)
        return message ? message : '';
    }
};