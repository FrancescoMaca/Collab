const { API } = require("./api/api");
const { WebSocket } = require("./ws/ws");
const mongoose = require("mongoose");
const config = require("../config.json")


const Dependency = {
    api: new API(),
    ws: new WebSocket()
};



(async () =>{
    mongoose.connection.once("open", () => {
        console.info("Mongodb is now connected");
    });
        
    if (config.mongoDB) {
        mongoose.connect(config.mongoDB, {
            keepAlive: true,
            connectTimeoutMS: 0,
            socketTimeoutMS: 0,
            serverSelectionTimeoutMS: 0
        });
    } else {
        console.info("MongoDB is not assigned in config.json file");
    };
})();

global.deps = Dependency;