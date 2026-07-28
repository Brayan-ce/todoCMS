const { Router } = require('express')
const Autenticacion = require('../controladores/autenticacion')
const validarToken = require('../midleware/validarToken')

const ruta = Router()

ruta.post('/registro', Autenticacion.registro)
ruta.post('/verificar', Autenticacion.verificar)
ruta.post('/reenviar-codigo', Autenticacion.reenviarCodigo)
ruta.post('/login', Autenticacion.login)
ruta.put('/orientacion', validarToken, Autenticacion.actualizarOrientacion)
ruta.get('/perfil', validarToken, Autenticacion.perfil)

module.exports = ruta
