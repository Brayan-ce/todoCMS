const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Usuario = require('../modelos/Usuario')
const { generarToken } = require('../utilidades/generarToken')
const validarPassword = require('../utilidades/validarPassword')
const { enviarCodigoVerificacion, enviarCorreoBienvenida, enviarCorreoLogin } = require('../../extras/correo')

function generarCodigo() {
  return String(crypto.randomInt(100000, 999999))
}

const Autenticacion = {
  async registro(req, res) {
    try {
      const { email, password, nombre } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' })
      }

      const validacion = validarPassword(password)
      if (!validacion.valida) {
        return res.status(400).json({ error: validacion.errores.join('. ') })
      }

      const existe = await Usuario.buscarPorEmail(email)
      if (existe) {
        return res.status(409).json({ error: 'El email ya está registrado' })
      }

      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      const usuarioId = await Usuario.crear({ email, password: passwordHash, nombre })

      const codigo = generarCodigo()
      const expiracion = new Date(Date.now() + 10 * 60 * 1000)
      await Usuario.guardarCodigoVerificacion(usuarioId, codigo, expiracion)

      await enviarCodigoVerificacion(email, codigo)

      res.status(201).json({
        mensaje: 'Te enviamos un código de verificación a tu correo',
        email,
        necesitaVerificar: true,
      })
    } catch (error) {
      console.error('Error en registro:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },

  async verificar(req, res) {
    try {
      const { email, codigo } = req.body

      if (!email || !codigo) {
        return res.status(400).json({ error: 'Email y código son requeridos' })
      }

      if (!/^\d{6}$/.test(codigo)) {
        return res.status(400).json({ error: 'El código debe tener 6 dígitos' })
      }

      const usuarioId = await Usuario.verificarCodigo(email, codigo)
      if (!usuarioId) {
        return res.status(400).json({ error: 'Código inválido o expirado' })
      }

      await Usuario.marcarVerificado(usuarioId)

      enviarCorreoBienvenida(email).catch(err => {
        console.error('Error al enviar correo de bienvenida:', err.message)
      })

      const token = generarToken(usuarioId)
      const usuario = await Usuario.buscarPorId(usuarioId)

      res.json({
        mensaje: 'Cuenta verificada exitosamente',
        token,
        usuario,
      })
    } catch (error) {
      console.error('Error en verificación:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },

  async reenviarCodigo(req, res) {
    try {
      const { email } = req.body

      if (!email) {
        return res.status(400).json({ error: 'Email es requerido' })
      }

      const usuario = await Usuario.buscarPorEmail(email)
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      if (usuario.verificado) {
        return res.status(400).json({ error: 'La cuenta ya está verificada' })
      }

      const codigo = generarCodigo()
      const expiracion = new Date(Date.now() + 10 * 60 * 1000)
      await Usuario.guardarCodigoVerificacion(usuario.id, codigo, expiracion)

      await enviarCodigoVerificacion(email, codigo)

      res.json({ mensaje: 'Código reenviado a tu correo' })
    } catch (error) {
      console.error('Error al reenviar código:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' })
      }

      const usuario = await Usuario.buscarPorEmail(email)
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
      }

      const passwordValida = await bcrypt.compare(password, usuario.password)
      if (!passwordValida) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
      }

      if (!usuario.verificado) {
        const codigo = generarCodigo()
        const expiracion = new Date(Date.now() + 10 * 60 * 1000)
        await Usuario.guardarCodigoVerificacion(usuario.id, codigo, expiracion)
        await enviarCodigoVerificacion(email, codigo)

        return res.status(403).json({
          error: 'Cuenta no verificada. Te enviamos un nuevo código a tu correo',
          necesitaVerificar: true,
          email,
        })
      }

      const token = generarToken(usuario.id)

      enviarCorreoLogin(email).catch(err => {
        console.error('Error al enviar correo de login:', err.message)
      })

      res.json({
        mensaje: 'Inicio de sesión exitoso',
        token,
        usuario: { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
      })
    } catch (error) {
      console.error('Error en login:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },

  async actualizarOrientacion(req, res) {
    try {
      const { orientacion } = req.body
      if (!orientacion) {
        return res.status(400).json({ error: 'Orientación es requerida' })
      }

      await Usuario.actualizarOrientacion(req.usuarioId, orientacion)

      res.json({ mensaje: 'Orientación actualizada', orientacion })
    } catch (error) {
      console.error('Error al actualizar orientación:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },

  async perfil(req, res) {
    try {
      const usuario = await Usuario.buscarPorId(req.usuarioId)
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }
      res.json({ usuario })
    } catch (error) {
      console.error('Error al obtener perfil:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  },
}

module.exports = Autenticacion
