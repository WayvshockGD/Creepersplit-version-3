const Creeper = require("../Creeper");

/**
 * @param {Creeper} client
 */
module.exports = async function(client) {
    let size = client.plugins.pluginCache.size;

    console.log(`Registered ${size} plugin${size > 0 ? "s" : ""}`);
    
    console.log("Ready!");

    if (!(await client.db.schema.hasTable("prefixes"))) {
        console.log("Creating table 'prefixes'...");

        await client.db.schema.createTable("prefixes", (t) => {
            t.string("guild").notNullable();
            t.string("prefix");
        });
    }

    if (!(await client.db.schema.hasTable("tickets"))) {
        console.log("Creating table 'tickets'...");

        await client.db.schema.createTable("tickets", (t) => {
            t.string("guild").notNullable();
            t.string("category");
        });
    }

    if (!(await client.db.schema.hasTable("ticket_users"))) {
        console.log("Creating table 'ticket_users'...");

        await client.db.schema.createTable("ticket_users", (t) => {
            t.string("guild").notNullable();
            t.string("channel").notNullable();
            t.string("user");
        })
    }
};