import openSocket from "socket.io-client"
const socket = openSocket("http://localhost:9000")
function subscribeToData(cb) {
  socket.on("data", timestamp => cb(null, timestamp))
  socket.emit("subscribeToData", 1000)
}
export { subscribeToData }
