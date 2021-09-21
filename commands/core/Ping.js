const BaseCommand = require("../../src/BaseCommand");

module.exports = class Ping extends BaseCommand {
    constructor() {
        super({ 
            name: "ping",
            description: "Command to show shard and bot ping."
        });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} data
     */
    execute({ message, client }) {
        let now = Date.now();

        message.util.sendMessage("Pinging...").then(msg => {
            let diff = (Date.now() - now);
            let shard = message.channel.guild.shard;

            msg.edit({
                content: "",
                embeds: [{
                    description: `:stopwatch: \`${diff}ms\`, :heartbeat: \`${shard.latency}ms\``,
                    color: client.getColor("Info")
                }]
            })
        })
    }
}