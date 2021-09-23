const Config = require("../../Config");
const GuildConfig = require("../GuildConfig");
const Help = require("../Help");

/**
 * @param {import("../../typings/Event").MessageCreateEvent} param
 */
module.exports = async function ({ message, client }) {
    if (!message.channel.type === 0) return;

    let guildConfig = new GuildConfig(client.db, message.channel.guild);

    let prefix = await guildConfig.get("prefixes", "prefix", Config.prefix);

    if (!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).split(" ");

    if (args[0] === "help") {
        return new Help(message, args.slice(1), client, prefix);
    }

    client.plugins.onMessage(message, args);

    let command = client.commands.get(args[0]) || client.aliases.get(args[0]);

    if (!command) return;

    args = args.slice(1);

    let has = command.options.hasArgs(args, message);

    if (has === false) {
        return;
    }

    if (command.options.permLevel === "Admin" 
        && !message.channel.guild.permissionsOf(message.author.id).has("manageGuild")) {
            return message.util.sendMessage(`You need the perm \`manageGuild\` to access \`${command.name}\``);
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
                guildConfig,
                prefix,
                args: {
                    command: args,
                    has: subArgs
                }
            })
        }
    }

    command.execute({
        message,
        guildConfig,
        prefix,
        args: {
            command: args,
            has
        },
        client,
    });
}