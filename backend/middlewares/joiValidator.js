const { celebrate, Joi } = require('celebrate');

const urlValidator = (value, helpers) => {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

  if (!regex.test(value)) {
    return helpers.error('Ссылка не валидна');
  }
  return value;
};

module.exports.registerJoiValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidator),
  }),
});

module.exports.loginJoiValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.avatarJoiValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidator),
  }),
});

module.exports.cardJoiValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidator),
  }),
});

module.exports.userJoiValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.idJoiValidator = (nameId) => celebrate({
  params: Joi.object().keys({
    [nameId]: Joi.string().hex().length(24),
  }),
});
