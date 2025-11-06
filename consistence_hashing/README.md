# Consistence Hashing

## 🧠 Concept Overview: What is Consistent Hashing?

Consistent hashing is used to **distribute keys (e.g., user requests, cache items)** across a set of servers **in a way that minimizes key movement** when servers are added or removed.

### Problem with Regular Hashing

If you hash a key with a fixed number of servers like:

```python
server_index = hash(key) % N
```

Then when `N` (number of servers) changes (e.g., you add or remove a server), **almost all keys are reassigned**, causing massive cache invalidation.

### Solution: Consistent Hashing

Instead, consistent hashing arranges both servers and keys **on a virtual ring (0 to 2³²)**.
Each key maps to the next **clockwise server** on the ring.
When a server is added/removed, **only a small portion** of keys need to be reassigned.

---

## 🧩 Code Breakdown

### 1. Class Initialization

```python
def __init__(self, servers, num_replicas=3):
```

- `servers`: List of physical servers (like `["S0", "S1", "S2"]`).
- `num_replicas`: Number of **virtual nodes** per server for better load distribution.

  - Virtual nodes make the hash ring smoother and more balanced.

```python
self.ring = {}          # Maps hash values → server
self.sorted_keys = []   # Sorted list of hash values for fast lookup
self.servers = set()    # Tracks current servers
```

Then, each server is added using:

```python
for server in servers:
    self.add_server(server)
```

---

### 2. Hash Function

```python
def _hash(self, key):
    return int(hashlib.md5(key.encode()).hexdigest(), 16)
```

- Uses **MD5** hashing to generate a large integer (128-bit).
- Deterministic — the same key always produces the same hash.

---

### 3. Adding a Server

```python
def add_server(self, server):
    for i in range(self.num_replicas):
        hash_val = self._hash(f"{server}-{i}")
        self.ring[hash_val] = server
        bisect.insort(self.sorted_keys, hash_val)
```

Each physical server creates several **virtual nodes**:

- `"S1-0"`, `"S1-1"`, `"S1-2"`, etc.
- Each one gets a unique position (`hash_val`) on the ring.
- `bisect.insort()` keeps `self.sorted_keys` sorted for binary search.

✅ **Benefit:** Makes key distribution more uniform.

---

### 4. Removing a Server

```python
def remove_server(self, server):
    if server in self.servers:
        for i in range(self.num_replicas):
            hash_val = self._hash(f"{server}-{i}")
            self.ring.pop(hash_val, None)
            self.sorted_keys.remove(hash_val)
```

Removes all virtual nodes of the given server from the ring.

Only keys that were mapped to these hash ranges get reallocated to neighboring servers — **minimal redistribution**.

---

### 5. Getting the Responsible Server for a Key

```python
def get_server(self, key):
    hash_val = self._hash(key)
    index = bisect.bisect(self.sorted_keys, hash_val) % len(self.sorted_keys)
    return self.ring[self.sorted_keys[index]]
```

- Compute hash of the key.
- Use **binary search** (`bisect.bisect`) to find the nearest larger hash value (the next clockwise node).
- Wrap around using `%` if at the end of the ring.
- Return the corresponding server.

---

## ⚙️ Example Walkthrough

```python
servers = ["S0", "S1", "S2", "S3", "S4", "S5"]
ch = ConsistentHashing(servers)

print("UserA →", ch.get_server("UserA"))
print("UserB →", ch.get_server("UserB"))
```

Each user gets mapped to a specific server based on hash.

Now add a new server:

```python
ch.add_server("S6")
```

- The hash ring is updated.
- Only **a subset of keys** will now point to `S6`.

Remove a server:

```python
ch.remove_server("S2")
```

- Its keys are reassigned to the next available nodes clockwise.

---

## 📊 Why It’s Used

| Feature                                         | Regular Hashing | Consistent Hashing                                            |
| ----------------------------------------------- | --------------- | ------------------------------------------------------------- |
| Key reassignment after adding/removing a server | Almost all keys | Only a few keys                                               |
| Load distribution                               | Can be uneven   | Even (with replicas)                                          |
| Scalability                                     | Poor            | Excellent                                                     |
| Real-world usage                                | Rare            | Widely used (e.g., Redis Cluster, Cassandra, Amazon DynamoDB) |

---

## 📚 References

1. **Karger et al. (MIT, 1997)** – _Consistent Hashing and Random Trees: Distributed Caching Protocols for Relieving Hot Spots on the World Wide Web_
   [Paper Link](https://dl.acm.org/doi/10.1145/258533.258660)

2. **Redis Cluster Documentation** – [Consistent Hashing Concept](https://redis.io/docs/latest/operate/cluster/)

3. **Cassandra Architecture** – [Consistent Hashing & Token Ring](https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html)

4. **Amazon Dynamo Paper (2007)** – _Dynamo: Amazon’s Highly Available Key-value Store_
   [PDF](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)

5. https://algomaster.io/learn/system-design/consistent-hashing
