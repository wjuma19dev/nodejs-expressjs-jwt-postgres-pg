import jwt from "jsonwebtoken"
const secret = process.env.JWT_SECRET

export const generateJWT = async (payload) => {
  try {
    const token = jwt.sign(payload, secret, { expiresIn: "1h" })
    return token
  } catch (error) {
    throw new Error(error.message)
  }
}
