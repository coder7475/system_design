import time

class TokenBucket:
    def __init__(self, capacity, fill_rate):
        self.capacity = capacity
        self.fill_rate = fill_rate
        self.tokens = capacity
        self.last_time = time.time()

    def allow_request(self, tokens=1):
        now = time.time()

        # Calculate how many tokes added since the last checks
        time_passed = self.last_time - now
        self.tokens = min(self.capacity, self.tokens + time_passed * self.fill_rate)
        self.last_time = now

        # Check if we have enough token for the request
        if self.tokens >= tokens:
            self.tokens -= tokens
            return True
        
        return False
    


# Usage
limiter = TokenBucket(capacity=10, fill_rate=10)

# first 10 request will allow
for i in range(15):
    print(i, limiter.allow_request())
    time.sleep(0.1)

# wait for bucket to refill
time.sleep(5)

for i in range(5):
    print(i, limiter.allow_request())
    time.sleep(0.1)
