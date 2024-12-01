const WebSocket = require("ws");

class WebSocketService {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.queue = [];
    this.isConnected = false;

    this.init();
  }

  init() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket connection established.");
      this.isConnected = true;

      // Send queued messages
      this.queue.forEach((message) => this.socket.send(message));
      this.queue = [];
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed. Reconnecting...");
      this.isConnected = false;

      setTimeout(() => this.init(), 5000);
    };
  }

  sendMessage(messagePayload) {
    return new Promise((resolve, reject) => {
      const message = JSON.stringify(messagePayload);

      if (this.isConnected) {
        this.socket.send(message, (err) => {
          if (err) {
            console.error("Error sending message:", err);
            reject(err);
          } else {
            console.log("Message sent:", messagePayload);
            resolve();
          }
        });
      } else {
        console.log(
          "WebSocket not connected. Queuing message:",
          messagePayload
        );
        this.queue.push(message);
        resolve();
      }
    });
  }
}

const wsService = new WebSocketService("ws://localhost:8081");
module.exports = wsService;
