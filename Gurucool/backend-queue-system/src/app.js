const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const authenticate = require('./middleware/authMiddleware');
const { enqueueRequest } = require('./queue/queueManager');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/queue_system', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/auth', authRoutes);

app.post('/request', authenticate, (req, res) => {
  const { request } = req.body;
  enqueueRequest(req.userId, request);
  res.send('Request queued');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
