# WebRTC Demo

Use Two Browser use console to code

In one: peer1.js
In another one: peer2.js

## Process

1. A will create an offer (sdp) and set it to local description
2. B will get the offer and set it as remote description (We wi)
3. B create an answer and sets it as its local description and signal the
   answer(sdp) to A
4. A sets the answer as its remote description
5. Connection established, exchange data channel

## Reference

- [WebRTC Crash Course](https://www.youtube.com/watch?v=FExZvpVvYxA)
