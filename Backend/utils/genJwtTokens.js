import jwt from "jsonwebtoken"

const genToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })

    res.cookie("jwt", token, {
        maxAge: (process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    })

    return token;
}

export default genToken;