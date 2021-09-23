const { default: ms } = require("ms");
const Creeper = require("../../Creeper");

let images = [
    "https://www.tynker.com/projects/screenshot/58b9ea481c36d1b7508b4587/random-rainbow.png",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b297dd68-0962-4772-b642-106c443af381/d4uqkat-d3707ead-55b1-4bcf-8104-4cb41ad9550d.jpg/v1/fill/w_900,h_675,q_75,strp/another_random_rainbow_texture_by_quackdom_d4uqkat-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD02NzUiLCJwYXRoIjoiXC9mXC9iMjk3ZGQ2OC0wOTYyLTQ3NzItYjY0Mi0xMDZjNDQzYWYzODFcL2Q0dXFrYXQtZDM3MDdlYWQtNTViMS00YmNmLTgxMDQtNGNiNDFhZDk1NTBkLmpwZyIsIndpZHRoIjoiPD05MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.IT1I-U97mbQbCnn1KvFb5yJmmpwjRsOQmmX_CPD1TeE",
    "https://www.elizabethsuttoncollection.com/wp-content/uploads/2019/05/Prism-Random-Rainbow-Elizabeth-Sutton-Fine-Art.jpg",
    "https://i.pinimg.com/originals/0b/70/98/0b70985c28d53df79042de028ba1d284.jpg"
];

/**
  * @param {import("../../../typings/Classes").Extended.Message} message
  * @param {string[]} args
  */
exports.poll = async function (message, args) {
    // old:
    // message.react('👍')
    // message.react('👎')

    if (!args.length) {
        return message.util.sendMessage("Provide something for the poll.");
    }

    setTimeout(() => {
        message.delete();
    }, ms("2s"));

    message.util.sendMessage(args.join(" ")).then(msg => {
        msg.addReaction("👍");
        msg.addReaction("👎");
    });
}

/**
  * @param {import("../../../typings/Classes").Extended.Message} message
  * @param {Creeper} client
  */
exports.rainbow = function (message, args, client) { 
    return message.util.sendMessage({
        embeds: [{
            image: {
                url: images[Math.floor(Math.random() * images.length)]
            },
            color: client.getColor("Random")
        }]
    })
}