require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const config = require('./config');
const mongodbConnection = require('./db');

const postRoutes = require('./routes/post.routes');
const sseRoute = require('./routes/sse.route');

const { port, origin } = config;
const app = express();

// config express app
app.use(cors({ origin, credentials: true }));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(sseRoute);
app.use('/api', postRoutes);
app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'El servidor esta funcionando sin problemas.',
  });
});

const startServer = () => {
  app.listen(port || 5000, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

(async () => {
  try {
    await mongodbConnection();
    startServer();
  } catch (err) {
    console.error(err);
    startServer();
  }
})();
