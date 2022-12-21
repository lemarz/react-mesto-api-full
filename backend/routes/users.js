const router = require('express').Router();

const {
  avatarJoiValidator,
  idJoiValidator,
  userJoiValidator,
} = require('../middlewares/joiValidator');

const {
  getUsers,
  getUserId,
  updateUserInfo,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserMe);

router.get('/:userId', idJoiValidator('userId'), getUserId);

router.patch('/me', userJoiValidator, updateUserInfo);

router.patch('/me/avatar', avatarJoiValidator, updateAvatar);

module.exports = router;
