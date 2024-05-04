import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import genToken from "../utils/genJwtTokens.js";
import getPasswordResetToken from "../utils/genPasswordResetToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto"
import sendToken from "../utils/sendToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, email, contact, password, confirmPassword, avatar, role } = req.body;

        if (password !== confirmPassword) {
            res.status(500).json({ error: "Password do not match" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(500).json({ message: "User already exist." })
        }

        const contactNumber = await User.findOne({ contact })

        if (contactNumber) {
            return res.status(500).json({ message: "Mobile Number already exist." })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            contact,
            password: hashedPassword,
            avatar,
            role,
        })

        if (newUser) {
            genToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({ newUser })
        } else {
            res.status(404).json("Invalid User Data")
        }

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Email or Password" })
        }

        // genToken(user._id, res)
        sendToken(user, 200, res)
        // res.status(200).json({
        //     _id: user._id,
        //     fullName: user.fullName,
        //     email: user.email,
        // })
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const forgetPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    try {

        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }

        const resetToken = getPasswordResetToken(user);
        await user.save({ validateBeforeSave: false })

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`

        const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email, please ignore it`

        await sendEmail({
            email: user.email,
            subject: `Password Recovery`,
            message,
        })

        res.status(200).json({ message: `Email Sent to ${user.email} successfully.` })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        console.log("Error in forget password controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ error: "Reset password token is invalid or has been expire" })
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ error: "Password do not match" })
        }

        let password = req.body.password;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        password = hashedPassword

        user.password = password;
        user.resetPasswordToken = undefined,
            user.resetPasswordExpire = undefined

        await user.save().then(() => {
            console.log("user saved successfully")
        }).catch((err) => { console.log(err.message) })

        sendToken(user, 200, res)
    } catch (error) {
        console.log("Error reset password controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in get user details controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("+password")

        const isPasswordMatched = await bcryptjs.compare(req.body.oldPassword, user.password)

        if (!isPasswordMatched) {
            return res.status(400).json({ error: "Old password is incorrect" })
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({ error: "Password do not match" })
        }

        let password = req.body.newPassword;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        password = hashedPassword
        user.password = password

        await user.save();
        sendToken(user, 200, res)
    } catch (error) {
        console.log("Error in update password controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const newUser = {
            fullName: req.body.fullName,
            email: req.body.email,
        }
        console.log("newUser", newUser)

        const user = await User.findByIdAndUpdate(req.user.id, newUser, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({ success: true, })
    } catch (error) {
        console.log("Error in update profile controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const user = await User.find()

        res.status(200).json(user)
    } catch (error) {
        console.log("Error in get all user controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(400).json({ error: `User doesn't exist with Id: ${req.params.id}` })
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in get single user controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// update user-role --admin
export const updateUserRole = async (req, res) => {
    try {
        const newUser = {
            name: req.body.fullName,
            email: req.body.email,
            role: req.body.role,
        }

        const user = await User.findByIdAndUpdate(req.params.id, newUser, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })

        res.status(200).json({ success: true })
    } catch (error) {
        console.log("Error in update admin profile controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// delete user --admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(500).json({ error: `User does not exist with id: ${req.params.id}` })
        }

        await user.deleteOne();

        res.status(200).json({ message: "User deleted successfully." })
    } catch (error) {
        console.log("Error in delete user controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}