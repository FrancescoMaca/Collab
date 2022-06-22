const { API } = require("./api");
const { WebSocket } = require("./ws");
const { Database }  = require("./database")

const Dependency = {
    api: new API(),
    ws: new WebSocket(),
    db: new Database()
};

global.deps = Dependency;