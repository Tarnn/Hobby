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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});