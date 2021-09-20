const { TextChannel } = require("eris");

module.exports = class BaseCommand {
    /**
     * @param {import("../typings/Command").CommandData} data
     * @param {import("../typings/Command").CommandOptions} options
     */
    constructor(data, options) {
        this.name = data.name;
        this.description = data.description;

        this.options = Object.assign({
            hasArgs: (args, message) => {
                return true;
            },
            permLevel: undefined,
            enabled: true,
            requiredArgs: 0,
            permissions: [],
            subs: undefined
        }, options);
    }

    /**
     * @param {TextChannel} channel
     * @param {string} content
     */
    sendError(channel, content) {
        return channel.createMessage({
            embeds: [{
                description: `:x: ${content}`,
                color: 0xf54242
            }]
        });
    }
}