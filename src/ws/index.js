const { Server } = require("socket.io");
const Schema = require("../models/UserSchema");
const WebSocketSessions = require("../util/websocketsessions");

exports.WebSocket = class {
    constructor() {
        this.sessions = new WebSocketSessions();
    };

    async init(app) {
        this.io = new Server(app, {
            cors: {
                origin: "*",
                allowedHeaders: ["Authorization"],
                credentials: true
            },
            path: "/websocket",
            serveClient: false
        });

        this.io.on("connection", async (client) => {
            const token = client.handshake.query.token;

            if (!token) {
                client.emit("error", "Token query is missing");
                return client.disconnect(true);
            };

            const user = await Schema.findOne({
                api: {
                    key: token
                }
            });

            if (!user) {
                client.emit("error", "An invalid token was provided");
                return client.disconnect(true);
            };

            client.emit("GatewayWelcome", JSON.stringify({
                event: "GatewayWelcome",
                data: {
                    username: user.username
                }
            }));

            this.sessions.set(user._id, client);
            console.log("Client is connected - ", user._id);
        });
    };
};