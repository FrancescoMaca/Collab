const router = require("express").Router();

router.use("/", require("./POST"));
router.use("/", require("./GET"));

module.exports = router;