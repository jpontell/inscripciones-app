const { Pool } = require("pg");

const pool = new Pool({
  host: "TU_HOST_RENDER",        // Host que te da Render
  user: "TU_USUARIO_RENDER",
  password: "TU_PASSWORD_RENDER",
  database: "NOMBRE_DB_RENDER",
  port: 5432,
  ssl: { rejectUnauthorized: false } // obligatorio en Render
});

module.exports = pool;
