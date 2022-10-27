import Joi from 'joi'

export const environmentSchema = Joi.object({
    DISCORD_BOT_TOKEN: Joi.string().required(),
}).unknown(true)
