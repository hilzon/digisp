const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        userSchemas: Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            // nama: Joi.string().nama_user(),
            // hp: Joi.number().hp_user(),
            // alamat: Joi.string().alamat_user(),
            // tagihan: Joi.string().tagihan_user(),
            // image: Joi.string().image_user(),
            // status: Joi.string().status_user()
        })
    } 
}
