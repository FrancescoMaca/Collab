// const GuildSchema = require("@model/GuildSchema");
const UserSchema = require("@models/UserSchema");
module.exports = class Util extends null {
    static generateID (type) {

        let token = "";
        switch (type){
            case "channel":
                do{
                token = "C_";
                const chars = "0123456789".split("");
                for (let i = 0; i < 16; i++) {
                    token += chars[Math.floor(Math.random() * chars.length)];
                };

                
                } while (false)
                return token;
                break;
            case "message":
                do{
                    token = "M_";
                    const chars = "0123456789".split("");
                    for (let i = 0; i < 16; i++) {
                        token += chars[Math.floor(Math.random() * chars.length)];
                    };
    
                    
                    } while (false)
                    return token;
                    break;
            case "guild":
                do{
                    token = "G_";
                    const chars = "0123456789".split("");
                    for (let i = 0; i < 16; i++) {
                        token += chars[Math.floor(Math.random() * chars.length)];
                    };
    
                    
                    } while (!GuildSchema.findOne({token}))
                    return token;
                    break;
            case "user":
                /**
                 * Thanks to MCorange
                 * https://github.com/MCorange99
                 */
                let date = new Date();
                let month = `${("0" + (date.getMonth() + 1)).slice(-2)}`;
                let day = `${("0" + date.getDate()).slice(-2)}`;

                let id = `U_${date.getFullYear()}${month}${day}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${this.getRandomInt(10)}${this.getRandomInt(10)}${this.getRandomInt(10)}`;

                return id;
                break;
            }
    };

    static generateTempToken () {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let token = "H_";

        for (let i = 0; i < 32; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        };

        return token;
    };

    /**
     * @param {number} max 
     */
    static getRandomInt (max) {
        return Math.floor(Math.random() * (max + 1));
    };


    /**
     * Found from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
     * @param {*} str 
     * @param {*} seed 
     * @returns 
     *///            DO NOT CHANGE SEED 
    static cyrb53(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1>>>0);
    };

    /**
     * 
     * @param {*} str 
     * @returns
     */
    static color(str){
        str = str
        .replace(/`?\&r`?/g,  "\x1b[0m")
        .replace(/`?\&br`?/g, "\x1b[0m")
        .replace(/`?\&dm`?/g, "\x1b[2m")
        .replace(/`?\&u`?/g,  "\x1b[4m")
        .replace(/`?\&bl`?/g, "\x1b[5m")
        .replace(/`?\&rv`?/g, "\x1b[7m")
        .replace(/`?\&hd`?/g, "\x1b[8m")
        .replace(/`?\&0`?/g, "\x1b[30m")
        .replace(/`?\&1`?/g, "\x1b[34m")
        .replace(/`?\&2`?/g, "\x1b[32m")
        .replace(/`?\&3`?/g, "\x1b[36m")
        .replace(/`?\&4`?/g, "\x1b[31m")
        .replace(/`?\&5`?/g, "\x1b[35m")
        .replace(/`?\&6`?/g, "\x1b[33m")
        .replace(/`?\&7`?/g, "\x1b[37m")
        .replace(/`?\&b0`?/g, "\x1b[38m")
        .replace(/`?\&b1`?/g, "\x1b[41m") 
        .replace(/`?\&b2`?/g, "\x1b[42m") 
        .replace(/`?\&b3`?/g, "\x1b[46m") 
        .replace(/`?\&b4`?/g, "\x1b[41m") 
        .replace(/`?\&b5`?/g, "\x1b[45m")
        .replace(/`?\&b6`?/g, "\x1b[43m") 
        .replace(/`?\&b7`?/g, "\x1b[47m");
    return str + "\x1b[0m"; // plus reset 
    }
};