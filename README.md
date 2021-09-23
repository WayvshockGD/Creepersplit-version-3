# Creeperpslit

### Running the bot:

to run the bot
put your token in Config.js.example and rename it to Config.js
some configurations wont be avalible due to lazyness.

## Plugins:

Plugins are controlled by a single file in "./src/plugins/files/index.js".
to add a plugin:

```js
// index.js

// Top of the file
let Plugin = require("./Plugin");

{
    name: "name",
    commands: [{
        name: "name",
        enabled: true,
        execute: Plugin.something
    }]
}
```
```js
// Plugin.js

exports.something = function(message, args, client) {
    // Code...
};
```