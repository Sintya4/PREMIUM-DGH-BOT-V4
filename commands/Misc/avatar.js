const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "avatar",
  category: "misc",
  aliases: ["av"],
  usage: "avatar <user>",
  args: false,
  run: async (client, message, args) => {
    message.delete();
    const target = (await client.resolveUser(args[0])) || message.author;
    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    };
  return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
        .setImage(target.displayAvatarURL({ dynamic: true }))
        .setFooter(target.presence.status, stat[target.presence.status])
    );
  }
};
