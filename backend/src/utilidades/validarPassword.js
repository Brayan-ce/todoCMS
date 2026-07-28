function validarPassword(password) {
  const errores = []

  if (!password || password.length < 8) {
    errores.push('La contraseña debe tener al menos 8 caracteres')
  }

  if (!/[A-Z]/.test(password)) {
    errores.push('La contraseña debe tener al menos una letra mayúscula')
  }

  if (!/[0-9]/.test(password)) {
    errores.push('La contraseña debe tener al menos un número')
  }

  return {
    valida: errores.length === 0,
    errores,
  }
}

module.exports = validarPassword
