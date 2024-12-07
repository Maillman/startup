class EventMessage {
    constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
    }
  }

class ReplyNotifier {
    reply = null;
    handlers = [];
    constructor() {
        this.establishConnection();
    }

    establishConnection() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const threadId = window.location.pathname.split('/')[2];
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws/${threadId}`);
        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage('Startup', 'Connection', { msg: 'connected' }));
          };
          this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage('Startup', 'Connection', { msg: 'disconnected' }));
          };
          this.socket.onmessage = async (msg) => {
            try {
              const event = JSON.parse(await msg.data.text());
              this.receiveEvent(event);
            } catch {}
          };
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }
    
    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    broadcastEvent(from, type, value) {
        const event = new EventMessage(from, type, value);
        this.socket.send(JSON.stringify(event));
    }

    receiveEvent(event) {
        if (event.type === 'reply'){
            this.reply = event;
            this.handlers.forEach((handler) => {
                handler(this.reply);
            });
        }
    }
}

const ReplNotifier = new ReplyNotifier();
export { ReplNotifier };