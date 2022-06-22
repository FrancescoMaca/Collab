const router = require("express").Router();

router.use("/", require("./POST/post"));
router.use("/", require("./GET/get"));

module.exports = router; // ye