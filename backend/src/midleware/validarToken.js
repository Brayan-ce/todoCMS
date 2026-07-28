const { verificarToken } = require('../utilidades/generarToken')

function validarToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  const token = authHeader.split(' ')[1]
  const decodificado = verificarToken(token)

  if (!decodificado) {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }

  req.usuarioId = decodificado.id
  next()
}

module.exports = validarToken
