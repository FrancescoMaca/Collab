const Util = require("@util/util");
const { color } = require("@util/util")
const Validation = require("@util/validation");
const pkgValidator = require("validator");
const UserSchema = require("@models/UserSchema");
const router = require("express").Router();

router.post("/", async (req, res) => {
    console.log(color("&r&2[&3users&2]&1|&2[&6POST&2] &1- &2postUser has been trigered"));
    
    const { username, email, displayName, password } = req.body;
    if (!email || !username || !displayName || !password) {
        return res.status(400).json({
            code: "MissingProps",
            status: 400,
            props: ["email", "username", "displayName", "password"],
            message: "email, username, displayName & password are necessary fields"
        });
    };

    if (!(await Validation.isUsernameAvailable(username))) {
        return res.status(409).json({
            code: "UsernameAlreadyTaken",
            status: 409,
            message: "The username is already taken"
        });
    };

    if (!pkgValidator.isEmail(email)) {
        return res.status(400).json({
            code: "InvalidEmail",
            status: 400,
            message: "Email address is not valid"
        });
    };

    if (!(await Validation.isEmailAvailable(email))) {
        return res.status(409).json({
            code: "EmailAlreadyUsed",
            status: 409,
            message: "The email address is already in use"
        });
    };


    const hash = Util.cyrb53(password).toString();

    const _id = Util.generateID("user");
    await new UserSchema({
        _id, email, username, displayName, hash,
        api: {
            token: Util.generateTempToken()
        }}
        ).save();

    let user = await UserSchema.findOne({ _id });
    user = {
        id: String(user._id),
        username: String(user.username),
        displayName: String(user.displayName),
        hash: String(user.hash),
        verified: Boolean(user.verified),
        token: String(user.api.token),
        createdAt: String(new Date(user.createdAt).toISOString())
    };

    return res.status(200).json({ ...user });
});

module.exports = router;