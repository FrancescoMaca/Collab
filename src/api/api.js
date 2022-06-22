// contains front end related things
const http = require('http');

// contains the express api, used to create sites :(
const express = require("express");

// browsers use this to to protect from cross site cross site request forgery (csrf)
const cors = require("cors"); // some protection for api // 

// methods that are called between the api calls and the express framework
const middleware = require("../util/middleware");

// Seerver configuration file
const config = require("../../config.json")

exports.API = class {
    constructor () {
        this.app = express();
        this.middleware();
        this.setRoutes();
        this.server = http.createServer(this.app)

        this.app.all("*", (req, res) => {
            return res.status(404).json({
                code: "InvalidRoute",
                message: req.path + " does not exist",
                method: req.method
            });
        });

        const port = config.api.port || 3000;
        this.listen(port)
    };

    middleware () {
        this.app.use(express.json());
        this.app.use(middleware.handleInvalidBody());
        this.app.use(cors({
            origin: "*",
            methods: ["GET", "POST"]
        }));
    };

    setRoutes () {
        const route = require("./routes/routes");

        this.app.use("/api", route);
    };

    listen (port) {
        const server = this.app.listen(port, () => {
            deps.ws.init(server);
            console.log(`Server is ready on http://localhost:${port}/api`);
        });
    };
};
