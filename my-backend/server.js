// server.js
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Proxy requests to the external API
app.use('/api', proxy('https://freetestapi.com', {
  proxyReqPathResolver: function(req) {
    // This function modifies the path of the incoming request
    // to match the external API's path structure
    return `/api/v1${req.url}`;
  }
}));

app.post('/auth/logout', (req, res) => {
  const userData = req.body;
  // Here you can handle the userData, for example, authenticate the user
  // For now, we'll just return the received data as a response
  res.json({
    message: 'Logged Out Successfully',
    data: userData
  });
});

// Proxy requests to the external API
app.post('/auth/signin', (req, res) => {
  const userData = req.body;
  // Here you can handle the userData, for example, authenticate the user
  // For now, we'll just return the received data as a response
  res.json({
    message: 'User signed in successfully - Normal',
    data: userData
  });
});

app.post('/auth/signin/google', (req, res) => {
  const userData = req.body;
  // Here you can handle the userData, for example, authenticate the user
  // For now, we'll just return the received data as a response
  res.json({
    message: 'User signed in successfully - Google',
    data: userData
  });
});

app.post('/auth/signin/facebook', (req, res) => {
  const userData = req.body;
  // Here you can handle the userData, for example, authenticate the user
  // For now, we'll just return the received data as a response
  res.json({
    message: 'User signed in successfully - Facebook',
    data: userData
  });
});

// Proxy requests to the external API
app.post('/auth/signup', (req, res) => {
  const userData = req.body;
  // Here you can handle the userData, for example, authenticate the user
  // For now, we'll just return the received data as a response
  res.json({
    message: 'User signed in successfully - Normal',
    data: userData
  });
});

app.post('/auth/signup/google', (req, res) => {
  const userData = req.body;
  // Here you can handle the userData, for example, authenticate the user
  // For now, we'll just return the received data as a response
  res.json({
    message: 'User signed in successfully - Google',
    data: userData
  });
});

app.post('/auth/signup/facebook', (req, res) => {
  const userData = req.body;
  // Here you can handle the userData, for example, authenticate the user
  // For now, we'll just return the received data as a response
  res.json({
    message: 'User signed in successfully - Facebook',
    data: userData
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});