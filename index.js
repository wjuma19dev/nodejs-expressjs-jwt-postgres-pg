import express from "express"
import "dotenv/config"

import userRouter from "./router/user.router.js"

const app = express()
const port = process.env.port ?? 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/users", userRouter)

app.listen(port, console.log(`Servidor corriendo en el puerto ${port}`))
