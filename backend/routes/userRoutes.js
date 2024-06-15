import expres from 'express'
import { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById } from '../controllers/userController.js'
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'

const router = expres.Router()

router.route('/')
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)

router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile)

// Admin Routes

router.route('/:id')
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById)

export default router