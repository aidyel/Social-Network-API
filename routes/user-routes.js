const router = require('express').Router();

const { 
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  deleteFriendFromUser,
} = require('../controllers/user-controller');

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:id/friends/:friendId')
  .post(addFriendToUser)
  .delete(deleteFriendFromUser);

module.exports = router;