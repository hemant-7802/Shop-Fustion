import genToken from "./genJwtTokens.js"

const sendToken = (user, statusCode, res) => {
  const token = genToken(user._id, res)

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly:true,
  };
  

  res.status(statusCode).cookie("token", token, options).json({
    user,
    token,
  });
};

export default sendToken;