const { app, iniciarBaseDeDatos } = require('./src/app')

const PORT = parseInt(process.env.PORT) || 4000

async function main() {
  await iniciarBaseDeDatos()

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
    console.log(`API disponible en http://localhost:${PORT}/api`)
    console.log(`Health check: http://localhost:${PORT}/api/health`)
  })
}

main().catch((error) => {
  console.error('Error al iniciar el servidor:', error)
  process.exit(1)
})
