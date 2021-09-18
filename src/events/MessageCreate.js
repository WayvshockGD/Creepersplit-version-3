const Config = require("../../Config")

/**
 * @param {import("../../typings/Event").MessageCreateEvent} param
 */
module.exports = function({ message, client }) {
    if (!message.content.startsWith(Config.prefix)) return;
    let args = message.content.slice(Config.prefix.length).split(" ");

    let command = client.commands.get(args[0]);

    if (!command) return;

    args = args.slice(1);

    command.execute({
        message,
        args,
        client,
    });
}