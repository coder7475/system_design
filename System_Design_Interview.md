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
- [Intro to Architecture and Systems Design Interviews](https://www.youtube.com/watch?v=ZgdS0EUmn70)


```
