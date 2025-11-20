const amqp = require("amqplib")

async function receive() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const queue = 'hello';
        
        // assert queue
        await channel.assertQueue(queue, {
            durable: false
        })

        // receive message
        console.log(`[*] Waiting for message in ${queue}. To exit press CTRL+C`);
        
        channel.consume(queue, (msg) => {
            console.log(`[x] Received %s`, msg.content.toString());
        }, {
            noAck: true
        });
        
    } catch(error) {
        console.error(error);
    }
}

receive()