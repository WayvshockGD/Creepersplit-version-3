const Eris = require("eris");
const BaseCommand = require("../../src/BaseCommand");

module.exports = class RoleInfo extends BaseCommand {
    constructor() {
        super({ name: "role" }, {
            subCommand: true,
            hasArgs: (args, message) => {
                return (args.length)
                       ? message.getRole(args[0])
                       : message.channel.guild.roles.get(message.member.roles[0]);
            }
        });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    execute({ message, args, client }) {
        /**
         * @type {Eris.Role}
         */
        let role = args.has;

        if (!role) {
            return this.sendError(message.channel, "No role found");
        };

        message.util.sendMessage({
            embeds: [{
                color: role.color,
                fields: [{
                    name: "Name",
                    value: role.name
                }, {
                    name: "ID",
                    value: role.id,
                }, {
                    name: "Managed",
                    value: role.managed ? "Yes" : "No"
                }]
            }]
        })
    }
}