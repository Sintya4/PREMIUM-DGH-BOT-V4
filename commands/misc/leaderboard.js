const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const Levels = require("discord-xp");
module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  category: "misc",
  botPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
    if (rawLeaderboard.length < 1)
      return message.reply("Nobody's in leaderboard yet.");
    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    ); // We process the leaderboard.
    const lb = leaderboard.map(
      e =>
        `__**${e.position}.**__ ** ${e.username}#${
          e.discriminator
        } » Level: \`${e.level}\` » XP: \`${e.xp.toLocaleString()}\`**`
    ); // We map the outputs.
    const embed = new MessageEmbed()
      .setTitle(`**Leaderboard ${message.guild.name}**`)
      .setColor("#efcb83")
      .setDescription(`${lb.join("\n")}`);
    message.inlineReply(embed);
  }
};
