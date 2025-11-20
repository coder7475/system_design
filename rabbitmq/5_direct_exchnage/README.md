# RabbitMQ Direct Logs Example

This repository contains two Node.js scripts demonstrating how to work with RabbitMQ direct exchanges for selective log message routing based on severity levels. 

---

## Files

### 1. receiveLog.js
A RabbitMQ consumer script that receives and prints log messages of specific severities from a `direct_logs` direct exchange.

### 2. emitLog.js
A RabbitMQ producer script that emits log messages to the `direct_logs` exchange with a given severity.

---

## Prerequisites

- RabbitMQ server running locally on `amqp://localhost:5672`
- Node.js installed
- `amqplib` package installed (`npm install amqplib`)

---

## receiveLog.js Usage

Starts a log receiver that listens for messages with specific severities.

```
node receiveLog.js [info] [warning] [error]
```

- Provide one or more severities as separate arguments.
- If no severities are provided, the script prints usage and exits.
  
### Example

To receive only error and warning logs:

```
node receiveLog.js error warning
```

### What it does

- Connects to RabbitMQ and declares a `direct` exchange named `direct_logs`.
- Creates an exclusive queue tied to this consumer.
- Binds the queue to the exchange for each severity provided.
- Prints each received message with its routing key (severity).

---

## emitLog.js Usage

Emits a log message with a specified severity to the `direct_logs` exchange.

```
node emitLog.js <severity> [message...]
```

- `<severity>` is required (e.g., `info`, `warning`, `error`)
- `[message...]` is optional; defaults to `"Hello Logs!"` if omitted.

### Example

Send a warning log:

```
node emitLog.js warning Disk space running low
```

Send an info log with default message:

```
node emitLog.js info
```

### What it does

- Connects to RabbitMQ and asserts a `direct` exchange named `direct_logs`.
- Publishes the message with routing key set to the given severity.
- Closes the connection shortly after sending.

---

## Example Outputs

### receiveLog.js

```
[*] Waiting for logs. To exit press CTRL+C
[x] error Disk space critically low
[x] warning Memory usage is high
```

### emitLog.js

```
[ 'warning', 'Disk', 'space', 'running', 'low' ]
[x] Sent warning Disk space running low
```

---

## Notes

- These scripts implement a simple logging system using RabbitMQ direct exchanges for routing logs by severity.
- The exchange is non-durable; queues created are exclusive and temporary.
- Useful for filtering and selectively consuming logs in distributed applications.

---

## License

MIT License
