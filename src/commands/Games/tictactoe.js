const Discord = require("discord.js");
module.exports = {
  name: "tictactoe",
  category: "games",
  aliases: ["ttt"],
  usage: "tictactoe <@user>",
  description: "Let's play tictactoe",
  run: async (client, message, args) => {
    client.ops.tictactoe(client, message, {
      xEmoji: await client.emoji("DGH_X_"),
      oEmoji: await client.emoji("DGH_O_"),
      idleEmoji: await client.emoji("DGH_line_")
    })
  }
};
