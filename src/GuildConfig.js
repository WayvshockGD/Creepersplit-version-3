const Eris = require("eris");
const { Knex } = require("knex");

module.exports = class GuildConfig {
    /**
     * @param {Knex} db 
     * @param {Eris.Guild} guild
     */
    constructor(db, guild) {
        this.db = db;
        this.guild = guild
    }

    async setOrEdit(table, query) {
        try {
            let raw = await this.db.raw(`SELECT * FROM \`${table}\``);

            if (!raw[0].find(d => d.guild === this.guild.id)) {
                await this.db
                    .insert({ ...query, guild: this.guild.id })
                    .table(table);
                return "set";
            } else {
                await this.db
                    .update({ ...query, guild: this.guild.id })
                    .table(table);
                return "update";
            }
        } catch (error) {
            console.log(`Unable to use config.\n\n${error}`);
        }
    }

    /**
     * @param {string} table
     * @param {string} query
     * @param {string} defaultQuery
     */
    async get(table, query, defaultQuery) {
        if (!(await this.db.schema.hasTable(table))) {
            return defaultQuery;
        }

        let raw = await this.db.raw(`SELECT * FROM \`${table}\``);
        let data = raw[0].find(d => d.guild === this.guild.id);
        return data ? data[query] : defaultQuery;
    }
}