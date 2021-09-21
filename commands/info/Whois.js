const Eris = require("eris");
let moment = require("moment");
const BaseCommand = require("../../src/BaseCommand");

module.exports = class Whois extends BaseCommand {
    constructor() {
        super({ name: "whois" }, {
            subCommand: true,
            hasArgs: (args, message) => {
                return (args.length) ? message.getMember(args[0]) : message.member;
            }
        })
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    execute({ message, args, client }) {
        /**
         * @type {Eris.Member}
         */
        let member = args.has;

        let roles = [];
        let rawRoleData = [];

        for (let role of message.util.memberRoles(member)) {
            roles.push(`\`${role.name.replace(" ", "_")}\``);
            rawRoleData.push(role);
        }

        if (!roles.length) {
            roles = ["No roles to show"];
        }

        if (!member) {
            return this.sendError(message.channel, "No member found");
        }

        let act = member.status;

        message.util.sendMessage({
            embeds: [{
                author: {
                    icon_url: member.avatarURL,
                    name: `Showing ${member.username}'s info`
                },
                fields: [{
                    name: "ID",
                    value: member.id
                }, {
                    name: "Bot",
                    value: member.user.bot ? "Yes" : "No"
                }, {
                    name: "Activity",
                    value: (typeof act === "undefined") ? "offline" : act
                }, {
                    name: "Joined At",
                    value: moment.unix(member.joinedAt / 1000).format("llll")
                }, {
                    name: "Roles",
                    value: (roles.length > 45) ? "Too large to show" : roles.join(", ")
                }],
                color: rawRoleData[0].color
            }]
        });
    }
}