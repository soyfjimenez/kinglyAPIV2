/*
import mysql from "promise-mysql";
import config from "./../config.js";

let connection = null;

function createConnection() {
  return mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
  });
}

export async function getConnection() {
    if (!connection || connection.state === 'disconnected') {
        console.log("intento de conexion")
      connection = createConnection();}
    return connection;
  }

export default getConnection;
*/

import mysql from "promise-mysql";
import config from "./../config.js";

const MAX_CONNECTION_IDLE_TIME = 30000; // 30 segundos

let connection = null;
let lastConnectionTime = 0;

async function createConnection() {
  return await mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
  });
}

function shouldCreateNewConnection() {
  const currentTime = Date.now();
  return !connection || currentTime - lastConnectionTime > MAX_CONNECTION_IDLE_TIME;
}

export async function getConnection() {
  if (shouldCreateNewConnection()) {
    console.log("Intento de conexión");
    connection = await createConnection();
    lastConnectionTime = Date.now();
  }

  return connection;
}

export default getConnection;

