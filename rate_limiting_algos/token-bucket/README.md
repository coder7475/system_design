# Token Bucket

The Token Bucket algorithm is one of the most popular and widely used rate limiting approaches due to its simplicity and effectiveness.

**How It Works:**

- Imagine a bucket that holds tokens.
- The bucket has a maximum capacity of tokens.
- Tokens are added to the bucket at a fixed rate (e.g., 10 tokens per second).
- When a request arrives, it must obtain a token from the bucket to proceed.
- If there are enough tokens, the request is allowed and tokens are removed.
- If there aren't enough tokens, the request is dropped.
