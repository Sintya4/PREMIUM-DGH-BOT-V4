const Discord = require("discord.js");

module.exports = {
  name: "create-embed",
  category: "admin",
  description: "create a embed a command in a certain channel. supports embed!",
  P_user: ["MANAGE_MESSAGES"],
  P_bot: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    message.delete();
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("GOLD")
            .setDescription(
              "Please provide a **valid** channel to send the embed"
            )
        ]
      });
    client.ops.embedder(message, channel);
  }
};
