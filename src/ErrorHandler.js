const Creeper = require("./Creeper");

/**
 * @param {Creeper} client
 */
module.exports = function(client) {
    client.on("warn", (err) => console.log(err));
    client.on("error", (err) => console.log(err));
    client.on("shardReady", (id) => console.log(`Shard ${id}`));
    process.on("unhandledRejection", (reason) => console.log(reason));
    process.on("uncaughtException", (reason) => console.log(reason));
}