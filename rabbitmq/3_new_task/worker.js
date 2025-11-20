const amqp = require("amqplib")

async function worker() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const queue = 'task_queue';
        
        // assert queue
        await channel.assertQueue(queue, {
            durable: false
        })
        channel.prefetch(1);

        // receive message
        console.log(`[*] Waiting for message in ${queue}. To exit press CTRL+C`);
        
        channel.consume(queue, (msg) => {
            // console.log(`[x] Received %s`, msg.content.toString());
            // if exit argument found exit the process
            const exit = process.argv.slice(2).join(' ');
            if (exit) {
                console.log(`exit`, exit);
                console.log("Exiting...");
                connection.close();
                process.exit(0);
            }

            const secs = msg.content.toString().split('.').length - 1;
            console.log("[x] received %s", msg.content.toString());

            setTimeout(() => {
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);

        }, {
            noAck: false
        });
        
    } catch(error) {
        console.error(error);
    }
}

worker()