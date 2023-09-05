import jwt from 'jsonwebtoken'

export default function generateToken(res, userID) {

    const token = jwt.sign({userID}, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    })

    res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}