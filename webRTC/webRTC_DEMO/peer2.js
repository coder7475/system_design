const offer = {
  type: "offer",
  sdp: "v=0\r\no=- 4640010796743273391 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:3091073559 1 udp 2113937151 c17ad899-fc88-4380-9152-8a02ba055a45.local 58111 typ host generation 0 network-cost 999\r\na=ice-ufrag:OpDk\r\na=ice-pwd:OPd9GWsmjbN25gJMosh+0wjg\r\na=ice-options:trickle\r\na=fingerprint:sha-256 5D:1B:58:32:D5:5D:1B:FE:CD:24:7B:17:C5:B6:9B:1F:D2:AB:B6:B5:36:6D:76:43:5F:A6:0B:8A:14:61:02:46\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};

const remote_connection = new RTCPeerConnection();

// print each ICE candidate
remote_connection.onicecandidate = (e) =>
  console.log(
    "New ICE candidate! Reprinting SDP: " +
      JSON.stringify(remote_connection.localDescription)
  );

// receive data channel from peer1
remote_connection.ondatachannel = (e) => {
  remote_connection.dc = e.channel;
  remote_connection.dc.onmessage = (e) =>
    console.log("New Message from client: ", e.data);
  remote_connection.dc.onopen = (e) => console.log("Connection OPEN!!!");
};

// set offer as remote description
remote_connection
  .setRemoteDescription(offer)
  .finally((a) => console.log("Offer Set"));

// create answer and set it as local description
remote_connection
  .createAnswer()
  .then((a) => remote_connection.setLocalDescription(a))
  .finally((a) => console.log("Answer Created!"));

/**
 * Will Get Answer:
 * 
Promise {<pending>}
VM237:6 Answer Created!
VM225:6 New ICE candidate! Reprinting SDP: {"type":"answer","sdp":"v=0\r\no=- 454134360955271883 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:4151477631 1 udp 2113937151 f48832f3-5606-47f1-8cd3-af7c3563c5bf.local 52617 typ host generation 0 network-cost 999\r\na=ice-ufrag:o9+m\r\na=ice-pwd:S1QzC3d2kCSwNMa/N2oBtTWP\r\na=ice-options:trickle\r\na=fingerprint:sha-256 A7:F2:0F:F9:B2:33:90:D7:FC:31:81:B6:73:82:88:E3:C7:22:8D:DB:6B:03:E7:1F:F2:D8:8A:60:5C:C5:36:4B\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
VM225:6 New ICE candidate! Reprinting SDP: {"type":"answer","sdp":"v=0\r\no=- 454134360955271883 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:4151477631 1 udp 2113937151 f48832f3-5606-47f1-8cd3-af7c3563c5bf.local 52617 typ host generation 0 network-cost 999\r\na=ice-ufrag:o9+m\r\na=ice-pwd:S1QzC3d2kCSwNMa/N2oBtTWP\r\na=ice-options:trickle\r\na=fingerprint:sha-256 A7:F2:0F:F9:B2:33:90:D7:FC:31:81:B6:73:82:88:E3:C7:22:8D:DB:6B:03:E7:1F:F2:D8:8A:60:5C:C5:36:4B\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}

 */

// send a message
remote_connection.dc.send("Good! what about you?");

/**
 * Peer 1 will receive the event:
VM271:1 Just got a message Good! what about you?

 */
