const amqp = require("amqplib")

async function emitLog() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const exchnage = 'logs';
        const msg = process.argv.slice(2).join(' ') || 'Hello Logs!';
        
        // assert exchange
        await channel.assertExchange(exchnage, 'fanout', {
            durable: false
        })
        // publish the message
        channel.publish(exchnage, '', Buffer.from(msg))
        
        console.log(" [x] Sent %s", msg);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500); 
    } catch(error) {
        console.error(error);
    }
}

emitLog()