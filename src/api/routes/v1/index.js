const router = require("express").Router();

router.use("/room", require("./room"));
router.use("/user", require("./user"));

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Henlo World"
    });
});

module.exports = router;