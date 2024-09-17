const amqp = require('amqplib/callback_api');

const sendNotification = (transactionData) => {
  amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err;
    connection.createChannel((err, channel) => {
      if (err) throw err;

      const queue = 'transaction_notifications';
      const msg = JSON.stringify(transactionData);

      channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(msg));

      console.log('Sent transaction notification:', msg);
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

module.exports = sendNotification;
