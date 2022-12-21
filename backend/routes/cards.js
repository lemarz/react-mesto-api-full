const router = require('express').Router();

const {
  cardJoiValidator,
  idJoiValidator,
} = require('../middlewares/joiValidator');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', cardJoiValidator, createCard);

router.delete('/:cardId', idJoiValidator('cardId'), deleteCard);

router.put('/:cardId/likes', idJoiValidator('cardId'), likeCard);

router.delete('/:cardId/likes', idJoiValidator('cardId'), disLikeCard);

module.exports = router;
