const BaseCommand = require("../../src/BaseCommand");
const TicketClose = require("./TicketClose");
const TicketNew = require("./TicketNew");
const TicketSet = require("./TicketSet");

module.exports = class Ticket extends BaseCommand {
    constructor() {
        super({ "name": "ticket" }, {
            enabled: true,
            subs: [
                new TicketClose(),
                new TicketNew(),
                new TicketSet()
            ]
        })
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    execute({ message, prefix, client }) {
        return message.util.sendMessage({
            embeds: [{
                title: "Ticket Commands",
                fields: [{
                    name: "New",
                    value: `\`${prefix}${this.name} new\``
                }, {
                    name: "Set (Admin only)",
                    value: `\`${prefix}${this.name} set\``
                }],
                color: client.getColor("Default")
            }]
        })
    }
}