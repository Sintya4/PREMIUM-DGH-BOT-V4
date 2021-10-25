const DGH_BOT = require("./structures/Client");
const Discord = require("discord.js");
const client = new DGH_BOT();
client.start();
require("./structures/antiCrash")(client);
require("./handlers/handler")(client);
