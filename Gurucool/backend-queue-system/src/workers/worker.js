const { processRequest } = require('../queue/queueManager');
const Task = require('../models/Task'); // Task model for MongoDB

function handleRequest(request) {
  console.log("Processing request:", request);
  const task = new Task({ content: request });
  task.save();
}

const clientId = process.argv[2]; // Pass clientId as command line argument
const queueName = `client_${clientId}_queue`;

processRequest(queueName, handleRequest);

