const { default: ms } = require("ms");
const ExtendedMessage = require("./extend/ExtendedMessage");

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
     * @param {import("../typings/Classes").Extended.ExtendedMessageContent} content
     * @param {import("../typings/Define").Define.MessageOptions} options
     */
    sendMessage(content) {
        return this.message.channel.createMessage(content)
               .catch(err => {
                   console.log(`Bot is unable to talk in channel! #${this.message.channel.id}`);
               });
    }
}