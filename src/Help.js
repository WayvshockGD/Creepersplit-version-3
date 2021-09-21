const Creeper = require("./Creeper");

module.exports = class Help {
    /**
     * @param {Creeper} client
     * @param {import("../typings/Classes").Extended.Message} message 
     * @param {string[]} args 
     */
    constructor(message, args, client) {
        this.message = message;
        this.args = args;
        this.client = client;

        if (!args.length) {
            this.sendMenu();
        } else {
            this.sendWithArgs();
        }
    }

    sendMenu() {
        let prefix = this.client.config.prefix;

        let core = [];
        let info = [];
        let misc = [];

        for (let command of this.client.commands.values()) {
            switch (command.options.category) {
                case "core":
                    core.push(`\`${prefix}${command.name}\`${command.options.enabled ? "" : " (disabled)"}`);
                    break;
                case "misc":
                    misc.push(`\`${prefix}${command.name}\``);
                    break;
                case "info":
                    info.push(`\`${prefix}${command.name}\``);
                    break;
            };
        }

        this.message.channel.createMessage({
            embeds: [{
                fields: [{
                    name: "Core Commands",
                    value: core.join(", ")
                }, {
                    name: "Info Commands",
                    value: info.join(", ")
                }, {
                    name: "Misc Commands",
                    value: misc.join(", ")
                }],
                footer: {
                    text: `To look at a command say ${prefix}help <command>`,
                    icon_url: this.client.user.avatarURL
                },
                color: this.client.getColor("Default")
            }]
        })
    }

    sendWithArgs() {
        let command = this.client.commands.get(this.args[0]);

        if (!command) {
            return this.message.channel.createMessage(`Command ${this.args[0]} wasn't found.`);
        };

        let data = [];
        let subCommands = [];

        let { options } = command;
        let { prefix } = this.client.config;
        let { util } = this.message;

        data.push(`Name - ${command.name}`);

        data.push(`Is enabled - ${options.enabled ? "Yes" : "No"}`);

        if (command.description) data.push(`Description - ${command.description}`);

        if (command.aliases.length) data.push(`Aliases - ${command.aliases.join(", ")}`);

        if (options.permissions.length) data.push(`Permissions - ${options.permissions.join(", ")}`);

        if (options.category) data.push(`Category - ${options.category}`);

        if (options.subs.length) {
            for (let sub of options.subs) {
                subCommands.push(`${prefix}${command.name} ${sub.name}`);
            };
        };

        let commandData = [];

        if (data.length) {
            commandData.push(util.codeBlock(data.join("\n")));
        }

        if (subCommands.length) {
            commandData.push(util.codeBlock(`Sub Commands:\n${subCommands.join("\n")}`));
        }

        this.message.channel.createMessage(commandData.join(""));
    }
}