const BaseCommand = require("../../src/BaseCommand");

module.exports = class TicketClose extends BaseCommand {
    constructor() {
        super({ name: "close" }, { subCommand: true });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    async execute({ message, guildConfig }) {
        let res = await guildConfig.get("ticket_users", "user");
    }
}