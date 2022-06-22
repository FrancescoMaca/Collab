const v1Routes = require("./v1/v1");
const router = require("express").Router();

router.use("/", v1Routes);
router.use("/v1", v1Routes);

module.exports = router;