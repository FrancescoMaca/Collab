const http = require('http');
const express = require("express");
const cors = require("cors");
const middleware = require("../util/middleware");
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
        const route = require("./routes");

        this.app.use("/api", route);
    };

    listen (port) {
        const server = this.app.listen(port, () => {
            deps.ws.init(server);
            console.log(`Server is ready on http://localhost:${port}/api`);
        });
    };
};
