const { Router } = require('express')
const autenticacionRutas = require('./autenticacion')

const ruta = Router()

ruta.use('/auth', autenticacionRutas)

ruta.get('/health', (req, res) => {
  res.json({ estado: 'ok', timestamp: new Date().toISOString() })
})

module.exports = ruta
