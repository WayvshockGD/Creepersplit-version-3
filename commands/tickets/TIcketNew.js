const BaseCommand = require("../../src/BaseCommand");

module.exports = class TicketNew extends BaseCommand {
    constructor() {
        super({ name: "new" }, { subCommand: true });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    async execute({ message, guildConfig, client }) {
        let res = await guildConfig.get("tickets", "category");

        if (!res) {
            return this.sendError(message.channel, "No ticket channel has been set yet.");
        };

        let ticketMessage = [
            "Welcome to your ticket.",
            "Please wait for a online admin or moderator.",
            "Do not spam, ping anyone to help faster or test the tickets.",
            "Spamming tickets will lead to a bot blacklist for 3 days."
        ];

        message.channel.guild.createChannel(`ticket_${message.author.id}`, 0, {
            "parentID": res
        })
        .then(channel => {
            message.util.sendMessage(`Ticket created. <#${channel.id}>`);
            channel.createMessage({
                embeds: [{
                    title: `Ticket ${message.author.username}`,
                    description: ticketMessage.join("\n"),
                    color: client.getColor("Success"),
                    footer: {
                        text: `Created at ${new Date().toISOString()}`
                    }
                }]
            })
        })
        .catch(err => {
            this.sendError(message.id, "Invalid category ID.");
        })
    }
}