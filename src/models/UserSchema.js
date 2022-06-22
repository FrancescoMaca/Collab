const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
    _id: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    hash: {
        type: String,
        required: true
    },
    api: {
        token: {
            type: String,
            unique: true,
            required: true
        }
    },
    rooms: {
        type: Array,
        default: []
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = models.users || model("users", UserSchema);