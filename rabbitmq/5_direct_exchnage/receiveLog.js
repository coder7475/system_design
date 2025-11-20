const amqp = require("amqplib")

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log(`Usage: node receiveLog.js [info] [warning] [error]`);
    process.exit(1);
}

const receiveLog = async () => {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    const exchange = 'direct_logs';
    channel.assertExchange(exchange, 'direct', {durable: false});

    // create exclusive queue
    const queue = await channel.assertQueue('', {exclusive: true});
    
    console.log(' [*] Waiting for logs. To exit press CTRL+C');
    args.forEach(severity => {
        channel.bindQueue(queue.queue, exchange, severity);
    })

    channel.consume(queue.queue, msg => {
        console.log(`[x] %s %s`, msg.fields.routingKey, msg.content.toString());
    }, {noAck: true})
}

receiveLog()