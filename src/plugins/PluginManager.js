let Eris = require("eris");
let fs = require("fs");
let Creeper = require("../Creeper");

module.exports = class PluginManager {
    /**
     * @param {Creeper} client
     */
    constructor(client) {
        /**
         * @type {Map<string, pluginData>}
         */
        this.cache = new Map();

        this.client = client;
    }

    startLoad() {
        fs.readdirSync("src/plugins/files/").forEach(file => {

            if (file === "index.js") return;
            /**
             * @type {pluginData}
             */
            let plugin = require(`./files/${file}`);

            if (!typeof plugin === "object") {
                throw new Error("Plugin is not an object.");
            } else {
                this.cache.set(plugin.name, plugin);
            }
        })
    }

    /**
     * @param {Eris.Message} message
     * @param {string[]} args
     */
    onMessage(message, args) {
        if (this.client.commands.has(args[0])) {
            return;
        }

        let plugin = require("./files/index").find(c => c.name === args[0]);

        if (!plugin) {
            return;
        }

        plugin.execute(message, args, this.client);
    }
}

/**
 * @typedef {object} pluginData
 * @property {string} name
 * @property {boolean} enabled
 * @property {(message: Eris.Message, args: string[], client: Creeper) => void} execute
 */