const Joi = require('joi');

type joiSchemas = {
    [key: string]: any;
}

const JoiSchemasObj: joiSchemas = {
    roles: Joi.object({
        name: Joi.string().required(),
    })
};
export default JoiSchemasObj
