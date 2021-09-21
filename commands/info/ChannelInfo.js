const Eris = require("eris");
const moment = require("moment");
const BaseCommand = require("../../src/BaseCommand");

module.exports = class ChannelInfo extends BaseCommand {
    constructor() {
        super({ name: "channel" }, {
            subCommand: true,
            hasArgs: function(args, message) {
                return (args.length) ? message.getChannel(args[0]) : message.channel;
            }
        });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    execute({ message, args, client }) {
        /**
         * @type {Eris.Channel}
         */
        let channel = args.has;

        if (!channel) {
            return this.sendError(message.channel, "No channel found");
        }

        message.util.sendMessage({
            embeds: [{
                description: `Viewing channel ${channel.mention}`,
                fields: [{
                    name: "ID",
                    value: channel.id
                }, {
                    name: "Created at",
                    value: moment.unix(channel.createdAt / 1000).format("llll")
                }],
                color: client.getColor("Default")
            }]
        })
    }
}