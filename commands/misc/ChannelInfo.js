const Eris = require("eris");
const BaseCommand = require("../../src/BaseCommand");

module.exports = class ChannelInfo extends BaseCommand {
    constructor() {
        super({ name: "channel" }, {
            hasArgs: function(args, message) {
                return (args.length) ? message.getChannel(args[0]) : message.channel;
            }
        });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    execute({ message, args }) {
        /**
         * @type {Eris.Channel}
         */
        let channel = args.has;

        if (!channel) {
            return this.sendError(message.channel, "No channel found");
        }

        message.util.sendMessage({
            embeds: [{
                description: "test"
            }]
        })
    }
}