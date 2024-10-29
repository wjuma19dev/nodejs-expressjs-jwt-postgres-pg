import express from "express"
import "dotenv/config"

const app = express()
const port = process.env.port ?? 4000

app.listen(port, console.log(`Servidor corriendo en el puerto ${port}`))
