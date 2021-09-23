let Eris = require("eris");
let Creeper = require("../Creeper");

module.exports = class PluginManager {
    /**
     * @param {Creeper} client
     */
    constructor(client) {
        /**
         * @type {Map<string, commandPlugin>}
         */
        this.cache = new Map();

        /**
         * @type {Map<string, pluginData>}
         */
        this.pluginCache = new Map();

        this.client = client;
    }

    startLoad() {
        let index = require("./files/index");
        for (let plugin of index) {
            this.pluginCache.set(plugin.name, plugin);

            for (let command of plugin.commands) {
                this.cache.set(command.name, command);

                if (command.hasOwnProperty("aliases")) {
                    for(let alias of command.aliases) {
                        this.cache.set(alias, command);
                    }
                }
            }
        }
    }

    /**
     * @param {import("../../typings/Classes").Extended.Message} message
     * @param {string[]} args
     */
    onMessage(message, args) {
        if (this.client.commands.has(args[0])) {
            return;
        }

        let plugin = this.cache.get(args[0]);

        if (!plugin) {
            return;
        }

        if (!plugin.enabled) {
            return message.util.sendMessage("This command plugin is currently disabled.");
        }

        plugin.execute(message, args.slice(1), this.client);
    }
}

/**
 * @typedef {object} pluginData
 * @property {string} name
 * @property {comandPlugin[]} commands
 */

/**
 * @typedef {object} commandPlugin
 * @property {string} name
 * @property {boolean} enabled
 * @property {Array<string>} aliases
 * @property {(message: import("../../typings/Classes").Extended.Message, args: string[], client: Creeper) => void} execute
 */