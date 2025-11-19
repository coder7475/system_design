# Round Robin Algorithm
class RoundRobin:
    def __init__(self, servers):
        self.servers = servers
        self.current_index = -1

    def get_next_server(self):
        self.current_index = (self.current_index + 1) % len(self.servers)
        return self.servers[self.current_index]
    
# Example Usage
servers = ["Server1", "Server2", "Server3"]
rr = RoundRobin(servers)

for i in range(6):
    server = rr.get_next_server()
    print(f"Request {i+1} handled by {server}")

print("All requests handled.")