const BaseCommand = require("../../src/BaseCommand");
let pkg = require("../../package.json");

module.exports = class Stats extends BaseCommand {
    constructor() {
        super({ name: "stats" });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx 
     */
    execute({ message, client }) {
        let deps = [];

        for (let [k, v] of Object.entries(pkg.dependencies)) {
            deps.push(`\`${k}\` - \`${v}\``);
        }

        return message.util.sendMessage({
            embeds: [{
                title: `Version ${pkg.version}`,
                author: {
                    name: `Stats of ${client.user.username} (${client.type})`,
                    icon_url: client.user.avatarURL
                },
                fields: [{
                    name: "User size",
                    value: client.users.size.toString()
                }, {
                    name: "Guild size",
                    value: client.guilds.size.toString()
                }, {
                    name: "Shards",
                    value: client.shards.size.toString()
                }, {
                    name: "Dependencies",
                    value: deps.join("\n")
                }],
                color: client.getColor("Default"),
            }],
        });
    }
}