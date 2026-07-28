const jwt = require('jsonwebtoken')

function generarToken(usuarioId) {
  return jwt.sign(
    { id: usuarioId },
    process.env.JWT_SECRET || 'whoreshub_jwt_secret_super_seguro_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

function verificarToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'whoreshub_jwt_secret_super_seguro_2026')
  } catch (error) {
    return null
  }
}

module.exports = { generarToken, verificarToken }
