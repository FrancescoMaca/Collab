const UserSchema = require("../models/UserSchema");
// const GuildSchema = require("../models/GuildSchema");

module.exports = class Validation extends null {
    // static async isEmailAvailable (email) {
    //     return (await UserSchema.findOne({ email })) ? false : true;
    // };
    static async isUsernameAvailable (username) {
        return (await UserSchema.findOne({ username })) ? false : true;
    };
};