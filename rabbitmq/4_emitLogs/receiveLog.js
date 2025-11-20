const amqp = require("amqplib")

const receiveLog = async () => {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const exchange = 'logs';
    channel.assertExchange(exchange, 'fanout', {durable: false});

    // create exclusive queue
    const queue = await channel.assertQueue('', {exclusive: true});
    channel.bindQueue(queue.queue, exchange, '');
    console.log(' [*] Waiting for logs. To exit press CTRL+C');

    channel.consume(queue.queue, msg => {
        console.log(`[x] %s`,msg.content.toString());
    }, {noAck: true})
}

receiveLog()