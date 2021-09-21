const Config = require("../Config");

let KNEX = require("knex").knex({
    client: "mysql",
    connection: { ...Config.database }
});

module.exports = KNEX;