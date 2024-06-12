const amqp = require('amqplib/callback_api');

let channel = null;

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((err, ch) => {
    if (err) {
      throw err;
    }
    channel = ch;
  });
});

const enqueueRequest = (clientId, request) => {
  const queueName = `client_${clientId}_queue`;
  channel.assertQueue(queueName, { durable: false });
  channel.sendToQueue(queueName, Buffer.from(request));
  console.log(`Sent ${request} to ${queueName}`);
};

const processRequest = (queueName, callback) => {
  channel.consume(queueName, (msg) => {
    callback(msg.content.toString());
    channel.ack(msg);
  });
};

module.exports = { enqueueRequest, processRequest };
