const Cards = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotCardOwner = require('../errors/ErrorNotCardOwner');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные при создании.'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new ErrorNotFound('Передан несуществующий _id карточки.');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(err);
      }
    });
};

module.exports.disLikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new ErrorNotFound('Передан несуществующий _id карточки.');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные для снятия лайка.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .orFail(() => {
      throw new ErrorNotFound('Передан несуществующий _id карточки.');
    })
    .then((card) => {
      if (req.user._id !== card.owner.toString()) {
        return next(new ErrorNotCardOwner('Вы не можете удалять чужие карточки.'));
      }
      return String(card._id);
    })
    .then((id) => Cards.findByIdAndRemove(id))
    .then((cardToRemove) => res.send({ data: cardToRemove }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};
