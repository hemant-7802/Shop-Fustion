import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const isAuthUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(404).json({ Error: "UnAuthorized User No Token Provided" })
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ Error: "Invalid Token" })
        }
        const user = await User.findById(decodedData.userId)

        if (!user) {
            return res.status(404).json({ Error: "User Not Found" })
        }

        req.user = user
        next();
    } catch (error) {
        console.log("Error in middleware controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const authRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(404).json({ Error: `role: ${req.user.role} is not allowed to access this resource` })
        }
        next()
    }
}