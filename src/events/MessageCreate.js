const Config = require("../../Config");
const Help = require("../Help");

/**
 * @param {import("../../typings/Event").MessageCreateEvent} param
 */
module.exports = function ({ message, client }) {
    if (!message.content.startsWith(Config.prefix)) return;
    let args = message.content.slice(Config.prefix.length).split(" ");

    if (args[0] === "help") {
        return new Help(message, args.slice(1), client);
    }

    let command = client.commands.get(args[0]) || client.aliases.get(args[0]);

    if (!command) return;

    args = args.slice(1);

    let has = command.options.hasArgs(args, message);

    if (has === false) {
        return;
    }

    if (command.options.subs) {
        if (!command.options.enabled) {
            return;
        }

        let sub = client.subCommands.get(args[0]);

        if (sub) {
            let subArgs = sub.options.hasArgs(args.slice(1), message);
            args = args.slice(1);

            return sub.execute({
                client,
                message,
                args: {
                    command: args,
                    has: subArgs
                }
            })
        }
    }

    command.execute({
        message,
        args: {
            command: args,
            has
        },
        client,
    });
}