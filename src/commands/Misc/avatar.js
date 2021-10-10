const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "avatar",
  category: "misc",
  aliases: ["av"],
  usage: "avatar <user>",
  run: async (client, message, args) => {
    let target = await client.resolveMember(
      args[0] || message.author.id,
      message.guild
    );
    if (!target) target = await client.resolveUser(args[0]);
    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    };
    return message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(
            target.user?.tag ? target.user.tag : target.tag,
            target.user?.displayAvatarURL({ dynamic: true })
              ? target.user.displayAvatarURL({ dynamic: true })
              : target.displayAvatarURL({ dynamic: true })
          )
          .setImage(
            target.user?.displayAvatarURL({ dynamic: true })
              ? target.user.displayAvatarURL({ dynamic: true })
              : target.displayAvatarURL({ dynamic: true })
          )
          .setFooter(
            target.presence?.status ? target.presence.status : "offline",
            stat[target.presence?.status ? target.presence.status : "offline"]
          )
      ]
    });
  }
};
