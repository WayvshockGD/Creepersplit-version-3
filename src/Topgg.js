const Creeper = require("./Creeper");
let topgg = require("@top-gg/sdk");
const Config = require("../Config");

module.exports = class Topgg {
    /**
     * @param {Creeper} client
     */
    constructor(client) {
        this.client = client;
        this.api = new topgg.Api(Config.dbl.token);
    }

    post() {
        return this.api.postStats({ 
            serverCount: this.client.guilds.size,
            shardCount: this.client.shards.size 
        });
    }
}