// external import
import asyncHandler from 'express-async-handler'

// internal import
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).exec()
    console.log(email, password)

    if (user && await user.matchPassword(password)) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid Email or password')
    }
})

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email }).exec()

    if (userExists) {
        res.status(400)
        throw new Error(`'${email}' This email is already used`)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME)
    res.status(201).json({
        message: "Logout successfully!"
    })
    res.end()
})

// @desc Get user profile
// route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'User profile',
        user: req.user
    })
})


// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password && req.body.oldPassword) {
            if (await user.matchPassword(req.body.oldPassword)) {
                user.password = req.body.password

            } else {
                throw new Error('Your password is wrong')
            }
        }

    } else {
        res.status(404)
        throw new Error('User not found')
    }

    const updateUser = await user.save()

    res.status(201).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email
    })
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}