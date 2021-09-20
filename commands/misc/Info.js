const BaseCommand = require("../../src/BaseCommand");

module.exports = class Info extends BaseCommand {
    constructor() {
        super({ name: "info" }, {
            subs: ["channel"]
        });
    }
}