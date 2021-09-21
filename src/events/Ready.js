const Creeper = require("../Creeper");

/**
 * @param {Creeper} client
 */
module.exports = function(client) {
    console.log(`Registered ${client.plugins.cache.size} plugins`);
    
    console.log("Ready!");
}