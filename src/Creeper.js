let Eris = require("eris");
let fs = require("fs");
const Config = require("../Config");
const MessageCreate = require("./events/MessageCreate");
const Ready = require("./events/Ready");
const ExtendedMessage = require("./extend/ExtendedMessage");

// For using beta or prod token.
let token = Config.beta ? Config.token.beta : Config.token.bot;

module.exports = class Creeper extends Eris.Client {
    constructor() {
        super(token, Config.eris);

        this.config = Config;

        /**
         * @type {import("../typings/Command").commandMap}
         */
        this.commands = new Map();

        this.type = Config.beta ? "Beta" : "Prod"

        this.loadCommands();
    }

    initEvents() {
        this.on("rawWS", (event) => {
            if (event.t === "MESSAGE_CREATE") {
                let extendedMessage = new ExtendedMessage(event.d, this);
                return MessageCreate({
                    message: extendedMessage,
                    client: this
                });
            };
        });

        this.on("ready", () => Ready());
    }

    /**
     * @param {import("../typings/Define").Define.Colors} color
     */
    getColor(color) {
        let colorTree = {
            Warning: 0xfc0303,
            Info: 0xf4fc03,
            Success: 0x03fc39,
            Default: 0xffa024
        };

        return colorTree[color];
    }

    loadCommands() {
        fs.readdirSync("./commands/").forEach(folder => {
            fs.readdirSync(`./commands/${folder}`).forEach(f => {
                let Command = require(`../commands/${folder}/${f}`);
                /**
                 * @type {import("../typings/Command").CommandData}
                 */
                let data = new Command();

                this.commands.set(data.name, data);
            });
        });
    }
}