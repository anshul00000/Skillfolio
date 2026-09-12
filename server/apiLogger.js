// ============================================
// SIMPLE BACKEND API LOGGER (No Dependencies)
// Copy this to your backend project
// ============================================

/**
 * Simple API Logger Middleware for Express.js
 * No external dependencies required
 */

const apiLogger = (req, res, next) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  const timestamp = new Date().toLocaleString();

  // Log Request 
  console.log('\n================================================================================');
  console.log(`📥 REQUEST [${requestId}] - ${timestamp}`);
  console.log('================================================================================');
  console.log(`${req.method} ${req.originalUrl || req.url}`);
  console.log(`IP: ${req.ip || req.connection.remoteAddress}`);
  
  // Log Headers
  console.log('\nHeaders:');
  Object.keys(req.headers).forEach(key => {
    if (key.toLowerCase() === 'authorization') {
      console.log(`  ${key}: ${req.headers[key].substring(0, 20)}...`);
    } else {
      console.log(`  ${key}: ${req.headers[key]}`);
    }
  });

  // Log Query Parameters
  if (Object.keys(req.query).length > 0) {
    console.log('\nQuery Params:', JSON.stringify(req.query, null, 2));
  }

  // Log Request Body
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('\nRequest Body:');
    const sanitizedBody = { ...req.body };
    ['password', 'token', 'secret'].forEach(field => {
      if (sanitizedBody[field]) sanitizedBody[field] = '***HIDDEN***';
    });
    console.log(JSON.stringify(sanitizedBody, null, 2));
  }

  // Capture response
  const originalJson = res.json;
  let responseBody;

  res.json = function (data) {
    responseBody = data;
    originalJson.call(this, data);
  };

  // Log Response
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log('\n================================================================================');
    console.log(`📤 RESPONSE [${requestId}] - ${duration}ms`);
    console.log('================================================================================');
    console.log(`Status: ${res.statusCode}`);
    console.log(`Duration: ${duration}ms`);

    if (responseBody) {
      console.log('\nResponse Body:');
      console.log(JSON.stringify(responseBody, null, 2));
    }
    console.log('================================================================================\n');
  });

  next();
};

/**
 * Socket.IO Logger (Simple Version)
 */
const socketLogger = (io) => {
  io.on('connection', (socket) => {
    console.log('\n🔌 SOCKET CONNECTED:', socket.id);
    console.log('   IP:', socket.handshake.address);

    // Log incoming events
    socket.onAny((event, ...args) => {
      console.log('\n⚡ SOCKET RECEIVED:', event);
      console.log('   Data:', JSON.stringify(args, null, 2));
    });

    // Log outgoing events
    const originalEmit = socket.emit.bind(socket);
    socket.emit = function(event, ...args) {
      console.log('\n📡 SOCKET SENT:', event);
      console.log('   Data:', JSON.stringify(args, null, 2));
      return originalEmit(event, ...args);
    };

    socket.on('disconnect', (reason) => {
      console.log('\n🔌 SOCKET DISCONNECTED:', socket.id);
      console.log('   Reason:', reason);
    });
  });
};

module.exports = { apiLogger, socketLogger };

// ============================================
// USAGE IN YOUR BACKEND
// ============================================
/*

// In your server.js or app.js:

const express = require('express');
const { apiLogger, socketLogger } = require('./BACKEND_LOGGER_SIMPLE');

const app = express();

// IMPORTANT: Add body parser BEFORE logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add logger middleware
app.use(apiLogger);

// Your routes
app.get('/user', (req, res) => {
  res.json({ user: 'data' });
});

app.post('/login', (req, res) => {
  res.json({ token: 'abc123' });
});

const server = app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
  console.log('✅ API Logger is active!');
});

// For Socket.IO (if using):
const io = require('socket.io')(server);
socketLogger(io);

*/
