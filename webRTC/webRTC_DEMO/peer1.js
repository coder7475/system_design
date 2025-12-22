// create web rtc connection interface
const local_connection = new RTCPeerConnection();

// create data channel
const data_channel = local_connection.createDataChannel("channel");

data_channel.onmessage = (e) => console.log("Just got a message " + e.data);
data_channel.onopen = (e) => console.log("Connection Opened!");

// print each ICE candidate
local_connection.onicecandidate = (e) =>
  console.log(
    "New ICE candidate! Reprinting SDP: " +
      JSON.stringify(local_connection.localDescription)
  );

// Create an offer
local_connection
  .createOffer()
  .then((offer) => local_connection.setLocalDescription(offer))
  .finally((a) => console.log("Offer Set Successfully"));

/**
 * Will Get ICE Candidate:
 * Printing in console, send it via any way to second peer
VM280:2 New ICE candidate! Reprinting SDP: 
```json
{"type":"offer","sdp":"v=0\r\no=- 4640010796743273391 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:3091073559 1 udp 2113937151 c17ad899-fc88-4380-9152-8a02ba055a45.local 58111 typ host generation 0 network-cost 999\r\na=ice-ufrag:OpDk\r\na=ice-pwd:OPd9GWsmjbN25gJMosh+0wjg\r\na=ice-options:trickle\r\na=fingerprint:sha-256 5D:1B:58:32:D5:5D:1B:FE:CD:24:7B:17:C5:B6:9B:1F:D2:AB:B6:B5:36:6D:76:43:5F:A6:0B:8A:14:61:02:46\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
VM280:2 New ICE candidate! Reprinting SDP: {"type":"offer","sdp":"v=0\r\no=- 4640010796743273391 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:3091073559 1 udp 2113937151 c17ad899-fc88-4380-9152-8a02ba055a45.local 58111 typ host generation 0 network-cost 999\r\na=ice-ufrag:OpDk\r\na=ice-pwd:OPd9GWsmjbN25gJMosh+0wjg\r\na=ice-options:trickle\r\na=fingerprint:sha-256 5D:1B:58:32:D5:5D:1B:FE:CD:24:7B:17:C5:B6:9B:1F:D2:AB:B6:B5:36:6D:76:43:5F:A6:0B:8A:14:61:02:46\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
```json
 */

// Will get an answer from the peer 2
const answer = {
  type: "answer",
  sdp: "v=0\r\no=- 454134360955271883 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:4151477631 1 udp 2113937151 f48832f3-5606-47f1-8cd3-af7c3563c5bf.local 52617 typ host generation 0 network-cost 999\r\na=ice-ufrag:o9+m\r\na=ice-pwd:S1QzC3d2kCSwNMa/N2oBtTWP\r\na=ice-options:trickle\r\na=fingerprint:sha-256 A7:F2:0F:F9:B2:33:90:D7:FC:31:81:B6:73:82:88:E3:C7:22:8D:DB:6B:03:E7:1F:F2:D8:8A:60:5C:C5:36:4B\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};

// set it as remote description
local_connection.setRemoteDescription(answer);

/**
 * Will see on peer: 1
 * local_connection
  .createOffer()
  .then((offer) => local_connection.setLocalDescription(offer))
  .finally((a) => console.log("Offer Set Successfully"));

Promise {<pending>}
VM337:4 Offer Set Successfully
VM280:2 New ICE candidate! Reprinting SDP: {"type":"offer","sdp":"v=0\r\no=- 4640010796743273391 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:3091073559 1 udp 2113937151 c17ad899-fc88-4380-9152-8a02ba055a45.local 58111 typ host generation 0 network-cost 999\r\na=ice-ufrag:OpDk\r\na=ice-pwd:OPd9GWsmjbN25gJMosh+0wjg\r\na=ice-options:trickle\r\na=fingerprint:sha-256 5D:1B:58:32:D5:5D:1B:FE:CD:24:7B:17:C5:B6:9B:1F:D2:AB:B6:B5:36:6D:76:43:5F:A6:0B:8A:14:61:02:46\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
VM280:2 New ICE candidate! Reprinting SDP: {"type":"offer","sdp":"v=0\r\no=- 4640010796743273391 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:3091073559 1 udp 2113937151 c17ad899-fc88-4380-9152-8a02ba055a45.local 58111 typ host generation 0 network-cost 999\r\na=ice-ufrag:OpDk\r\na=ice-pwd:OPd9GWsmjbN25gJMosh+0wjg\r\na=ice-options:trickle\r\na=fingerprint:sha-256 5D:1B:58:32:D5:5D:1B:FE:CD:24:7B:17:C5:B6:9B:1F:D2:AB:B6:B5:36:6D:76:43:5F:A6:0B:8A:14:61:02:46\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
const answer = {
  type: "answer",
  sdp: "v=0\r\no=- 454134360955271883 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:4151477631 1 udp 2113937151 f48832f3-5606-47f1-8cd3-af7c3563c5bf.local 52617 typ host generation 0 network-cost 999\r\na=ice-ufrag:o9+m\r\na=ice-pwd:S1QzC3d2kCSwNMa/N2oBtTWP\r\na=ice-options:trickle\r\na=fingerprint:sha-256 A7:F2:0F:F9:B2:33:90:D7:FC:31:81:B6:73:82:88:E3:C7:22:8D:DB:6B:03:E7:1F:F2:D8:8A:60:5C:C5:36:4B\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};

// set it as remote description
local_connection.setLocalDescription(answer);

Promise {<rejected>: InvalidModificationError: Failed to execute 'setLocalDescription' on 'RTCPeerConnection': The SDP d…}
VM341:7 Uncaught (in promise) InvalidModificationError: Failed to execute 'setLocalDescription' on 'RTCPeerConnection': The SDP does not match the previously generated SDP for this type
    at <anonymous>:7:18
(anonymous) @ VM341:7

// set it as remote description
local_connection.setRemoteDescription(answer);
Promise {<pending>}
VM271:2 Connection Opened!


ON Peer 2:

local_connection
  .createOffer()
  .then((offer) => local_connection.setLocalDescription(offer))
  .finally((a) => console.log("Offer Set Successfully"));

Promise {<pending>}
VM337:4 Offer Set Successfully
VM280:2 New ICE candidate! Reprinting SDP: {"type":"offer","sdp":"v=0\r\no=- 4640010796743273391 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:3091073559 1 udp 2113937151 c17ad899-fc88-4380-9152-8a02ba055a45.local 58111 typ host generation 0 network-cost 999\r\na=ice-ufrag:OpDk\r\na=ice-pwd:OPd9GWsmjbN25gJMosh+0wjg\r\na=ice-options:trickle\r\na=fingerprint:sha-256 5D:1B:58:32:D5:5D:1B:FE:CD:24:7B:17:C5:B6:9B:1F:D2:AB:B6:B5:36:6D:76:43:5F:A6:0B:8A:14:61:02:46\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
VM280:2 New ICE candidate! Reprinting SDP: {"type":"offer","sdp":"v=0\r\no=- 4640010796743273391 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:3091073559 1 udp 2113937151 c17ad899-fc88-4380-9152-8a02ba055a45.local 58111 typ host generation 0 network-cost 999\r\na=ice-ufrag:OpDk\r\na=ice-pwd:OPd9GWsmjbN25gJMosh+0wjg\r\na=ice-options:trickle\r\na=fingerprint:sha-256 5D:1B:58:32:D5:5D:1B:FE:CD:24:7B:17:C5:B6:9B:1F:D2:AB:B6:B5:36:6D:76:43:5F:A6:0B:8A:14:61:02:46\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
const answer = {
  type: "answer",
  sdp: "v=0\r\no=- 454134360955271883 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:4151477631 1 udp 2113937151 f48832f3-5606-47f1-8cd3-af7c3563c5bf.local 52617 typ host generation 0 network-cost 999\r\na=ice-ufrag:o9+m\r\na=ice-pwd:S1QzC3d2kCSwNMa/N2oBtTWP\r\na=ice-options:trickle\r\na=fingerprint:sha-256 A7:F2:0F:F9:B2:33:90:D7:FC:31:81:B6:73:82:88:E3:C7:22:8D:DB:6B:03:E7:1F:F2:D8:8A:60:5C:C5:36:4B\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};

// set it as remote description
local_connection.setLocalDescription(answer);

Promise {<rejected>: InvalidModificationError: Failed to execute 'setLocalDescription' on 'RTCPeerConnection': The SDP d…}
VM341:7 Uncaught (in promise) InvalidModificationError: Failed to execute 'setLocalDescription' on 'RTCPeerConnection': The SDP does not match the previously generated SDP for this type
    at <anonymous>:7:18
(anonymous) @ VM341:7

// set it as remote description
local_connection.setRemoteDescription(answer);
Promise {<pending>}
VM271:2 Connection Opened!

 */

// test send a message through peer 1

data_channel.send("YO! Peer 2 what's up!");

/**
 * Peer 2 will see:
 * 
// set offer as remote description
remote_connection
  .setRemoteDescription(offer)
  .finally((a) => console.log("Offer Set"));

Promise {<pending>}
VM233:5 Offer Set

// create answer and set it as local description
remote_connection
  .createAnswer()
  .then((a) => remote_connection.setLocalDescription(a))
  .finally((a) => console.log("Answer Created!"));

Promise {<pending>}
VM237:6 Answer Created!
VM225:6 New ICE candidate! Reprinting SDP: {"type":"answer","sdp":"v=0\r\no=- 454134360955271883 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:4151477631 1 udp 2113937151 f48832f3-5606-47f1-8cd3-af7c3563c5bf.local 52617 typ host generation 0 network-cost 999\r\na=ice-ufrag:o9+m\r\na=ice-pwd:S1QzC3d2kCSwNMa/N2oBtTWP\r\na=ice-options:trickle\r\na=fingerprint:sha-256 A7:F2:0F:F9:B2:33:90:D7:FC:31:81:B6:73:82:88:E3:C7:22:8D:DB:6B:03:E7:1F:F2:D8:8A:60:5C:C5:36:4B\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
VM225:6 New ICE candidate! Reprinting SDP: {"type":"answer","sdp":"v=0\r\no=- 454134360955271883 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:4151477631 1 udp 2113937151 f48832f3-5606-47f1-8cd3-af7c3563c5bf.local 52617 typ host generation 0 network-cost 999\r\na=ice-ufrag:o9+m\r\na=ice-pwd:S1QzC3d2kCSwNMa/N2oBtTWP\r\na=ice-options:trickle\r\na=fingerprint:sha-256 A7:F2:0F:F9:B2:33:90:D7:FC:31:81:B6:73:82:88:E3:C7:22:8D:DB:6B:03:E7:1F:F2:D8:8A:60:5C:C5:36:4B\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
VM229:7 Connection OPEN!!!
VM229:6 New Message from client:  YO! Peer 2 what's up!

 */

// * for video/audio
// * local_connection.addTrack()
