import crypto from "crypto";
import User from "../models/user.model.js";

const getPasswordResetToken = (user) => {
    const resetToken = crypto.randomBytes(20).toString("hex")

    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    
    const resetPasswordExpire = Date.now() + 15 * 60 * 1000

    user.resetPasswordToken = resetPasswordToken
    user.resetPasswordExpire = resetPasswordExpire
    
    return resetToken
}

export default getPasswordResetToken;