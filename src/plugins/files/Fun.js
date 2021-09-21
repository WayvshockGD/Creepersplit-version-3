const Eris = require("eris");
const { default: got } = require("got/dist/source");
const Creeper = require("../../Creeper");

/**
 * @param {import("../../../typings/Classes").Extended.Message} message 
 * @param {string[]} args 
 * @param {Creeper} client 
 */
exports.meme = async function(message, args, client) {
    let url = "https://www.reddit.com/r/meme/hot/.json?limit=100";

    let request = await got(url);
    let parsed = JSON.parse(request.rawBody);
    let random = parsed.data.children[Math.floor(Math.random() * parsed.data.children.length)].data;

    /**
     * @type {Eris.Embed}
     */
    let embed = {
        title: random.title
    };

    if (random.thumbail) {
        embed["image"].url = random.thumbail;
    }

    if (random.self_text) {
        embed["description"] = random.self_text;
    }

    return message.util.sendMessage({
        embeds: [{
            footer: { text: `` }
        }]
    })
}