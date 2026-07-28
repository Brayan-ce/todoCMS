const nodemailer = require('nodemailer')

function crearTransportador() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_CORREO,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

function plantillaBase(contenido) {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #1a1a2e; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #FF0055, #cc0044); padding: 28px 24px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 26px; letter-spacing: 2px; text-transform: uppercase;">WhoresHub</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px;">Premium XXX Entertainment</p>
      </div>
      <div style="padding: 32px 28px; background: #16213e;">
        ${contenido}
      </div>
      <div style="background: #0f3460; padding: 18px 24px; text-align: center;">
        <p style="color: rgba(255,255,255,0.4); margin: 0; font-size: 11px;">
          WhoresHub &copy; ${new Date().getFullYear()} &mdash; Todos los derechos reservados.
        </p>
        <p style="color: rgba(255,255,255,0.3); margin: 4px 0 0; font-size: 11px;">
          Este es un correo automático, no respondas a este mensaje.
        </p>
      </div>
    </div>
  `
}

async function enviarCodigoVerificacion(destinatario, codigo) {
  const transportador = crearTransportador()

  const contenido = `
    <h2 style="color: #e94560; margin: 0 0 8px; font-size: 20px;">Verifica tu cuenta</h2>
    <p style="color: #a8b2d1; line-height: 1.6; margin: 0 0 20px; font-size: 14px;">
      Gracias por registrarte en WhoresHub. Usa el siguiente código para activar tu cuenta:
    </p>
    <div style="background: #0f3460; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 20px; border: 1px solid #e94560;">
      <span style="font-size: 36px; font-weight: 700; letter-spacing: 10px; color: #fff; font-family: monospace;">${codigo}</span>
    </div>
    <p style="color: #a8b2d1; line-height: 1.6; margin: 0; font-size: 13px;">
      Este código expira en <strong style="color: #e94560;">10 minutos</strong>. Si no solicitaste este registro, ignora este correo.
    </p>
  `

  const opciones = {
    from: `"WhoresHub" <${process.env.SMTP_CORREO}>`,
    to: destinatario,
    subject: 'Código de verificación - WhoresHub',
    html: plantillaBase(contenido),
  }

  return transportador.sendMail(opciones)
}

async function enviarCorreoLogin(destinatario) {
  const transportador = crearTransportador()

  const contenido = `
    <h2 style="color: #e94560; margin: 0 0 8px; font-size: 20px;">Inicio de sesión</h2>
    <p style="color: #a8b2d1; line-height: 1.6; margin: 0 0 16px; font-size: 14px;">
      Se ha iniciado sesión en tu cuenta de WhoresHub.
    </p>
    <div style="background: #0f3460; border-radius: 8px; padding: 14px 18px; margin-bottom: 16px;">
      <p style="color: #a8b2d1; margin: 0; font-size: 13px;">
        Si no fuiste tú, cambia tu contraseña inmediatamente.
      </p>
    </div>
  `

  const opciones = {
    from: `"WhoresHub" <${process.env.SMTP_CORREO}>`,
    to: destinatario,
    subject: 'Inicio de sesión en WhoresHub',
    html: plantillaBase(contenido),
  }

  return transportador.sendMail(opciones)
}

async function enviarCorreoBienvenida(destinatario) {
  const transportador = crearTransportador()

  const contenido = `
    <h2 style="color: #e94560; margin: 0 0 8px; font-size: 20px;">Bienvenido a WhoresHub</h2>
    <p style="color: #a8b2d1; line-height: 1.6; margin: 0 0 16px; font-size: 14px;">
      Tu cuenta ha sido verificada exitosamente. Ahora puedes disfrutar de todo nuestro contenido.
    </p>
    <div style="background: #0f3460; border-radius: 8px; padding: 14px 18px; margin-bottom: 16px; text-align: center;">
      <p style="color: #64ffda; margin: 0; font-size: 15px; font-weight: 600;">&#10003; Cuenta verificada</p>
    </div>
  `

  const opciones = {
    from: `"WhoresHub" <${process.env.SMTP_CORREO}>`,
    to: destinatario,
    subject: 'Bienvenido a WhoresHub - Cuenta verificada',
    html: plantillaBase(contenido),
  }

  return transportador.sendMail(opciones)
}

module.exports = { enviarCodigoVerificacion, enviarCorreoLogin, enviarCorreoBienvenida }
