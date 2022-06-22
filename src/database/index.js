const mongoose = require("mongoose");
const config = require("../../config.json")

exports.Database = class {
    constructor(){
        this.connect = connect()
    }
    connect(){
        this.mongoose.connection.once("open", () => {
            console.info("Mongodb is now connected");
        });
            
        if (config.MongoDB) {
            mongoose.connect(config.MongoDB, {
                keepAlive: true,
                connectTimeoutMS: 0,
                socketTimeoutMS: 0,
                serverSelectionTimeoutMS: 0
            });
        } else {
            console.info("MongoDB is not assigned in config.json file");
        };
    }
};