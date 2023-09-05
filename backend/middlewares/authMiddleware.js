// external import
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"

// internal import
import User from "../models/User.js"

const jwtVerifier = asyncHandler(async (req, res, next) => {
    const token = req.cookies[process.env.COOKIE_NAME]

    if (token) {

        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.user = await User.findById(decoded.userID).select('-password')

            next()

        } catch (error) {
            res.clearCookie(process.env.COOKIE_NAME)
            res.status(401)
            
            throw new Error('Your are not authorize. Invalid Token')
        }

    } else {
        res.status(401)
        throw new Error('Your are not authorize. No Token')
    }
})

export {
    jwtVerifier
}