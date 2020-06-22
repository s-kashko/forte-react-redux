import Joi from '@hapi/joi';

export default {
    default: (value) => {
        const { error: { message } = {} } = Joi.string()
            .min(3)
            .max(30)
            .required()
            .validate(value);
        return message ? message : '';
    },
    passengers: (value) => {
        if (value === '') return ''
        const { error: { message } = {} } = Joi.number()
            .min(0)
            .integer()
            .required()
            .validate(value)
        return message ? message : '';
    }
};