const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const envPath = path.resolve(__dirname, '..', '.env')
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath })
}

const rutas = require('./rutas/index')
const { crearPool } = require('../DB/db')

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

app.use(express.json())

app.use('/api', rutas)

app.use((err, req, res, next) => {
  console.error('Error no controlado:', err)
  res.status(500).json({ error: 'Error interno del servidor' })
})

async function iniciarBaseDeDatos() {
  try {
    crearPool()
    console.log('Base de datos conectada exitosamente')
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message)
    process.exit(1)
  }
}

module.exports = { app, iniciarBaseDeDatos }
