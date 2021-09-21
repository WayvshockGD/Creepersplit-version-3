const Config = require("../../Config");
const BaseCommand = require("../../src/BaseCommand");
const ChannelInfo = require("./ChannelInfo");
const RoleInfo = require("./RoleInfo");
const Whois = require("./Whois");

module.exports = class Info extends BaseCommand {
    constructor() {
        super({ name: "info" }, {
            subs: [
                new ChannelInfo(), 
                new Whois(), 
                new RoleInfo()
            ]
        });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    execute({ message, client }) {
        let prefix = Config.prefix;

        return message.util.sendMessage({
            embeds: [{
                description: "Looking for info commands?",
                fields: [{
                    name: "ChannelInfo",
                    value: `\`${prefix}${this.name} channel\``
                }, {
                    name: "RoleInfo",
                    value: `\`${prefix}${this.name} role\``,
                }, {
                    name: "UserInfo",
                    value: `\`${prefix}${this.name} whois\``
                }],
                color: client.getColor("Default")
            }]
        })
    }
}