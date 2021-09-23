let Eris = require("eris");
let fs = require("fs");
const Config = require("../Config");
const MessageCreate = require("./events/MessageCreate");
const Ready = require("./events/Ready");
const ExtendedMessage = require("./extend/ExtendedMessage");
const KNEX = require("./Knex");
const PluginManager = require("./plugins/PluginManager");
const Topgg = require("./Topgg");

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

        /**
         * @type {import("../typings/Command").commandMap}
         */
        this.subCommands = new Map();

        /**
         * @type {import("../typings/Command").commandMap}
         */
        this.aliases = new Map();

        this.plugins = new PluginManager(this);
        this.topgg = new Topgg(this);

        this.db = KNEX;

        this.type = Config.beta ? "Beta" : "Prod";

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

        this.on("ready", () => {
            Ready(this);
            this.topgg.post();
        });
    }

    /**
     * @param {import("../typings/Define").Define.Colors} color
     */
    getColor(color) {
        let colorTree = {
            Warning: 0xfc0303,
            Info: 0xf4fc03,
            Success: 0x03fc39,
            Default: 0xffa024,
            Random: Math.floor(Math.random() * (0xffffff + 1))
        };

        return colorTree[color];
    }

    loadCommands() {
        this.plugins.startLoad();
        
        fs.readdirSync("./commands/").forEach(folder => {
            fs.readdirSync(`./commands/${folder}`).filter(fi => fi.endsWith(".js")).forEach(f => {
                let Command = require(`../commands/${folder}/${f}`);
                /**
                 * @type {import("../typings/Command").CommandData}
                 */
                let data = new Command();

                if (!data.options.subs) {
                    if (!data.options.subCommand) {
                        if (!data.options.category) data.options.category = folder.toLowerCase();
                        this.commands.set(data.name, data);

                        if (data.aliases) {
                            for (let a of data.aliases) {
                                this.aliases.set(a, data);
                            }
                        }
                    }
                } else {
                    if (!data.options.subCommand) {
                        if (!data.options.category) data.options.category = folder.toLowerCase();
                        this.commands.set(data.name, data);
                    }
                    if (data.aliases) {
                        for(let a of data.aliases) {
                            this.aliases.set(a, data);
                        }
                    }
                    for (let s of data.options.subs) {
                        let subCommand;

                        if (typeof s === "string") {
                            subCommand = this.commands.get(s);
                        } else {
                            subCommand = s;
                        }

                        this.subCommands.set(subCommand.name, subCommand);
                    }
                }
            });
        });
    }
}