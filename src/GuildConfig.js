const Eris = require("eris");
const { Knex } = require("knex");

module.exports = class GuildConfig {
    /**
     * @param {Knex} db 
     * @param {Eris.Guild} guild
     * @param {Eris.Message} message
     */
    constructor(db, guild, message) {
        this.db = db;
        this.guild = guild;
        
        if (message) {
            this.author = message.author;
        }
    }

    async setOrEdit(table, query, update) {
        try {
            let raw = await this.db.raw(`SELECT * FROM \`${table}\``);

            if (!raw[0].find(d => d.guild === this.guild.id)) {
                await this.db
                    .insert({ ...query, guild: this.guild.id })
                    .table(table);
                return "set";
            } else {
                if (update) {
                    await this.db
                    .update({ ...query, guild: this.guild.id })
                    .table(table);
                 return "update";
                } else {
                    await this.db
                    .insert({ ...query, guild: this.guild.id })
                    .table(table);
                return "set";
                }
            }
        } catch (error) {
            console.log(`Unable to set or update guildConfig.\n\n${error}`);
        }
    }

    /**
     * @param {string} table
     * @param {string} query
     * @param {string} defaultQuery
     * @param {getOptions} options
     */
    async get(table, query, options = { defaultQuery: undefined, customFilter: undefined }) {
        if (!(await this.db.schema.hasTable(table))) {
            return defaultQuery;
        }

        let raw = await this.db.raw(`SELECT * FROM \`${table}\``);
        
        if (options.hasOwnProperty("withUser")) {
            let data = raw[0].find(d => d.guild === this.guild.id && d.user === this.author.id);
            return data ? data[query] : options.defaultQuery;
        } else if (options.customFilter) {
            let data = raw[0].find(d => d.guild === this.guild.id && options.customFilter(d));
            return data ? data[query] : options.defaultQuery;
        } else  {
            let data = raw[0].find(d => d.guild === this.guild.id);
            return data ? data[query] : options.defaultQuery;
        }
    }

    async delete(table, query) {
        let raw = await this.db.raw(`SELECT * FROM \`${table}\``);

        if (!raw) {
            return;
        } else {
            await this.db(table).where({ guild: this.guild.id, ...query }).del();
        }
    }
}

/**
 * @typedef {object} getOptions
 * @property {string} defaultQuery
 * @property {boolean} withUser
 * @property {(data: any) => void} customFilter
 */