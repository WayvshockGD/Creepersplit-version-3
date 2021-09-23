const BaseCommand = require("../../src/BaseCommand");

module.exports = class Prefix extends BaseCommand {
    constructor() {
        super({ name: "prefix" }, {
            hasArgs: (args, message) => {
                if (!args.length) {
                    message.util.sendMessage("Say a prefix to set for this guild.");
                    return false;
                }
                return true;
            }
        });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    async execute({ message, args, guildConfig }) {
        let res = await guildConfig.setOrEdit("prefixes", { "prefix": args.command[0] });

        if (res === "set") {
            return message.util.sendMessage(`Set guild prefix to \`${args.command[0]}\`.`);
        } else {
            return message.util.sendMessage(`Updated prefix to \`${args.command[0]}\`.`)
        }
    }
}