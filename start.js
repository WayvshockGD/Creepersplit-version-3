const Config = require("./Config");
const Creeper = require("./src/Creeper");

let client = new Creeper();

if (Config.enableEvents) {
    client.initEvents();
};

client.connect();