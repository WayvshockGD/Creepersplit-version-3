const { default: ms } = require("ms");
const BaseCommand = require("../../src/BaseCommand");

module.exports = class TicketClose extends BaseCommand {
    constructor() {
        super({ name: "close" }, { subCommand: true });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    async execute({ message, guildConfig, client }) {
        let res = await guildConfig.get("ticket_users", "channel", {
            withUser: true
        });
        let category = await guildConfig.get("tickets", "category");

        if (!res) {
            return this.sendError(message.channel, "You do not have a ticket open.");
        } else {
            message.util.sendMessage("Deleting your ticket in 5 seconds...");

            setTimeout(() => {
                client.deleteChannel(res);
            }, ms("5s"));
        }
    }
}