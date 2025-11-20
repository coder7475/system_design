const amqp = require("amqplib")

async function send() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const queue = 'hello';
        const msg = 'Hello WOrld!';
        
        // assert queue
        await channel.assertQueue(queue, {
            durable: false
        })

        // send message
        channel.sendToQueue(queue, Buffer.from(msg))
        
        console.log(" [x] Sent %s", msg);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500); 
    } catch(error) {
        console.error(error);
    }
}

send()