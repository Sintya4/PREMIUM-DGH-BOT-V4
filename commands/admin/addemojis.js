const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
  name: "stealemoji",
  category: "admin",
  permissions: "MANAGE_EMOJIS",
  args: true,
  description: "stealemoji <emoji name>",
  usage: "stealemoji <emoji name>",
  authorPermission: ["MANAGE_EMOJIS"],
  botPermission: ["MANAGE_EMOJIS"],
  run: async (client, message, args) => {
    const emoji = args[0];
    if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      const Added = new MessageEmbed()
        .setTitle(`Emoji Added`)
        .setColor(`${Color}`)
        .setDescription(
          `Emoji Has Been Added! | Name : ${name ||
            `${customemoji.name}`} | Preview : [Click Me](${Link})`
        );
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(`Please Give Me A Valid Emoji!`);
      message.channel.send(
        `You Can Use Normal Emoji Without Adding In Server!`
      );
    }
  }
};
