const { ejecutarQuery } = require('../../DB/db')

const Usuario = {
  async crear({ email, password, nombre = null }) {
    const resultado = await ejecutarQuery(
      'INSERT INTO usuarios (email, password, nombre) VALUES (?, ?, ?)',
      [email, password, nombre]
    )
    return resultado.insertId
  },

  async buscarPorEmail(email) {
    const rows = await ejecutarQuery(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    )
    return rows.length > 0 ? rows[0] : null
  },

  async buscarPorId(id) {
    const rows = await ejecutarQuery(
      'SELECT id, email, nombre, verificado, orientacion, creado_en FROM usuarios WHERE id = ?',
      [id]
    )
    return rows.length > 0 ? rows[0] : null
  },

  async guardarCodigoVerificacion(usuarioId, codigo, expiracion) {
    await ejecutarQuery(
      'UPDATE usuarios SET codigo_verificacion = ?, codigo_expiracion = ? WHERE id = ?',
      [codigo, expiracion, usuarioId]
    )
  },

  async verificarCodigo(email, codigo) {
    const rows = await ejecutarQuery(
      `SELECT id FROM usuarios
       WHERE email = ? AND codigo_verificacion = ? AND codigo_expiracion > NOW() AND verificado = 0`,
      [email, codigo]
    )
    return rows.length > 0 ? rows[0].id : null
  },

  async marcarVerificado(id) {
    await ejecutarQuery(
      'UPDATE usuarios SET verificado = 1, codigo_verificacion = NULL, codigo_expiracion = NULL WHERE id = ?',
      [id]
    )
  },

  async actualizarOrientacion(id, orientacion) {
    const orientacionesValidas = ['hetero', 'gay', 'lesbian', 'bisexual', 'trans', 'todos']
    if (!orientacionesValidas.includes(orientacion)) {
      throw new Error('Orientación no válida')
    }
    await ejecutarQuery(
      'UPDATE usuarios SET orientacion = ? WHERE id = ?',
      [orientacion, id]
    )
  },

  async actualizarPassword(id, nuevaPassword) {
    await ejecutarQuery(
      'UPDATE usuarios SET password = ? WHERE id = ?',
      [nuevaPassword, id]
    )
  },
}

module.exports = Usuario
