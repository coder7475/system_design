const amqp = require("amqplib")

async function emitLog() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const exchnage = 'direct_logs';

        const args = process.argv.slice(2);
        const severity = (args.length > 0) ? args[0] : 'info';
        console.log(args);
        const msg = args.slice(1).join(' ') || 'Hello Logs!';
        
        // assert exchange
        await channel.assertExchange(exchnage, 'direct', {
            durable: false
        })
        // publish the message
        channel.publish(exchnage, severity, Buffer.from(msg))
        
        console.log(" [x] Sent %s %s", severity, msg);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500); 
    } catch(error) {
        console.error(error);
    }
}

emitLog()