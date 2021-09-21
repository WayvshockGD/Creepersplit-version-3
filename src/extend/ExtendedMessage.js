const { Message, Guild } = require("eris");
const Util = require("../util/Util");

module.exports = class ExtendedMessage extends Message {
    constructor(data, client) {
        super(data, client);

        this.util = new Util(this);
    }

    /**
     * @param {string} args 
     * @returns 
     */
    getRole(args) {
        /**
         * @type {Guild}
         */
        let guild = this.channel.guild;

        return guild.roles.find(role => role.id === args) ||
               guild.roles.find(role => role.mention === args) ||
               guild.roles.find(role => role.name === args);
    }

    /**
     * @param {string} args 
     * @returns 
     */
    getChannel(args) {
        /**
         * @type {Guild}
         */
        let guild = this.channel.guild;

        return guild.channels.find(c => c.id === args) ||
               guild.channels.find(c => c.mention === args) ||
               guild.channels.find(c => c.name === args);
    }

    /**
     * @param {string} args 
     * @returns 
     */
    getMember(args) {
        /**
         * @type {Guild}
         */
        let guild = this.channel.guild;

        return guild.members.find(member => member.id === args) ||
               guild.members.find(member => member.mention === args) ||
               guild.members.find(member => member.nick === args);
    }

    /**
     * @param {string} content
     */
    reply(content) {
        return this.channel.createMessage(`<@${this.author.id}>, ${content}`);
    }
}