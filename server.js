// A minimal GUN relay server. This file starts an HTTP server using
// Express and attaches GUN to it so that browsers can connect over
// WebSocket or HTTP to synchronize data. This relay does not store
// any application logic; it simply acts as a rendezvous point for peers.

const express = require('express');
const Gun = require('gun');

// Create an Express app. We do not define any routes because GUN
// internally handles the `/gun` endpoint for both HTTP and WebSocket
// connections.
const app = express();

// Start the HTTP server. When deploying to platforms like Render or
// Heroku, the port is provided via the PORT environment variable. A
// fallback port of 8080 is used for local development.
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`GUN relay server listening on port ${port}`);
});

// Attach GUN to the server. The `web` option tells GUN to use this
// server for handling incoming requests and WebSocket upgrades. No
// additional configuration is necessary for a basic relay.
Gun({ web: server });
