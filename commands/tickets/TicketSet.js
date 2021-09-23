const Eris = require("eris");
const BaseCommand = require("../../src/BaseCommand");

module.exports = class TicketSet extends BaseCommand {
    constructor() {
        super({ name: "set" }, {
            permLevel: "Admin",
            subCommand: true,
        });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    async execute({ message, guildConfig, args }) {

        if (!args.command[0]) {
            return this.sendError(message.channel, "No category is provided.");
        }

        let res = await guildConfig.setOrEdit("tickets", { category: args.command[0] });

        if (res === "set") {
            return message.util.sendMessage(`Set the category to <#${args.command[0]}>.`)
        } else {
            return message.util.sendMessage(`Updated the category to <#${args.command[0]}>.`);
        }
    }
}