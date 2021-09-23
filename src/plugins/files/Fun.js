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
        description: "",
        title: random.title,
        author: {
            name: random.author
        },
        image: {
            url: ""
        }
    };

    if (random.over_18 && !message.channel.nsfw) {
        return message.channel.createMessage("I cannot send a over 18 post in a non-nsfw channel.");
    }


    if (random.preview.images.length) {
        embed.image.url = random.preview.images[0].source.url.replace('&amp;', '&');
    }

    if (random.self_text) {
      embed.description = random.self_text;
    };

    return message.util.sendMessage({
        embeds: [{
            ...embed,
            footer: { text: `🗨️ ${random.num_comments} 👍 ${random.ups}` },
            color: client.getColor("Random")
        }]
    })
}

/**
 * @param {import("../../../typings/Classes").Extended.Message} message 
 * @param {string[]} args
 */
exports.clyde = function(message, args) {
    if (!args.length) {
        return message.util.sendMessage("Say something for clyde");
    };

    let encoded = encodeURI(`https://ctk-api.herokuapp.com/clyde/${args.join(" ")}`);

    return message.util.sendMessage(encoded);
}