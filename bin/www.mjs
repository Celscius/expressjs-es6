#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.mjs'
import DBG from 'debug'
import http from 'http'

const debug = DBG('notes:server-debug'); 
const error = DBG('notes:server-error'); 

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

/*
  get ip address
  using require("os")
  get local address from network interface
  get networkInterfaces()
  networkInterfaces["Wi-Fi"][1].address //get address 192.168.1.4
  networkInterfaces["Loopback Pseudo-Interface 1"][1].address //get address 127.0.0.1
  os.hostname(); //get host name e.g collasour
*/

import os from 'os'
const networkInterfaces = os.networkInterfaces();
const wifi = "Wi-Fi"
const loopback = "Loopback Pseudo-Interface 1"
const address_wifi = networkInterfaces[wifi][1].address 
const address_loopback = networkInterfaces[loopback][1].address
const localhost = 'localhost'  
/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
 
app.listen(port,address_wifi,localhost, () => {
  console.log(`> listening on port ${address_wifi}:${port}\n`)
  //console.log(`> listening on port ${address_loopback}:${port}`)
})
//server.listen(port);
server.on('error', onError);
server.on('listening', onListening,);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
