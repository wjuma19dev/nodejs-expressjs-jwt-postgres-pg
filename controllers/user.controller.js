import "dotenv/config"
import bcryptjs from "bcryptjs"

// Modelos de base de datos
import { UserModel } from "../models/user.model.js"
import { generateJWT } from "../utils/generateJWT.js"

export const registerCtrl = async (req, res, next) => {
  try {
    const { username, password, email } = req.body

    const user = await UserModel.findOneByEmail(email)

    if (user) {
      return res.status(400).json({
        status: false,
        message: "El correo ya existe",
      })
    }

    // Password encrypted
    const salt = await bcryptjs.genSalt(10)
    const passwordHashed = await bcryptjs.hash(password, salt)

    // Create and save new user
    const newUser = await UserModel.create({
      username,
      password: passwordHashed,
      email,
    })

    // Generate Json Web Token
    const payload = {
      uid: newUser.uid,
      username: newUser.username,
      email: newUser.email,
    }
    const token = await generateJWT(payload)

    res.json({
      status: true,
      message: "Registro de usuario exitoso",
      token,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    })
  }
}

export const loginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.findOneByEmail(email)
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Credenciales invalidas, vuelve a intentar",
      })
    }

    // Comparar contraseña
    const passwordIsValid = await bcryptjs.compare(password, user.password)
    if (!passwordIsValid) {
      return res.status(404).json({
        status: false,
        message: "Credenciales invalidas, vuelve a intentar",
      })
    }

    // Generate Json Web Token
    const payload = {
      uid: user.uid,
      username: user.username,
      email: user.email,
    }
    const token = await generateJWT(payload)

    res.json({
      status: true,
      message: "Login successfully",
      token,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    })
  }
}
