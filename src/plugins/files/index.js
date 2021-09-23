let FunPlugin = require("./Fun");
let MiscPlugin = require("./Misc");

/**
 * @type {import("../PluginManager").pluginData[]}
 */
module.exports = [{
    name: "Fun",
    commands: [{
        name: "meme",
        enabled: true,
        execute: FunPlugin.meme
    }, {
        name: "clyde",
        aliases: ["c"],
        enabled: true,
        execute: FunPlugin.clyde
    }],
}, {
    name: "misc",
    commands: [{
        name: "poll",
        enabled: true,
        execute: MiscPlugin.poll
    }, {
        name: "rainbow",
        aliases: ["r"],
        enabled: true,
        execute: MiscPlugin.rainbow
    }]
}];