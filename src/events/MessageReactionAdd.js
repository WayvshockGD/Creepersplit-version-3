const Eris = require("eris");

/**
 * @param {Eris.Message} message
 * @param {Eris.PartialEmoji} emoji
 * @param {Eris.Member} react
 */
module.exports = function(message, emoji, react) {
    if (!emoji.name === "⭐") return;
}