# WebRTC Overview and Deep Dive

## What is WebRTC

WebRTC stands for Web Real Time Communication.  
It is a free, open source project that enables real time communication directly between browsers and mobile applications using a simple standardized API.

Core goals:

- Peer to peer communication
- Lowest possible latency
- No plugins or native apps required
- Standardized browser API

WebRTC becomes powerful because it is built into browsers, which removes friction and makes real time communication widely accessible.

**Reference:**

- https://www.w3.org/TR/webrtc/

---

## Why WebRTC Exists

WebRTC was created to solve real time audio, video, and data transmission with:

- Low latency
- Standard APIs
- Secure communication
- Peer to peer networking

Traditional client server relays add latency due to:

- Extra network hops
- Packet inspection
- Encryption and decryption overhead

Peer to peer communication is the shortest and fastest path.

**Reference:**

- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API

---

## High Level WebRTC Flow

1. Peer A gathers all possible ways it can be reached
2. Peer B does the same
3. Both peers collect:
   - IP addresses
   - Ports
   - Encryption parameters
   - Media capabilities
4. This information is bundled into an SDP
5. SDP is exchanged using any signaling method
6. Peers connect directly using the best possible path

Important detail:
WebRTC does not define signaling. It only requires that signaling exists.

**Reference:**

- https://webrtc.org/getting-started/overview

---

## Signaling

Signaling is the process of exchanging SDP data between peers.

WebRTC does not care how signaling happens.

Common signaling methods:

- WebSocket
- HTTP
- QR codes
- WhatsApp
- Copy and paste
- Email

Signaling is required only to exchange connection metadata, not the actual media.

**Reference:**

- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling

---

## SDP (Session Description Protocol)

SDP is a text format describing:

- ICE candidates
- Media codecs
- Encryption keys
- Transport protocols
- Network information

Each peer has:

- Local description
- Remote description

SDP is the most important artifact in WebRTC.

**Reference:**

- https://datatracker.ietf.org/doc/html/rfc4566

---

## Network Address Translation (NAT)

Most devices are behind a NAT.

NAT allows private IP addresses to share a public IP by rewriting:

- Source IP
- Source port

Routers maintain a NAT table to map internal connections to external ports.

**Reference:**

- https://datatracker.ietf.org/doc/html/rfc3022

---

## NAT Types

### Full Cone NAT

- Any external host can send packets once mapping exists
- Best case for WebRTC

### Address Restricted NAT

- Only hosts previously contacted can send packets
- Port does not matter

### Port Restricted NAT

- Host and port must match previous communication

### Symmetric NAT

- Unique mapping per destination
- Most restrictive
- Breaks direct peer to peer WebRTC

**Reference:**

- https://datatracker.ietf.org/doc/html/rfc4787

---

## STUN (Session Traversal Utilities for NAT)

STUN allows a client to discover:

- Its public IP address
- Its public port

How STUN works:

1. Client sends request to STUN server
2. Router creates NAT mapping
3. STUN server reflects public IP and port
4. Client learns its public presence

STUN does not work with symmetric NAT.

STUN is lightweight and cheap to operate.

**Reference:**

- https://datatracker.ietf.org/doc/html/rfc5389

---

## TURN (Traversal Using Relays around NAT)

TURN is used when direct peer to peer communication fails.

TURN acts as a relay:

- All traffic flows through the TURN server
- No direct peer to peer path

TURN is:

- More expensive
- Higher latency
- Required for symmetric NAT

Most production systems must support TURN.

**Reference:**

- https://datatracker.ietf.org/doc/html/rfc5766

---

## ICE (Interactive Connectivity Establishment)

ICE collects all possible connection candidates:

- Local IP addresses
- STUN reflexive addresses
- TURN relay addresses

These are called ICE candidates.

ICE selects the best working path automatically.

ICE candidate gathering is asynchronous and may take time.

**Reference:**

- https://datatracker.ietf.org/doc/html/rfc8445

---

## Offer and Answer Model

- Offer: SDP created by the initiator
- Answer: SDP created by the receiver

Flow:

1. Peer A creates offer
2. Offer is signaled to Peer B
3. Peer B sets offer as remote description
4. Peer B creates answer
5. Answer is signaled back to Peer A
6. Connection is established

**Reference:**

- https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer

---

## Data Channels

WebRTC supports arbitrary data via RTCDataChannel.

Characteristics:

- Uses SCTP over DTLS over UDP
- Reliable or unreliable
- Ordered or unordered

Suitable for:

- Chat
- File transfer
- Game state updates

**Reference:**

- https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel

---

## Media Streams

Media uses `getUserMedia` to access:

- Camera
- Microphone

Streams are attached using:

- `addTrack`

Media transport is optimized separately from data channels.

**Reference:**

- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

---

## ICE Trickle and addIceCandidate

ICE candidates may arrive after SDP exchange.

Options:

- Wait until all candidates are gathered
- Use trickle ICE and send candidates incrementally

`addIceCandidate` is used to add late candidates.

**Reference:**

- https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addIceCandidate

---

## Pros of WebRTC

- Peer to peer communication
- Extremely low latency
- High bandwidth support
- Browser native
- Secure by default
- No plugins required

**Reference:**

- https://webrtc.org/

---

## Cons of WebRTC

- Complex networking concepts
- TURN servers are expensive
- Debugging is difficult
- Poor fit for large multi participant meshes
- Symmetric NAT requires relays

**Reference:**

- https://bloggeek.me/webrtc-troubleshooting/

---

## When Not to Use WebRTC

- Large scale multiplayer games
- Massive group calls without SFU
- When full server control is required
- When deterministic networking is needed

**Reference:**

- https://www.cloudflare.com/learning/video/what-is-webrtc/

---

## Key Takeaway

WebRTC is powerful but not magic.  
Understanding NAT, STUN, TURN, ICE, SDP, and signaling is mandatory for correct usage.

Avoid black box abstractions.  
WebRTC rewards engineers who understand networking fundamentals.

**Reference:**

- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
