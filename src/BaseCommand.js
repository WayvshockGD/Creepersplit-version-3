module.exports = class BaseCommand {
    /**
     * @param {import("../typings/Command").CommandData} data
     * @param {import("../typings/Command").CommandOptions} options
     */
    constructor(data, options) {
        this.name = data.name
        this.description = data.description;
        this.options = options;
    }
}