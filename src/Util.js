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
    sendMessage(content, options = { delete: undefined }) {
        return this.message.channel.createMessage(content).then(m => {
            if (options.delete) {
                let time;

                if (typeof options.delete === "string") {
                    time = ms(options.delete);
                } else {
                    time = options.delete;
                };

                setTimeout(() => {
                    m.delete();
                }, time);
            }
        })
    }
}