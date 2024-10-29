import "dotenv/config"
import pg from "pg"

const { Pool } = pg

const connectionString = `postgres://postgres:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const pool = new Pool({
  allowExitOnIdle: true,
  connectionString,
})

try {
  await pool.query("SELECT NOW()")
  console.log("Base de datos en linea")
} catch (error) {
  console.log(error)
}

export const db = pool
