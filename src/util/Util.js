const Eris = require("eris");
const { default: ms } = require("ms");
const ExtendedMessage = require("../extend/ExtendedMessage");

module.exports = class Util {
    /**
     * @param {ExtendedMessage} message
     */
    constructor(message) {
        this.message = message;
    }

    codeBlock(content) {
        return "```\n" + content + "\n```";
    }

    /**
     * @param {import("../../typings/Classes").Extended.ExtendedMessageContent} content
     * @param {import("../../typings/Define").Define.MessageOptions} options
     */
    sendMessage(content) {
        return this.message.channel.createMessage(content)
               .catch(err => {
                   console.log(`Bot is unable to talk in channel! #${this.message.channel.id}`);
               });
    }

    /**
     * @param {Eris.Member} member
     */
    memberRoles(member) {
        let guildRoles = [];
        /**
         * @type {Eris.Guild}
         */
        let guild = this.message.channel.guild;

        for (let r of member.roles) {
            guildRoles.push(guild.roles.get(r));
        };

        return guildRoles.sort((a, b) => b.position - a.position);
    }
}