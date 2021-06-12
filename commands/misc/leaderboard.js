const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const Levels = require("discord-xp");
module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  category: "misck",
  botPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
  const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
if (rawLeaderboard.length < 1) return message.reply("Nobody's in leaderboard yet.");
const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
   const embed = new MessageEmbed()
    .setTitle(`**Leaderboard ${message.guild.name}**`)
     .setColor("#efcb83")
    .setDescription(`${lb.join("\n===================\n\n")}`);
   message.channel.send(embed) 
    
   }} /* const coins = await client.db
      .all()
      .filter(data => data.ID.startsWith(`guild_${message.guild.id}_xp_`))
      .sort((a, b) => b.data - a.data);
    let myrank =
      coins
        .map(m => m.ID)
        .indexOf(`guild_${message.guild.id}_level_${message.author.id}`) + 1 ||
      "N/A";
    coins.length = 10;
    let finalLb = "";

    for (let i in coins) {
      if (coins[i].data === null) coins[i].data = 1;

      let userData = client.users.cache.get(coins[i].ID.split("_")[3])
        ? client.users.cache.get(coins[i].ID.split("_")[3]).tag
        : "Unknown#0000";

      finalLb += `__**${coins.indexOf(coins[i]) + 1}.**__ **${userData} » \`${
        coins[i].data
      }\`**\n`;
    }

    let embed = new MessageEmbed()
      .setTitle(`**Leaderboard ${message.guild.name}**`)
      .setDescription(`${finalLb}`)
      .setColor("#efcb83")
      .setFooter(
        `Your Position » ${myrank} | Leaderboards are Global Statistics`
      );

    message.inlineReply(embed);
  }
};
*/