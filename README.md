# System Design

## What is System Design

System design is the process of defining the elements of a system, as well as their interactions and relationships, in order to satisfy a set of specified requirements.

It involves taking a problem statement, breaking it down into smaller components and designing each component to work together effectively to achieve the overall goal of the system. This process typically includes analyzing the current system (if any) and determining any deficiencies, creating a detailed plan for the new system, and testing the design to ensure that it meets the requirements. It is an iterative process that may involve multiple rounds of design, testing, and refinement.

In software engineering, system design is a phase in the software development process that focuses on the high-level design of a software system, including the architecture and components.

It is also one of the important aspects of the interview process for software engineers. Most of the companies have a dedicated system design interview round, where they ask the candidates to design a system for a given problem statement. The candidates are expected to come up with a detailed design of the system, including the architecture, components, and their interactions. They are also expected to discuss the trade-offs involved in their design and the alternatives that they considered.

## 🚀 Quick Navigation

| Resource | Description |
|----------|-------------|
| [📋 System Design Interview](./System_Design_Interview.md) | Complete interview guide with structure and tips |
| [📖 30 Essential Concepts](./Thirty_System_Design_Concepts.md) | Key concepts every engineer should master |
| [🏗️ Design Principles](./System_Design_Principles.md) | Fundamental principles and best practices |
| [📊 Case Studies](./Case_Studies.md) | Real-world system design examples |
| [📘 Playbook (PDF)](./playbook/System%20Design%20Playbook.pdf) | Comprehensive reference guide |
| [🔗 Additional Resources](./Resources.md) | Curated external resources |
| [🖼️ Visual Overview](./SystemDesign.jpg) | System design diagram reference |

## How To: System Design?

There are several steps that can be taken when approaching a system design:

- **Understand the problem**: Gather information about the problem you are trying to solve and the requirements of the system. Identify the users and their needs, as well as any constraints or limitations of the system.
- **Identify the scope of the system:** Define the boundaries of the system, including what the system will do and what it will not do.
- **Research and analyze existing systems:** Look at similar systems that have been built in the past and identify what worked well and what didn’t. Use this information to inform your design decisions.
- **Create a high-level design:** Outline the main components of the system and how they will interact with each other. This can include a rough diagram of the system’s architecture, or a flowchart outlining the process the system will follow.
- **Refine the design:** As you work on the details of the design, iterate and refine it until you have a complete and detailed design that meets all the requirements.
- **Document the design:** Create detailed documentation of your design for future reference and maintenance.
- **Continuously monitor and improve the system:** The system design is not a one-time process, it needs to be continuously monitored and improved to meet the changing requirements.

---

## Common Patterns

System design patterns are reusable solutions to common problems encountered when building large-scale software systems. These patterns help engineers create systems that are scalable, reliable, and efficient. Below, Each pattern addresses a specific challenge, such as handling millions of users, processing data in real time, or managing complex tasks.

---

### 1. Scaling Reads

**Problem**: When a system serves millions or billions of users, it must handle a high volume of read requests (e.g., fetching data like user profiles or posts) without slowing down.

**Solution**: To manage this, systems use techniques to reduce the load on the main database and speed up data retrieval:

- **Caching**: Store frequently accessed data in a fast, temporary storage layer (e.g., Redis or Memcached). For example, if users often view the same webpage, the system saves the page in a cache to avoid repeatedly querying the database.
- **Content Delivery Networks (CDNs)**: CDNs store copies of static content (like images or videos) on servers located closer to users worldwide. This reduces latency and offloads traffic from the main server.
- **Database Replication**: Create multiple copies of the database (replicas) to distribute read requests across them. One database handles writes (the primary), while replicas handle reads, improving performance.

**Example**: A social media platform like X might cache popular posts or use a CDN to deliver images quickly to users across the globe.

---

### 2. Scaling Writes

**Problem**: When many users are writing data to the system (e.g., posting updates, sending messages), the database can become overwhelmed, leading to delays or failures.

**Solution**: To handle high write volumes, systems use strategies to distribute or delay write operations:

- **Sharding**: Split the database into smaller pieces (shards), each storing a subset of the data. For instance, one shard might store user data for users A-M, while another handles N-Z.
- **Partitioning**: Similar to sharding, partitioning divides data based on specific criteria (e.g., by geographic region) to balance the load.
- **Queues**: Instead of writing data directly to the database, place write requests in a queue (e.g., using Kafka or RabbitMQ). The system processes these requests later, reducing immediate pressure.
- **Batching**: Group multiple write operations into a single transaction to reduce the number of database interactions.

**Example**: An e-commerce platform might use sharding to store customer orders across multiple database servers or queues to process order updates during a sale.

---

### 3. Real-Time Updates

**Problem**: Some applications need to push updates to users instantly, like live notifications or real-time chat messages, which requires a different approach than traditional request-response systems.

**Solution**: To enable real-time communication, systems use:

- **Server-Sent Events (SSE)**: The server sends updates to the client over a single, long-lived connection. For example, a news app might use SSE to push breaking news alerts.
- **WebSockets**: Establish a two-way connection between the client and server, allowing real-time communication. This is ideal for chat applications or live sports updates.
- **Publish/Subscribe (Pub/Sub)**: A messaging pattern where publishers send messages to a topic, and subscribers receive them. This is useful for broadcasting updates to many users.
- **Consistent Hashing**: A technique to distribute data or requests across servers evenly, often used in real-time systems to ensure scalability and balance.

**Example**: A messaging app like WhatsApp might use WebSockets to deliver instant messages or Pub/Sub to notify users of new group activity.

---

### 4. Multi-Step Processes (Sagas)

**Problem**: Some processes involve multiple steps across different systems, like processing an order that requires payment, inventory check, and shipping. If one step fails, the entire process needs to stay consistent.

**Solution**: Sagas break down complex processes into smaller, independent steps, with mechanisms to handle failures:

- **Choreographed Saga**: Each step triggers the next via events (e.g., “payment completed” triggers “update inventory”). This is decentralized and uses event queues.
- **Orchestrated Saga**: A central coordinator manages the steps, ensuring they execute in order and handling failures (e.g., rolling back if a step fails).
- **Durable Execution**: Ensures that even if a system crashes, the process can resume from where it left off, often using persistent storage to track progress.

**Example**: In an online store, a saga might handle an order by coordinating payment, inventory deduction, and shipping, ensuring all steps complete or roll back if one fails.

---

### 5. Handling Large Blobs

**Problem**: Applications dealing with large files (e.g., videos, images, or PDFs) can slow down if these files clog the main system.

**Solution**: To manage large binary objects (blobs), systems use:

- **Signed Authentication**: Generate secure, temporary URLs for users to upload or download files directly to a storage service (e.g., Amazon S3), bypassing the main application server.
- **Chunked Uploads**: Break large files into smaller pieces for uploading, making the process more reliable and resumable if interrupted.
- **Event Listening**: Use events to notify the system when a file upload or processing is complete, decoupling it from the main application flow.

**Example**: A video streaming service might store videos in a cloud storage service like S3, using signed URLs for secure uploads and chunked uploads for large files.

---

### 6. Managing Long-Running Tasks

**Problem**: Some tasks, like processing videos or training machine learning models, take a long time and can’t block the main application.

**Solution**: To handle these tasks asynchronously, systems use:

- **Queueing**: Place tasks in a queue (e.g., AWS SQS) to be processed by background workers, freeing up the main application.
- **Heartbeats**: Workers send periodic signals to indicate they’re still running, helping detect and recover from failures.
- **Worker Pools**: A group of background processes (workers) that pick up tasks from the queue and process them in parallel.

**Example**: A video platform like YouTube might queue video encoding tasks, with workers converting uploaded videos into different resolutions in the background.

---

### 7. Dealing with Contention

**Problem**: When multiple users try to access or modify the same resource simultaneously (e.g., bidding in an auction), conflicts can occur, leading to errors or inconsistencies.

**Solution**: To manage contention, systems use:

- **Locking**: Temporarily restrict access to a resource to one user or process at a time. For example, optimistic locking assumes conflicts are rare and checks for changes before committing.
- **Concurrency Control**: Techniques like versioning or timestamps ensure that updates don’t overwrite each other unexpectedly.
- **Commit Protocols**: Rules (e.g., two-phase commit) ensure that multiple systems agree on the outcome of a transaction, maintaining consistency.

**Example**: In an online auction system, locking might prevent two users from bidding on the same item simultaneously, ensuring the highest bid wins.

### Learn More

#### 📚 Core Learning Materials
- [📖 System Design Concepts: Thirty Essential Concepts](./Thirty_System_Design_Concepts.md) - Key concepts every engineer should know
- [🏗️ System Design Principles](./System_Design_Principles.md) - Fundamental principles and best practices
- [📋 System Design Interview Guide](./System_Design_Interview.md) - Complete interview preparation guide
- [📊 Case Studies](./Case_Studies.md) - Real-world system design examples

#### 📖 Reference Materials
- [📘 System Design Playbook](./playbook/System%20Design%20Playbook.pdf) - Comprehensive PDF guide
- [🔗 Additional Resources](./Resources.md) - Curated collection of external resources
- [🖼️ System Design Overview](./SystemDesign.jpg) - Visual system design reference

#### 🌐 External Resources
- [🗺️ System Design Roadmap](https://roadmap.sh/system-design) - Learning path and roadmap

## System Design Interview

System design is a very extensive topic and system design interviews are designed to evaluate your **capability to produce technical solutions to abstract problems** as such they are not designed for a specific answer. The unique aspect of SD Interview is the **two-way nature** between the candidate and the interviewer.

Expectations are quite different at different engineering level as well. This is because someone with a lot of **practical experience** will approach it quite differently from someone who's new in the industry. As a result, it's hard to come up with a single strategy that will help us stay organized during the interview.

### Interview Structure

1. Requirement Clarification
2. Estimation and Constraints
3. Data Model Design
4. API Design
5. High Level Component Design
6. Detailed Component Design / Low Level Design
7. Identify & Resolve Bottlenecks

### 1. Requirement Clarifications

System design interview questions, by nature, are vague or abstract. Asking questions about exact scope of the problem and clarifying functional requirements early in the interviews. Usually requirements are divided into three parts:

- Functional Requirements
- Non-Functional Requirements
- Extended Requirements

#### Functional Requirements

- Requirements that the end user specifically demands as basic functionalities that a system should offer.
- Example
  - What are the features we need to design for this system?
  - What are the edge cases we need to consider, if any in our design?

#### Non Functional Requirements

- Quality Constraints that system must satisfy according to the project contact.
- The priority or extent to which these factors are implemented varies from one project to another
- Also called non-behavioral requirements
- They are:
  - portability
  - maintainability
  - reliability
  - scalability
  - security
- Example
  - Each request should be processed with the minimum latency
  - System should be highly available

#### Extended Requirements

- Basically "nice to have" requirements that might be out of the scope of the system
- Examples:
  - "Our system should record metrics and analytics"
  - "service health and performance monitoring"

### 2. Estimation and Constraints

Estimate the scale of the system we're going to design.

Examples

- "What is the desired scale that this system will need to handle?"
- "What is the read/write ratio of our system?"
- "How many request per second?"
- "How much storage will be needed?"

### 3. Data model design

- With estimation, start defining the database schema, defining all the entities and relationships between them
- Doing early would help us to understand the data flow which is the core of every system

Questions:

- "What are the different entities in the system?"
- "What are the relationships between these entities?"
- "How many tables do we need?"
- "Is NoSQL a better choice here?"

### 4. API Design

- Start designing APIs for the system: Simple interface defining API requirements such as parameters, functions, classes, types, entities etc
- Define expectations from the system explicitly
- Examples:
  - Create a User

  ```sh
  POST /users {email: string, passowrd: string}
  ```

```

**Note**: Keep the interface as simple as possible and come back later when covering extended requirements.

### 5. High-level Component design

- Identify system components (servers, caching, load balancers, API gateway etc) needed to solve our problem and draft first design of our system
- Questions
 - "Is it best to design a monolithic or a microservices architecture?
 - "What are type of database should we use?"

Once basic diagram is created, start discussing with the interviewer.

### 6. Detailed  Component design

- Time to go into detail about the major components of the system we designed.
- Discuss with interviewer if any component need further improvements, or any additional features the system might be able to support though optional
- Demonstrate your experience in the areas of your expertise: Present different approaches, advantages and disadvantages, explain your decision and back them up with examples
- Questions Examples:
 - "How should we partition our data?"
 - "What about load distribution?"
 - "Should we use cache?"
 - "How will we handle a sudden spike in traffic?"

### 7. Identify and Resolve bottlenecks

- Discuss bottlenecks and approaches to mitigate them.
- Important questions to ask:
 - "Do we have enough database replicas?"
 - "Is there any single point of failure?**"
 - "Is database sharding required?"
 - "How can we make our system more robust?"
 - "How to improve availability of our cache?"

Make sure to read engineering blog of the company you're interviewing with. This will help you get a sense of technology stack they are using and which problems are important to them.


#### Reference

- [System Design Workshop](https://www.youtube.com/watch?v=sQIzIiO3vv0&list=PL_XxuZqN0xVAiu5oODf-SmeXG2Y_RG2pz&index=10&t=602s)

### Learn More About System Design Interview

- [System Design Interview: A Step-By-Step Guide](https://www.youtube.com/watch?v=i7twT3x5yv8)
- [System Design Roadmap](https://roadmap.sh/system-design)
- [OpenSourceHow to approach System Design?](https://github.com/donnemartin/system-design-primer#how-to-approach-a-system-design-interview-question)
- [articleWhat are system design questions?](https://www.hiredintech.com/system-design)
- [articleMy System Design Template](https://leetcode.com/discuss/career/229177/My-System-Design-Template)
- [videoIntro to Architecture and Systems Design Interviews](https://www.youtube.com/watch?v=ZgdS0EUmn70)

```
