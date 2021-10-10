const Discord = require("discord.js");
const canvacord = require("canvacord");
let Levels = require("discord-xp");
module.exports = {
  name: "rank",
  aliases: ["lvl","level"],
  description: "Get the level of Author or Mentioned",
  usage: "rank [user]",
  category: "levels",
  run: async (client, message, args) => {
    let user = message.mentions.members.first() || message.member;
    const User = await Levels.fetch(user.user.id, message.guild.id, true);
    const LevelUp = new Discord.MessageEmbed();
    let image = await client.data.get(`levelimg_${message.guild.id}`);
    const newxp = Levels.xpFor(parseInt(User.level) + 1);
    let rak = new canvacord.Rank()
      .setAvatar(user.user.displayAvatarURL({ format: "png" }))
      .setCurrentXP(User.xp)
      .setRequiredXP(newxp)
      .setStatus(
        user.presence?.status ? user.presence.status : "offline",
        true,
        5
      )
      .setProgressBar("#00FFFF", "COLOR")
      .setUsername(user.user.username, "#1FF768")
      .setDiscriminator(user.user.discriminator)
      .setLevel(User.level)
      .setBackground("IMAGE", image || client.config.image.level);
    rak.build().then(data => {
      let embed = new Discord.MessageEmbed()
        .setAuthor(user.user.username, message.guild.iconURL())
        .setColor("#ff2050")
        .setDescription(
          `**LEVEL** - ${User.level}\n**Position** - ${User.position}\n**XP** - ${User.xp}/${newxp}`
        )
        .setImage("attachment://RankCard.png");
      message.channel.send({
        embeds: [embed],
        files: [{ attachment: data, name: "RankCard.png" }]
      });
    });
  }
};
