// server.js
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const morgan = require('morgan');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Define a custom token to log request and response bodies
morgan.token('req-body', (req) => JSON.stringify(req.body));
morgan.token('res-body', (req, res) => {
  let oldWrite = res.write,
      oldEnd = res.end;
  let chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);
    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) chunks.push(chunk);
    let body = Buffer.concat(chunks).toString('utf8');
    res.body = body;
    oldEnd.apply(res, arguments);
  };

  return res.body;
});

// Use Morgan middleware for logging requests and responses
morgan.token('req-headers', (req) => JSON.stringify(req.headers));
morgan.token('res-headers', (req, res) => JSON.stringify(res.getHeaders()));

app.use(morgan(':method :url :status :req-headers :req-body'));

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
  res.json({
    message: 'Logged Out Successfully',
    data: userData
  });
});

app.post('/auth/signin', (req, res) => {
  const userData = req.body;
  res.json({
    message: 'User signed in successfully - Normal',
    data: userData
  });
});

app.post('/auth/signin/google', (req, res) => {
  const userData = req.body;
  res.json({
    message: 'User signed in successfully - Google',
    data: userData
  });
});

app.post('/auth/signin/facebook', (req, res) => {
  const userData = req.body;
  res.json({
    message: 'User signed in successfully - Facebook',
    data: userData
  });
});

app.post('/auth/signup', (req, res) => {
  const userData = req.body;
  res.json({
    message: 'User signed in successfully - Normal',
    data: {
      id: 1,
      name: userData.name,
      email: userData.email,
    },
    error: null
  });
});

app.post('/auth/signup/google', (req, res) => {
  const userData = req.body;
  res.json({
    message: 'User signed in successfully - Google',
    data: userData
  });
});

app.post('/auth/signup/facebook', (req, res) => {
  const userData = req.body;
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