const Eris = require("eris");
const BaseCommand = require("../../src/BaseCommand");

module.exports = class Avatar extends BaseCommand {
    constructor() {
        super({ name: "avatar" }, {
            hasArgs: (args, message) => {
                return (args.length) ? message.getMember(args[0]) : message.member;
            }
        });
    }

    /**
     * @param {import("../../typings/Command").CommandCTX} ctx
     */
    execute({ message, args }) {
        /**
         * @type {Eris.Member} 
         */
        let member = args.has;

        if (!member) {
            return this.sendError(message.channel, "That member could not be found");
        }

        message.util.sendMessage(member.user.dynamicAvatarURL());
    }
}