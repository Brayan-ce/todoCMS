const mysql = require('mysql2/promise')

let pool

function crearPool() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NOMBRE || 'whoreshub',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  return pool
}

function obtenerPool() {
  if (!pool) crearPool()
  return pool
}

async function ejecutarQuery(sql, params = []) {
  const p = obtenerPool()
  const [resultados] = await p.execute(sql, params)
  return resultados
}

module.exports = { crearPool, obtenerPool, ejecutarQuery }
