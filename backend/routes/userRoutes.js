// external import
import express from 'express'

// internal import
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js'

import { jwtVerifier } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/registration', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile')
    .get(jwtVerifier, getUserProfile)
    .put(jwtVerifier, updateUserProfile)

export default router