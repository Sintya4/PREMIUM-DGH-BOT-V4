const akinator = require("discord.js-akinator");
module.exports = {
  name: "akinator",
  aliases: ["aki"],
  category: "games",
  run: async (client, message, args) => {
    akinator(message, client);
  }
};
