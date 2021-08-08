const Discord = require("discord.js");
module.exports = {
  name: "serverlist",
  usage: ``,
  category: "owner",
  aliases: ["slt"],
  description: "Displays the list of Servers!",
  args: false,
  cooldown: 2,
  run: async (client, message, args) => {
    const owner = ["740947753135243354", "767726828311543820"];
    if (owner.includes(message.author.id) === false) {
      return;
    }
    message.delete();
    const bot = client;
    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description =
      `Total Servers - ${bot.guilds.cache.size}\n\n` +
      bot.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map(
          (r, i) =>
            `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${
              r.id
            }\nLink Owner - [Here](https://discordapp.com/users/${r.owner.id}/)`
        )
        .slice(0, 10)
        .join("\n\n");

    let embed = new Discord.MessageEmbed()
      .setAuthor(bot.user.tag, bot.user.displayAvatarURL({ dynamic: true }))

      .setColor("00FFFF")
      .setFooter(`Page - ${page}/${Math.ceil(bot.guilds.cache.size / 10)}`)
      .setDescription(description);

    let msg = await message.channel.send(embed);

    await msg.react("◀️");
    await msg.react("▶️");
    await msg.react("❌");

    let collector = msg.createReactionCollector(
      (reaction, user) => user.id === message.author.id
    );

    collector.on("collect", async (reaction, user) => {
      if (reaction._emoji.name === "◀️") {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;
        // if there is no guild to display, delete the message
        if (i0 + 1 < 0) {
          console.log(i0);
          return msg.delete();
        }
        description =
          `Total Servers - ${bot.guilds.cache.size}\n\n` +
          bot.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map(
              (r, i) =>
                `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${
                  r.id
                }\nLink Owner - [Here](https://discordapp.com/users/${
                  r.owner.id
                }/)`
            )
            .slice(i0, i1)
            .join("\n\n");

        // Update the embed with new informations
        embed
          .setFooter(
            `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
          )
          .setDescription(description);

        // Edit the message
        msg.edit(embed);
      }

      if (reaction._emoji.name === "▶️") {
        // Updates variables
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;
        if (i1 > bot.guilds.cache.size + 10) {
          return msg.delete();
        }
        if (!i0 || !i1) {
          return msg.delete();
        }
        description =
          `Total Servers - ${bot.guilds.cache.size}\n\n` +
          bot.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map(
              (r, i) =>
                `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${
                  r.id
                }\nLink Owner - [Here](https://discordapp.com/users/${
                  r.owner.id
                }/)`
            )
            .slice(i0, i1)
            .join("\n\n");

        // Update the embed with new informations
        embed
          .setFooter(
            `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
          )
          .setDescription(description);

        // Edit the message
        msg.edit(embed);
      }

      if (reaction._emoji.name === "❌") {
        return msg.delete();
      }

      // Remove the reaction when the user react to the message
      await reaction.users.remove(message.author.id);
    });
  }
};
